import { useEffect, useState } from "react"
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native"
import { MaterialIcons, Feather } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { SvgIcons } from "@/assets"
import React from "react"
import { ThemedText } from "../ThemedText"
import GradientButton from "./GradientButton"
import { ScaledSheet, vs } from "react-native-size-matters"
import { ThemedView } from "../ThemedView"
import { useTheme } from "@/context/ThemeContext"
import { labels } from "@/constants/Labels"
import GradientBorder from "./GradientBorder"
import { useAddNewAltEmailMutation, useDeleteAltEmailMutation, useGetAltEmailsQuery, useGetDomainsQuery, useSaveNewAltEmailMutation } from "@/redux/apiHook"
import { useSelector } from "react-redux"
import { selectUser } from "@/redux/slices/userSlice"
import CustomToast from "../CustomToast"
import Toast from "react-native-toast-message"
import { ConfirmationModal } from "../modals/ConfirmationModal"


interface AltEmail {
  _id: string
  user_id: string
  email: string
  email_for: string
  is_deleted: boolean
  createdAt: string
  updatedAt: string
}
interface AltData{
  data:AltEmail
}

const EMAIL_SUGGESTIONS = ["Random","@inoman.to", "@frodie.am", "@messr.om", "@ronsun.un", "@qol.qs", "@hom.qa","@test123.un"]

const AltEmailSection = () => {
  const [altEmails, setAltEmails] = useState<any>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newEmailFor, setNewEmailFor] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [emailForError, setEmailForError] = useState("")
  const [emailError, setEmailError] = useState("")
  const { theme } = useTheme()
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [isEmailForFocused, setIsEmailForFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [selectedEmail,setSelectedEmail]=useState<any>()
  const { user } = useSelector(selectUser);
  const [disableAddEmail,setDisableAddEmail]=useState(false)
  const { data } = useGetAltEmailsQuery<{ data: AltData }>(user.user_id);
  const [newEmailPage,setNewEmailPage]=useState(1)
  const [isModalVisible, setModalVisible] = useState(false);
  const [addNewAltEmailApi, addNewAltEmailApiComponents]=useAddNewAltEmailMutation<any>()
  const [saveNewAltEmail,saveNewAltEmailComponents]=useSaveNewAltEmailMutation<any>()
  const [deleteAltEmail,deleteAltEmailComponents]=useDeleteAltEmailMutation<any>()
  const { data: domainsData } = useGetDomainsQuery<any>({});  

  useEffect(() => {
    if (data && data.data) {
      setAltEmails(data.data)
    }
    console.log("All Alt Email Logs--->",data)
    
  }, [data])

  const fetchNewEmail = async () => {
    try {
      const result = await addNewAltEmailApi({ page: newEmailPage,id:user.user_id }).unwrap();
      setNewEmail(result.data.email);
      setNewEmailFor(result.data.email_for)
      console.log("current page no---->",newEmailPage)
      console.log(result.data.email)
    } catch (error:any) {
      Toast.show({
        text1:error.data.message,
        type:"error"
      })
      console.error("Failed to fetch new email:", error);
      setNewEmailPage(1)
    }
  };

  useEffect(() => {
    

    fetchNewEmail();
  }, [newEmailPage,]);


  const validateEmailFor = () => {
    if (!newEmailFor.trim()) {
      setEmailForError("Email for is required")
      return false
    }
    setEmailForError("")
    return true
  }

  const validateEmail = () => {
    if (!newEmail.trim()) {
      setEmailError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setEmailError("Invalid email format")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSaveEmail = async() => {
    const isEmailForValid = validateEmailFor()
    const isEmailValid = validateEmail()
    console.log("saveemaillogs--",user.user_id, newEmail,"---->",await saveNewAltEmail({
      user_id:user.user_id,
      newEmail: newEmail,
    }))

    if (!isEmailForValid || !isEmailValid) return

    if (editingId) {
      setAltEmails(
        altEmails.map((email:any) => (email._id === editingId ? { ...email, email_for: newEmailFor, email: newEmail } : email)),
      )
      setEditingId(null)
    } else {
      const newAltEmail: AltEmail = {
        _id: Date.now().toString(),
        user_id: user.user_id, // Replace with actual user ID
        email: newEmail,
        email_for: newEmailFor,
        is_deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setAltEmails([...altEmails, newAltEmail])
    }

    setNewEmailFor("")
    setNewEmail("")
    setIsAdding(false)
  }

  const handleEdit = (email: AltEmail) => {
    setEditingId(email._id)
    setNewEmailFor(email.email_for)
    setNewEmail(email.email)
    setIsAdding(true)
  }

  const handleDelete = (email:any) => {
    setModalVisible(true)
    setSelectedEmail(email)
    // setAltEmails(altEmails.filter((email: { _id: string }) => email._id !== id))
  }
  const handleYes = async () => {
    try {
      await deleteAltEmail({ user_id: user.user_id, email: selectedEmail.email }).unwrap();
      setAltEmails(altEmails.filter((email: { _id: string }) => email._id !== selectedEmail._id));
      setModalVisible(false);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.data.message,
      });
      console.error("Failed to delete email:", error);
    }
  };
  const handleNo=()=>{
    setModalVisible(false)
  }

  const handleCancel = () => {
    setNewEmailFor("")
    setNewEmail("")
    setIsAdding(false)
    setEditingId(null)
    setEmailForError("")
    setEmailError("")
  }

  const extractDomain = (email: string) => {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return '';
    return email.slice(atIndex);
  };

  const handleDomainSelection = (domain: string) => {
    const emailWithoutDomain = newEmail.split('@')[0];
    const newEmailWithDomain = `${emailWithoutDomain}${domain}`;
    setNewEmail(newEmailWithDomain);
    setNewEmailPage(1)
    fetchNewEmail({domain});
    setSelectedSuggestion(domain);
  };

  const handleRandomDomain = () => {
    const randomIndex = Math.floor(Math.random() * domainsData.data.length);
    const randomDomain = domainsData.data[randomIndex].domainName;
    handleDomainSelection(randomDomain);
  };

  const handleAddNew = async () => {
    if (isAdding) {
      handleSaveEmail();
    } else {
      try {
        const result = await addNewAltEmailApi({ page: newEmailPage }).unwrap();
        const newEmail = result.data.email;
        const domain = extractDomain(newEmail);
        const isDomainAvailable = domainsData.data.some((suggestion: any) => suggestion.domainName === domain);

        setNewEmail(newEmail);
        setNewEmailFor(result.data.email_for);
        setSelectedSuggestion(isDomainAvailable ? domain : null);
        setIsAdding(true);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.data.message,
        });
        console.error("Failed to fetch new email:", error);
        setNewEmailPage(1);
      }
    }
  };

  return (
    <ThemedView style={[styles.sectionContainer, { backgroundColor: Colors[theme].middleContainerBg, }]}>
      <View style={styles.sectionHeader}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="alternate-email"
            style={[styles.iconStyle, { backgroundColor: Colors[theme].cartBg }]}
            size={24}
            color={Colors.primaryRed}
          />
          <ThemedText type="title" style={styles.sectionTitle}>
            {labels.altEmail}
          </ThemedText>
        </View>
        <SvgIcons.Copy  fill={Colors[theme].text}  width={vs(20)} height={vs(20)}/>
      </View>

      <ThemedText style={styles.sectionDescription}>
        {labels.useAltIDfs}
        {"\n"}
        {labels.theyWillForeward}
      </ThemedText>

      {/* Render saved alt emails */}
      {altEmails
        .filter((email: { _id: string | null }) => email._id !== editingId) // Filter out the email being edited
        .map((email: AltEmail) => (
          <React.Fragment key={email._id}>
            <ThemedText style={styles.fieldLabel}>{email.email_for}</ThemedText>
            <View style={[styles.savedEmailContainer, { flex: 1, backgroundColor: Colors[theme].inputBg }]}>
              <ThemedText style={styles.savedEmailText}>{email.email}</ThemedText>
              <View style={styles.savedEmailActions}>
                <TouchableOpacity onPress={() => handleEdit(email)}>
                <SvgIcons.Pencil  fill={Colors[theme].text}  width={vs(16)} height={vs(16)}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(email)}>
                <SvgIcons.Bin  fill={Colors[theme].text}  width={vs(16)} height={vs(16)}/>
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        ))}

      {isAdding && (
        <>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            {editingId ? labels.editEmail : labels.addNewEmail}
          </ThemedText>
          <View style={[styles.inputWithIcon, { backgroundColor: Colors[theme].inputBg, borderColor: isEmailForFocused ? Colors.white : Colors.inputBorder }]}>
            <TextInput
              style={[styles.mainInput, { color: Colors[theme].text }]}
              value={newEmailFor}
              onChangeText={(text) => {
                setNewEmailFor(text)
                validateEmailFor()
              }}
              placeholder={labels.name}
              placeholderTextColor={Colors[theme].placeholder}
              onFocus={() => setIsEmailForFocused(true)}
              onBlur={() => setIsEmailForFocused(false)}
            />
          </View>
          {emailForError ? <ThemedText style={styles.errorText}>{emailForError}</ThemedText> : null}

          <View style={[styles.inputWithIcon, { backgroundColor: Colors[theme].inputBg, borderColor: isEmailFocused ? Colors.white : Colors.inputBorder }]}>
            <TextInput
            editable={false}
              style={[styles.mainInput, { color: Colors[theme].text }]}
              value={newEmail}
              onChangeText={(text) => {
                setNewEmail(text)
                validateEmail()
              }}
              placeholder={labels.email}
              placeholderTextColor={Colors[theme].placeholder}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            <TouchableOpacity style={styles.iconButton} onPress={() => setNewEmailPage((prevPage) => prevPage + 1)}>
              <SvgIcons.refresh height={18} color={Colors.inputText} />
            </TouchableOpacity>
          </View>
          {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText> : null}

          <View style={styles.suggestionsContainer}>
            <TouchableOpacity onPress={handleRandomDomain}>
              <View style={[styles.suggestionTag, { backgroundColor: Colors[theme].cartBg }]}>
                <ThemedText type="defaultSemiBold" style={styles.suggestionText}>
                  Random
                </ThemedText>
              </View>
            </TouchableOpacity>
            {domainsData.data.map((suggestion: any) => {
              const domain = suggestion.domainName;
              const isSelected = selectedSuggestion === domain;
              const isCurrentDomain = extractDomain(newEmail) === domain;

              return (
                <TouchableOpacity
                  key={suggestion._id}
                  onPress={() => handleDomainSelection(domain)}
                >
                  <GradientBorder isSelected={isSelected || isCurrentDomain}>
                    <View style={[styles.suggestionTag, { backgroundColor: Colors[theme].cartBg }]}>
                      <ThemedText type="defaultSemiBold" style={styles.suggestionText}>
                        {domain}
                      </ThemedText>
                    </View>
                  </GradientBorder>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      <GradientButton
        style={{ borderRadius: 200, marginBottom: 5 }}
        title={editingId ? labels.saveChanges : isAdding ? labels.saveAltEmail : labels.addNewEmail}
        onClick={handleAddNew}
        gradient={isAdding}
        // disabled={!!emailForError || !!emailError}
      />

      {isAdding && (
        <GradientButton
          style={{ borderRadius: 200, marginBottom: 5 }}
          title={labels.cancel}
          onClick={handleCancel}
        />
      )}
      <ConfirmationModal
        visible={isModalVisible}
        message="Are you sure you want to delete this Alt Email?"
        onYes={handleYes}
        onNo={handleNo}
      />
    </ThemedView>
  )
}
const styles = ScaledSheet.create({
  sectionContainer: {
    marginBottom: "24@vs",
    padding: "16@s",
    borderRadius: "16@s",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "8@vs",
    justifyContent: "space-between",
  },
  iconStyle: {
    padding: "12@s",
    borderRadius: "100@s",
    backgroundColor: Colors.dark.toggleCircleBg,
    flexBasis: "44@s",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "20@s",
    fontWeight: "600",
    marginLeft: "8@s",
  },
  sectionDescription: {
    fontSize: "12@vs",
    marginBottom: "10@vs",
    color: "#969696",
    lineHeight: "20@vs",
    fontFamily:"medium",
  },
  fieldLabel: {
    fontSize: "14@s",
    paddingBottom: "5@vs",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    padding: "2@s",
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: "16@s",
    marginBottom: "5@vs",
    paddingRight: "8@s",
  },
  mainInput: {
    padding: "12@s",
    borderRadius: "16@s",
    flex: 1,
    fontSize: "16@s",
  },
  iconButton: {
    padding: "8@s",
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "5@s",
    marginVertical: "10@vs",
    

  },
  suggestionTag: {
    backgroundColor: Colors.dark.inputColor,
    paddingHorizontal: "12@s",
    paddingVertical: "6@vs",
    borderRadius: "16@s",
  },
  suggestionText: {
    fontSize: "11@s",
    lineHeight: "14@vs",
    paddingVertical: "1@vs",
  },
  savedEmailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.dark.inputColor,
    borderRadius: "12@s",
    padding: "14@s",
    marginBottom: "12@vs",
    borderColor: Colors.inputBorder,
    borderWidth: 1,
  },
  savedEmailText: {
    fontSize: "16@s",
  },
  savedEmailActions: {
    flexDirection: "row",
    gap: "10@s",
  },
  errorText: {
    fontSize: "12@s",
    color: Colors.primaryRed,
    marginBottom: "5@vs",
  },
})

export default AltEmailSection
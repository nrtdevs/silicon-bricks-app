"use client"

import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native"
import { Colors } from "@/constants/Colors"
import { SvgIcons } from "@/assets"
import React from "react"
import GradientButton from "./GradientButton"
import { useTheme } from "@/context/ThemeContext"
import { ThemedText } from "../ThemedText"
import { ms, ScaledSheet, vs } from "react-native-size-matters"
import { ThemedView } from "../ThemedView"
import { labels } from "@/constants/Labels"
import { useSelector } from "react-redux"
import { selectUser } from "@/redux/slices/userSlice"
import { useAssignPhoneMutation, useNewPhoneQuery } from "@/redux/apiHook"
import alertMsg from "@/constants/alertMsg"
import { set } from "react-hook-form"

const generateRandomNumber = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100
  const prefix = Math.floor(Math.random() * 900) + 100
  const lineNumber = Math.floor(Math.random() * 9000) + 1000
  return `(${areaCode}) ${prefix}-${lineNumber}`
}

const AltNumberSection = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isDeleted, setIsDeleted] = useState(true) // Set to true initially to match the image
  const [altNo, setAltNo] = useState<boolean>(false)
  const { user } = useSelector(selectUser);
  const { data, isSuccess, isError, error, refetch } = useNewPhoneQuery<any>(undefined, {
    skip: altNo
  });
  const [assignNo, assignNoState] = useAssignPhoneMutation<any>();

  useEffect(() => {
    if (isSuccess) {
      setPhoneNumber(data.data.phone)
    }
    if (isError) {
      Alert.alert(
        alertMsg.error,
        error?.data?.message ||
        alertMsg.somethingWentWrong
      );
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (assignNoState.isSuccess) {
      // console.log(assignNoState.data);
      console.log('Number added successfully');
    }

    if (assignNoState.isError) {
      let err = assignNoState?.error;
      console.log("addWishlistError....", err);
      // Alert.alert(Constants.error, err.message);
    }
  }, [assignNoState.isError, assignNoState.isSuccess])

  const handleSaveNumber = () => {
    if (phoneNumber) {
      setIsPreviewMode(true)
      assignNo({
        user_id: "67b5bc00cb93e28f541292c6",
        newPhone: "sidh@gmail.com",
        oldPhone: ""
      })
    }
  }

  const handleChangeNumber = () => {
    setIsPreviewMode(false)
    setIsPaused(false)
  }

  const handlePauseNumber = () => {
    setIsPaused(true)
  }

  const handleActivateNumber = () => {
    setIsPaused(false)
  }

  const handleDeleteNumber = () => {
    setIsDeleted(true)
    setIsPreviewMode(false)
    setIsPaused(false)
  }

  const handleAddNewAltPersona = () => {
    setIsDeleted(false)
    setIsPreviewMode(false)
    setIsPaused(false)
  }

  const handleRefresh = () => {
    setAltNo(false)
  }

  const { theme } = useTheme()

  if (isDeleted) {
    return (
      <View style={[styles.sectionContainer, { backgroundColor: Colors[theme].middleContainerBg }]}>
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.iconStyle, { backgroundColor: Colors[theme].inputBg }]}>
              <SvgIcons.phone height={24} color={Colors.inputText} />
            </View>
            <ThemedText type="title" style={styles.sectionTitle}>{labels.altNumber}</ThemedText>
          </View>
          <SvgIcons.Copy fill={Colors[theme].text} width={vs(20)} height={vs(20)} />
        </View>
        <ThemedText style={styles.sectionDescription}>
          {labels.useAltIDfs}{"\n"}
          {labels.theyWillForeward}
        </ThemedText>
        <GradientButton style={{ borderRadius: 200, marginBottom: 5, }} title={labels.addNewAltNumber} onClick={handleAddNewAltPersona} />

      </View>
    )
  }

  return (
    <ThemedView style={[styles.sectionContainer, { backgroundColor: Colors[theme].middleContainerBg }]}>
      <View style={styles.sectionHeader}><View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={[styles.iconStyle, { backgroundColor: Colors[theme].inputBg }]}>
          <SvgIcons.phone height={24} color={Colors.inputText} />
        </View>
        <ThemedText type="title" style={styles.sectionTitle}>{labels.altNumber}</ThemedText>
      </View>
        <SvgIcons.Copy fill={Colors[theme].text} width={vs(20)} height={vs(20)} />
      </View>
      <ThemedText style={styles.sectionDescription}>
        {labels.useAltIDfs}{"\n"}
        {labels.theyWillForeward}.
      </ThemedText>

      {!isPreviewMode ? (
        <>
          <View style={styles.phoneInputContainer}>
            <View style={[styles.input, { padding: 14, justifyContent: "center" }]}>

              <ThemedText style={[styles.dropdownButtonText]}>{"+1"}</ThemedText>

            </View>
            <View style={[styles.input, styles.phoneNumber, { backgroundColor: Colors[theme].inputBg }]}>
              <TextInput
                textContentType="telephoneNumber"
                style={[styles.phoneNumberInput, { color: Colors.internalGray }]}
                value={phoneNumber}
                editable={false}

              />
              <TouchableOpacity onPress={handleRefresh}>
                <SvgIcons.refresh height={24} color={Colors.inputText} />
              </TouchableOpacity>
            </View>
          </View>
          <GradientButton style={{ borderRadius: 200, marginBottom: 5, }} title={labels.saveAltNumber} onClick={handleSaveNumber} gradient />
          <GradientButton style={{ borderRadius: 200, marginBottom: 5 }} title={labels.cancel} onClick={handleDeleteNumber} />
        </>
      ) : (
        <>
          <View style={[styles.input, styles.previewNumber, isPaused && styles.pausedNumber, { backgroundColor: Colors[theme].inputBg, padding: 14 }]}>
            <ThemedText style={styles.previewNumberText}>{phoneNumber}</ThemedText>
            <TouchableOpacity onPress={handleRefresh}>
              <SvgIcons.refresh height={ms(24)} color={Colors.inputText} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {!isPaused ? (
              <>
                <GradientButton style={{ borderRadius: 200, flex: 1 }} title={labels.pauseNumber} onClick={handlePauseNumber} />
                <GradientButton style={{ borderRadius: 200, flex: 1 }} title={labels.changeNumber} onClick={handleChangeNumber} />

              </>
            ) : (
              <>
                <GradientButton style={{ borderRadius: 200, marginBottom: 5, flex: 1 }} title={labels.delete} onClick={handleDeleteNumber} />
                <GradientButton style={{ borderRadius: 200, marginBottom: 5, flex: 1 }} title={labels.activateNumber} onClick={handleActivateNumber} />

              </>
            )}
          </View>
        </>
      )}
    </ThemedView>
  )
}

export const styles = ScaledSheet.create({
  sectionContainer: {
    marginBottom: "24@vs", // Scaled marginBottom
    padding: "16@s", // Scaled padding
    borderRadius: "16@s", // Scaled borderRadius
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8@vs", // Scaled marginBottom
  },
  iconStyle: {
    padding: "12@s", // Scaled padding
    borderRadius: "100@s", // Scaled borderRadius
    backgroundColor: Colors.dark.toggleCircleBg,
    flexBasis: "44@s", // Scaled flexBasis
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "20@s", // Scaled fontSize
    fontWeight: "600",
    marginLeft: "8@s", // Scaled marginLeft
  },
  sectionDescription: {
    fontSize: "12@vs", // Scaled fontSize
    color: "#969696",
    fontFamily: "medium",
    marginBottom: "16@vs", // Scaled marginBottom
    lineHeight: "20@vs", // Scaled lineHeight
  },
  phoneInputContainer: {
    flexDirection: "row",
    marginBottom: "12@vs", // Scaled marginBottom
    gap: "10@s", // Scaled gap
    alignContent: "center",
  },
  input: {
    borderColor: Colors.inputBorder,
    borderWidth: "1@s", // Scaled borderWidth
    borderRadius: "16@s", // Scaled borderRadius
    padding: "5@s", // Scaled padding
    fontWeight: "500",
    fontSize: "16@s", // Scaled fontSize
    marginBottom: "3@vs", // Scaled marginBottom
  },
  phoneNumber: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "16@s", // Scaled paddingRight
  },
  phoneNumberInput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: "16@s", // Scaled fontSize
  },
  previewNumber: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pausedNumber: {
    opacity: 0.5,
  },
  previewNumberText: {
    color: "#666",
    fontSize: "16@s", // Scaled fontSize
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "10@vs", // Scaled marginTop
    gap: "10@s", // Scaled gap
  },
  button: {
    backgroundColor: Colors.dark.inputColor,
    borderRadius: "100@s", // Scaled borderRadius
    padding: "16@s", // Scaled padding
    alignItems: "center",
    flex: 1,
  },
  gradientButton: {
    backgroundColor: "#E94E84",
  },
  pauseButton: {
    backgroundColor: "#E94E84",
  },
  changeButton: {
    backgroundColor: Colors.dark.inputColor,
  },
  deleteButton: {
    backgroundColor: Colors.dark.inputColor,
  },
  activateButton: {
    backgroundColor: "#E94E84",
  },
  addButton: {
    backgroundColor: "#E94E84",
  },
  buttonText: {
    color: "#fff",
    fontSize: "16@s", // Scaled fontSize
    fontWeight: "500",
  },
  dropdownButtonText: {
    fontSize: "16@s", // Scaled fontSize
    fontFamily: "regular",
  },
});
export default AltNumberSection

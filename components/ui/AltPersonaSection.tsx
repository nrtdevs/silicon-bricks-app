"use client"

import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native"
import { Colors } from "@/constants/Colors"
import { SvgIcons } from "@/assets"
import DatePicker from "@/components/DatePicker"
import CustomValidation from "@/components/CustomValidation"
import { useForm, Controller } from "react-hook-form"
import { MaterialIcons } from "@expo/vector-icons"
import GradientButton from "./GradientButton"
import { useTheme } from "@/context/ThemeContext"
import { ThemedText } from "../ThemedText"
import { labels } from "@/constants/Labels"
import { ScaledSheet, vs } from "react-native-size-matters"
import { useGetAltEmailsQuery } from "@/redux/apiHook"

const AltPersonaSection: React.FC = () => {
  const [state, setState] = useState<"initial" | "form" | "preview">("initial")
  const [personaData, setPersonaData] = useState<any>(null)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      date: new Date(),
      gender: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      address: "",
    },
  })

  const [showPicker, setShowPicker] = useState(false)
  const { theme } = useTheme()

  const onSubmit = (data: any) => {
    console.log(data)
    setPersonaData(data)
    setState("preview")
  }

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName)
  }

  const handleBlur = () => {
    setFocusedInput(null)
  }

  const renderInitial = () => (
    <>
      <ThemedText style={styles.sectionDescription}>
        {labels.useAltIDfs}{"\n"}
        {labels.theyWillForeward}
      </ThemedText>
      <GradientButton style={{ borderRadius: 200, marginBottom: 5, flex: 1 }} textStyle={{ fontSize: 16 }} title={labels.addNewAltPersona} onClick={() => setState("form")} />
    </>
  )

  const renderPreview = () => (
    <View style={[{padding:vs(3),gap:10, backgroundColor: Colors[theme].middleContainerBg }]}>
      <Text style={styles.sectionDescription}>
        {labels.useAltIDfs}{"\n"}
        {labels.theyWillForeward}
      </Text>
      <ThemedText style={styles.previewLabel}>{labels.personalInfo}</ThemedText>

      <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
        <TextInput
          style={[styles.previewInput, { color: Colors[theme].text, flex: 1, backgroundColor: Colors[theme].inputBg }]}
          value={personaData.firstName}
          editable={false}
          placeholder={labels.firstName}
          placeholderTextColor={Colors[theme].placeholder}
        />

        <TextInput
          style={[styles.previewInput, { color: Colors[theme].text, flex: 1, backgroundColor: Colors[theme].inputBg }]}
          value={personaData.lastName}
          editable={false}
          placeholder={labels.lastName}
          placeholderTextColor={Colors[theme].placeholder}
        />
      </View>

      <TextInput
        style={[styles.previewInput, { color: Colors[theme].text, flex: 1, backgroundColor: Colors[theme].inputBg }]}
        value={personaData.date.toLocaleDateString()}
        editable={false}
        placeholderTextColor={Colors[theme].placeholder}
      />

      <TextInput
        style={[styles.previewInput, { color: Colors[theme].text, flex: 1, backgroundColor: Colors[theme].inputBg }]}
        value={personaData.gender.value}
        editable={false}
        placeholder={labels.gender}
        placeholderTextColor={Colors[theme].placeholder}
      />

      <TextInput
        style={[styles.previewInput, styles.addressInput, { color: Colors[theme].text, flex: 1, backgroundColor: Colors[theme].inputBg }]}
        value={`${personaData.address}, ${personaData.state}\n${personaData.zipCode} ${personaData.country}`}
        editable={false}
        multiline
        placeholderTextColor={Colors[theme].placeholder}
      />

      <View style={styles.previewButtonContainer}>
        <GradientButton style={{ borderRadius: 200, marginBottom: 5, flex: 1 }} title={`${labels.delete} ${labels.AltId}`} onClick={() => {
          Alert.alert(`${labels.delete} ${labels.AltId}`, labels.areYouSure, [
            { text: labels.cancel, style: "cancel" },
            { text: labels.delete, onPress: () => setState("initial") },
          ])
        }} />
        <GradientButton style={{ borderRadius: 200, marginBottom: 5, flex: 1 }} title={labels.changePersona} onClick={() => setState("form")} />
      </View>
    </View>
  )

  const renderForm = () => (
    <>
      <Text style={styles.sectionDescription}>
        {labels.useAltIDfs}{"\n"}
        {labels.theyWillForeward}
      </Text>
      <ThemedText style={[styles.subsectionTitle]}>{labels.personalInfo}</ThemedText>

      <View style={styles.nameContainer}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                styles.halfInput,
                {
                  backgroundColor: Colors[theme].inputBg,
                  color: Colors.internalGray,
                  borderColor: focusedInput === "firstName" ? Colors[theme].text : Colors.inputBorder,
                },
              ]}
              placeholder={labels.firstName}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur()
                handleBlur()
              }}
              onFocus={() => handleFocus("firstName")}
              placeholderTextColor={Colors.internalGray}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                styles.halfInput,
                {
                  backgroundColor: Colors[theme].inputBg,
                  color: Colors.internalGray,
                  borderColor: focusedInput === "lastName" ? Colors[theme].text : Colors.inputBorder,
                },
              ]}
              placeholder={labels.lastName}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur()
                handleBlur()
              }}
              onFocus={() => handleFocus("lastName")}
              placeholderTextColor={Colors.internalGray}
            />
          )}
        />
      </View>

      <TouchableOpacity style={[styles.input, { backgroundColor: Colors[theme].inputBg, padding: 14 }]} onPress={() => setShowPicker(true)}>
        <DatePicker
          {...{
            showPicker,
            setShowPicker,
            date: watch("date"),
            setDate: (date: Date) => setValue("date", date),
          }}
        />
        <View style={styles.dateContainer}>
          <ThemedText style={styles.dateText}>
            {`${String(watch("date").getDate()).padStart(2, "0")}/${String(watch("date").getMonth() + 1).padStart(2, "0")}/${watch("date").getFullYear()}`}
          </ThemedText>
          <SvgIcons.Calender fill={Colors[theme].text} width={vs(18)} height={vs(18)} />
        </View>
      </TouchableOpacity>

      <CustomValidation
        inputStyle={[styles.dropdown, { backgroundColor: Colors[theme].inputBg }]}
        type="picker"
       
        control={control}
        name="gender"
        data={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]}
        placeholder={labels.gender}
      />

      <ThemedText style={styles.subsectionTitle}>Location and Address</ThemedText>
      <CustomValidation
        inputStyle={[styles.dropdown, { backgroundColor: Colors[theme].inputBg }]}
        type="picker"
        control={control}
        name="country"
        data={[
          { label: "France", value: "France" },
          { label: "Germany", value: "Germany" },
          { label: "Spain", value: "Spain" },
        ]}
        placeholder={labels.country}
      />

      <View style={styles.citiesContainer}>
        <View style={styles.cityContainer}>
          <CustomValidation
            inputStyle={[styles.dropdown, { backgroundColor: Colors[theme].inputBg }]}
            type="picker"
            control={control}
            name="state"
            data={[
              { label: "Libourne", value: "Libourne" },
              { label: "Paris", value: "Paris" },
              { label: "Lyon", value: "Lyon" },
            ]}
            placeholder={labels.state}
          />
        </View>
        <View style={styles.cityContainer}>
          <CustomValidation
            inputStyle={[styles.dropdown, { backgroundColor: Colors[theme].inputBg, paddingVertical: 0 }]}
            type="picker"
            control={control}
            name="city"
            data={[
              { label: "Auraye", value: "Auraye" },
              { label: "Marseille", value: "Marseille" },
              { label: "Bordeaux", value: "Bordeaux" },
            ]}
            placeholder={labels.city}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="zipCode"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.previewInput,
              {
                color: Colors[theme].text,
                flex: 1,
                backgroundColor: Colors[theme].inputBg,
                borderColor: focusedInput === "zipCode" ? Colors[theme].text : Colors.inputBorder,
              },
            ]}
            placeholder={labels.zipCode}
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              onBlur()
              handleBlur()
            }}
            onFocus={() => handleFocus("zipCode")}
            placeholderTextColor={Colors.internalGray}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.previewInput,
              {
                color: Colors[theme].text,
                flex: 1,
                backgroundColor: Colors[theme].inputBg,
                borderColor: focusedInput === "address" ? Colors[theme].text : Colors.inputBorder,
              },
            ]}
            placeholder={labels.address}
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              onBlur()
              handleBlur()
            }}
            onFocus={() => handleFocus("address")}
            placeholderTextColor={Colors.internalGray}
          />
        )}
      />

      <GradientButton
        style={{ borderRadius: 200, flex: 1 }}
        textStyle={{ fontSize: 16 }}
        title={labels.addNewAltPersona}
        onClick={handleSubmit(onSubmit)}
        gradient
      />
      <GradientButton
        style={{ borderRadius: 200, marginBottom: 5, flex: 1 }}
        textStyle={{ fontSize: 16 }}
        title={labels.cancel}
        onClick={() => setState("initial")}
      />
    </>
  )

  return (
    <View style={[styles.sectionContainer, { backgroundColor: Colors[theme].middleContainerBg }]}>
      <View style={styles.sectionHeader}>
        <View style={[styles.iconStyle, { backgroundColor: Colors[theme].inputBg }]}>
          <SvgIcons.profile height={24} color={Colors[theme].placeholder} />
        </View>
        <ThemedText type="title" style={styles.sectionTitle}>{labels.altPersona}</ThemedText>
      </View>
      {state === "initial" && renderInitial()}
      {state === "form" && renderForm()}
      {state === "preview" && renderPreview()}
    </View>
  )
}

const styles = ScaledSheet.create({
  sectionContainer: {
    padding: "14@s",
    borderRadius: "16@s",
    gap: "10@vs",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    padding: "12@s",
    borderRadius: "100@s",
    flexBasis: "44@s",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "20@s",
    fontWeight: "600",
    marginLeft: "8@s",
  },
  sectionDescription: {
    color: "#969696",
    fontFamily: "medium",
    fontSize: "13@s",
    lineHeight: "20@vs",
  },
  addButton: {
    borderRadius: "16@s",
    padding: "12@s",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: "12@s",
    fontWeight: "500",
  },
  subsectionTitle: {
    fontSize: "16@s",
    marginTop: "8@vs",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: "16@s",
    padding: "12@s",
    fontSize: "16@s",
    fontFamily: "medium",
  },
  halfInput: {
    flex: 0.48,
  },
  dateContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: "16@s",
    color: Colors.internalGray,
  },
  dropdown: {
    marginTop: "-27@vs",
    height: "43@vs",
    borderRadius: "16@s",
    fontSize: "16@s",
    fontFamily: "medium",
  },
  citiesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: "5@s",
  },
  cityContainer: {
    flex: 1,
  },
  button: {
    borderRadius: "100@s",
    padding: "16@s",
    alignItems: "center",
  },
  gradientButton: {
    backgroundColor: "#E94E84",
  },
  buttonText: {
    color: "#fff",
    fontSize: "16@s",
    fontWeight: "500",
  },
  previewText: {
    color: "#fff",
    fontSize: "16@s",
    marginBottom: "8@vs",
  },
  previewButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "8@vs",
    gap: "5@s",
  },
  deleteButton: {
    backgroundColor: "#FF4136",
    flex: 1,
    marginRight: "8@s",
  },
  changeButton: {
    backgroundColor: "#0074D9",
    flex: 1,
    marginLeft: "8@s",
  },
  previewContainer: {
    gap: "10@vs",
  },
  previewLabel: {
    fontSize: "18@s",
    fontWeight: "600",
    marginBottom: "8@vs",
  },
  previewInput: {
    borderRadius: "12@s",
    padding: "12@s",
    fontSize: "16@s",
    borderColor: Colors.inputBorder,
    borderWidth: 1,
  },
  addressInput: {
    minHeight: "80@vs",
  },
  previewButton: {
    flex: 1,
    borderRadius: "12@s",
    padding: "16@s",
    alignItems: "center",
  },
  previewButtonText: {
    color: "#fff",
    fontSize: "16@s",
    fontWeight: "500",
  },
})

export default AltPersonaSection
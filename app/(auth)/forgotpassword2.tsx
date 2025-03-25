import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ms, ScaledSheet, vs } from 'react-native-size-matters'
import CustomHeader from '@/components/CustomHeader'
import { Controller, useForm } from 'react-hook-form'
import { router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'

import { useTheme } from '@/context/ThemeContext'
import { Colors } from '@/constants/Colors'
import { labels } from '@/constants/Labels'
import CustomButton from '@/components/CustomButton'
import { CustomTextInput } from '@/components/ui/CustomTextInput'
import CustomValidation from '@/components/CustomValidation'

type Props = {}

const ForgotPassword = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: ''
    }
  })
  const { theme } = useTheme()
  const onSubmit = (data: any) => {
    console.log(data)
    // Handle form submission, e.g., send reset password email
  }
  const [isFocused, setIsFocused] = useState('')

  return (
    <CustomHeader>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: Colors[theme].background }
        ]}
      >
        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            {labels.enterYourRegisteredEmail}
          </ThemedText>

          <CustomValidation
            type="input"
            control={control}
            labelStyle={styles.label}
            name="email"
            inputStyle={[{ lineHeight: ms(20) }]}
            label={`${labels.email} / ${labels.username}`}
            placeholder={`${labels.enter} ${labels.username}/${labels.email}`}
            onFocus={() => setIsFocused('email')}
            rules={{
              required: labels.emailIsRequired,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: labels.enterAValidEmail
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={[
              {
                borderRadius: ms(20)
              },
              isFocused == 'email'
                ? { borderColor: Colors[theme].text, borderWidth: 1 }
                : {}
            ]}
          />

          <View style={styles.sep}>
            <TouchableOpacity onPress={() => router.dismissTo('/login2')}>
              <ThemedText style={styles.footerLink}>
                {labels.loginInstead}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <CustomButton
            title={labels.sendOtp}
            isGradient
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </CustomHeader>
  )
}

export default ForgotPassword

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: ms(20)
  },
  title: {
    fontSize: ms(32),
    fontWeight: '600',
    marginBottom: vs(8)
  },
  button: {
    borderRadius: ms(25)
  },
  buttonText: {
    fontSize: ms(16),
    fontWeight: '600'
  },
  sep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(14)
  },
  footerLink: {
    color: Colors.grayText,
    fontSize: ms(14),
    fontWeight: 500,
    fontFamily: 'medium'
  },
  label: {
    color: Colors.grayText,
    fontSize: '14@ms',
    marginBottom: '12@ms',
    fontWeight: 400
  }
})

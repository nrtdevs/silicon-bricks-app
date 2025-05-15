import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form';
import CustomValidation from '@/components/CustomValidation';

const add = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
      setValue,
    } = useForm<any>();
  return (
    <SafeAreaView>
          <CustomValidation
              type="input"
              control={control} 
              name={"name"} 
              label={"Name"}  
            />
    </SafeAreaView>
  )
}

export default add

const styles = StyleSheet.create({})
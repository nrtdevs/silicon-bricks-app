import CustomButton from '@/components/CustomButton'
import CustomHeader from '@/components/CustomHeader'
import CustomInput from '@/components/CustomInput'
import CustomToast from '@/components/CustomToast'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { CreateServiceCenterDocument, ServiceCenterStatus, ServiceCenterType } from '@/graphql/generated'
import { useMutation } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import { z } from 'zod'


const serviceCenterSchema = z.object({
  name: z.string().min(1, "Center Name is required"),
  contactNo: z.string().min(1, "Contact Number is required").regex(/^(\+91)?[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  latitude: z.string().min(1, "Latitude is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= -90 && num <= 90;
  }, { message: "Invalid Latitude" }),
  longitude: z.string().min(1, "Longitude is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= -180 && num <= 180;
  }, { message: "Invalid Longitude" }),
  address: z.string().min(1, "Address is required"),
});

type ServiceCenterFormValues = {
  name: string;
  contactNo: string;
  latitude: string;
  longitude: string;
  address: string;
};

const defaultValues: ServiceCenterFormValues = {
  name: "",
  contactNo: "",
  latitude: "",
  longitude: "",
  address: ""
}

const AddService = () => {
  const { theme } = useTheme();
  const { control, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm<ServiceCenterFormValues>({
    resolver: zodResolver(serviceCenterSchema),
    defaultValues: defaultValues
  });

  const [createServiceCenterApi, { loading }] = useMutation(CreateServiceCenterDocument);

  const onSubmit = async (data: ServiceCenterFormValues) => {
    console.log("daTA", data)
    try {
      const response = await createServiceCenterApi({
        variables: {
          createServiceCenterInput: {
            name: data.name,
            contactNo: Number(data.contactNo),
            latitude: (data.latitude),
            longitude: (data.longitude),
            address: data.address,
            status: ServiceCenterStatus.Active,
            type: ServiceCenterType.InHouse,
          },
        },
      });
      console.log("response", response)
      if (response.data?.createServiceCenter?.id) {
        CustomToast("success");
        reset(defaultValues);
        router.navigate("/(vehicle)/service/ServiceCenterList");
      }
    } catch (error: any) {
      CustomToast("error");
    }
  };

  return (
    <CustomHeader
      title="Create Service"
      leftComponent={
        <Pressable
          style={styles.menuButton}
          onPress={() => {
            router.navigate({
              pathname: "/(vehicle)/service/ServiceCenterList",
            })
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors[theme].background }]}>
        <ScrollView>
          <View style={styles.formContainer}>
            <CustomInput
              name="name"
              control={control}
              label="Center Name"
              placeholder="Enter Center Name"
              required={true}
              error={errors.name?.message}
            />
            <CustomInput
              name="contactNo"
              control={control}
              label="Contact Number"
              placeholder="Enter Contact Number"
              required={true}
              type='number'
              error={errors.contactNo?.message}
            />
            <CustomInput
              name="latitude"
              control={control}
              label="Latitude"
              placeholder="Enter Latitude"
              required={true}
              type='number'
              error={errors.latitude?.message}
            />
            <CustomInput
              name="longitude"
              control={control}
              label="Longitude"
              placeholder="Enter Longitude"
              required={true}
              type='number'
              error={errors.longitude?.message}
            />
            <CustomInput
              name="address"
              control={control}
              label="Address"
              placeholder="Enter address"
              required={true}
              multiline={true}
              numberOfLines={5}
              error={errors.address?.message}
            />
            <CustomButton
              title="Create Service"
              onPress={handleSubmit(onSubmit)}
              isLoading={loading}
              disabled={loading}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </CustomHeader>
  )
}

export default AddService

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: ms(12),
  },
  menuButton: {
    padding: ms(10),
  },
  formContainer: {
    flex: 1,
    width: "100%",
  },
  button: {
    marginTop: ms(10),
    marginBottom: ms(20)
  }
})

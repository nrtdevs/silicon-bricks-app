import CustomButton from '@/components/CustomButton'
import CustomHeader from '@/components/CustomHeader'
import CustomInput from '@/components/CustomInput'
import GoogleMapView from '@/components/CustomMap'
import CustomMap from '@/components/CustomMap'
import CustomToast from '@/components/CustomToast'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { CreateServiceCenterDocument, PaginatedServiceCentersDocument, ServiceCenterStatus, ServiceCenterType, UpdateServiceCenterDocument } from '@/graphql/generated'
import { useMutation } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
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

type ServiceCenterFormValues = z.infer<typeof serviceCenterSchema>;

const defaultValues = {
  name: "",
  contactNo: "",
  latitude: "",
  longitude: "",
  address: ""
}

const AddService = () => {
  const { theme } = useTheme();
  const { data } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data as string) : null;
  const { control, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm<ServiceCenterFormValues>({
    resolver: zodResolver(serviceCenterSchema),
    defaultValues: defaultValues
  });

  console.log(parsedData, "parsedData")

  const [createServiceCenterApi, { loading }] = useMutation(CreateServiceCenterDocument, {
    refetchQueries: [{ query: PaginatedServiceCentersDocument, variables: { listInputDto: { limit: 10, page: 1 } } }],
  });
  const [UpdateServiceCenterApi, { loading: updateLoading }] = useMutation(UpdateServiceCenterDocument, {
    refetchQueries: [{ query: PaginatedServiceCentersDocument, variables: { listInputDto: { limit: 10, page: 1 } } }],
  });

  useEffect(() => {
    if (parsedData?.id) {
      setValue('name', parsedData?.name)
      setValue('address', parsedData?.address)
      setValue('contactNo', String(parsedData?.contactNo))
      setValue('latitude', parsedData?.latitude)
      setValue('longitude', parsedData?.longitude)
    }
  }, [parsedData?.id]);

  const onSubmit = async (data: ServiceCenterFormValues) => {
    try {
      let response;

      if (parsedData?.id) {
        response = await UpdateServiceCenterApi({
          variables: {
            updateServiceCenterInput: {
              id: Number(parsedData?.id),
              address: data?.address,
              contactNo: Number(data.contactNo),
              latitude: data?.latitude,
              longitude: data?.longitude,
              name: data?.name,
              status: ServiceCenterStatus.Active,
              type: ServiceCenterType.InHouse,
            },
          },
        });
      } else {
        response = await createServiceCenterApi({
          variables: {
            createServiceCenterInput: {
              name: data.name,
              contactNo: Number(data.contactNo),
              latitude: data.latitude,
              longitude: data.longitude,
              address: data.address,
              status: ServiceCenterStatus.Active,
              type: ServiceCenterType.InHouse,
            },
          },
        });
      }
      // ✅ Now response exists in both cases
      if (response.data?.createServiceCenter?.id || response.data?.updateServiceCenter?.id) {
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
      title={parsedData?.id ? "Update Service" : "Create Service"}
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
              key={`${parsedData?.name}-name`}
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

            <GoogleMapView
              latitude={37.78825}
              longitude={-122.4324}
              height={400}
              onLocationSelect={(lat, lng, address) => {
                console.log("Selected location:", lat, lng, address);
              }}
              showControls={true}
              enableDrawing={true}
            />



            <CustomButton
              title={parsedData?.id ? "Update Service" : "Create Service"}
              onPress={handleSubmit(onSubmit)}
              isLoading={loading || updateLoading}
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

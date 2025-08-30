import CustomHeader from '@/components/CustomHeader'
import CustomInput from '@/components/CustomInput'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import MapView, { Marker } from 'react-native-maps';
import { useMutation } from '@apollo/client';
import CustomToast from '@/components/CustomToast';
import { CreateServiceCenterDocument, ServiceCenterStatus, ServiceCenterType } from '@/graphql/generated'
import { ScrollView } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const serviceCenterSchema = z.object({
  name: z.string().min(1, "Center Name is required"),
  contactNo: z
    .string()
    .min(1, "Contact Number is required")
    .regex(/^(\+91)?[0-9]{10}$/, "Enter a valid 10-digit mobile number"),

  latitude: z.number().min(-90, "Invalid Latitude").max(90, "Invalid Latitude"),
  longitude: z.number().min(-180, "Invalid Longitude").max(180, "Invalid Longitude"),
  address: z.string().min(1, "Address is required"),
});

type ServiceCenterFormValues = z.infer<typeof serviceCenterSchema>;

const defaultValues: ServiceCenterFormValues = {
  name: "",
  contactNo: "",
  latitude: 0,
  longitude: 0,
  address: ""
}

const AddService = () => {
  const { theme } = useTheme();
  const { control, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm<ServiceCenterFormValues>({
    resolver: zodResolver(serviceCenterSchema),
    defaultValues: defaultValues
  });
  const latitude = watch("latitude") || 28.6139;
  const longitude = watch("longitude") || 77.2090;

  const [createServiceCenterApi, { loading }] = useMutation(CreateServiceCenterDocument);

  const onSubmit = async (data: any) => {
    try {
      const response = await createServiceCenterApi({
        variables: {
          createServiceCenterInput: {
            name: data.name,
            contactNo: data.contactNo,
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
            status: ServiceCenterStatus.Active,
            type: ServiceCenterType.InHouse,
          },
        },
      });
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
            {/* Map View */}
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                />
              </MapView>
            </View>
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
  mapContainer: {
    marginTop: ms(12),
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  button: {
    marginTop: ms(10),
    marginBottom: ms(20)
  }
})

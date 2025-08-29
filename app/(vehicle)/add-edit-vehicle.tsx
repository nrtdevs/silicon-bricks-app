import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropdown from "@/components/CustomDropdown";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import DocumentUploader from "@/components/DocumentUploader";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateVehicleDocument, UpdateVehicleDocument } from "@/graphql/generated";
import uploadImage from "@/utils/imageUpload";
import { useMutation } from "@apollo/client";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useNavigation } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { ms, vs } from "react-native-size-matters";


const InsuranceDropdown = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
]

const defaultValues = {
  make: "",
  model: "",
  chassisNumber: "",
  numberPlate: "",
  year: "",
  insurance: "",
  color: "",
  avatar: "",
  insuranceValidTill: null,
}

const VehicleAdd = () => {

  const { control, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm<any>({
    defaultValues: defaultValues
  });

  const { theme } = useTheme();
  const navigation = useNavigation();

  const [CreateVehicle] = useMutation(CreateVehicleDocument);
  const [UpdateVehicle] = useMutation(UpdateVehicleDocument)

  const onSubmit = (data: any) => {

  };


  return (
    <CustomHeader
      title="Create Vehicle"
      leftComponent={
        <Pressable
          style={styles.menuButton}
          onPress={() => {
            router.navigate({
              pathname: "/(vehicle)/vehicle-list",
            })
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: Colors[theme].background }]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>

            {/* Multiple Image Upload */}
            <DocumentUploader
              type="multiple"
              onChange={async (imgs) => {
                const result = await uploadImage(imgs);
                setValue("avatar", result);
              }}
            />

            <CustomInput
              name="make"
              control={control}
              label="Brand"
              placeholder="Enter Brand Name"
              required={true}
            />

            <CustomInput
              name="model"
              control={control}
              label="Model"
              placeholder="Enter Model Name"
              required={true}
            />
            <CustomInput
              name="chassisNumber"
              control={control}
              label="Chassis Number"
              placeholder="Enter Chassis Number"
              required={true}
            />
            <CustomInput
              name="color"
              control={control}
              label="Color"
              placeholder="Enter Color"
              required={true}
            />
            <CustomInput
              name="numberPlate"
              control={control}
              label="Number Plate"
              placeholder="Enter Number Plate"
              required={true}
            />


            <CustomDatePicker
              control={control}
              name="year"
              label="Model Year"
              required
              mode="year"
            />

            <CustomDropdown
              control={control}
              name="insurance"
              label="Insurance"
              required
              placeholder="Select Insurance Option"
              options={InsuranceDropdown}
            />
            {watch('insurance') === 'yes' && (
              <CustomDatePicker
                control={control}
                name="insuranceValidTill"
                label="Insurance Date"
                mode="date"
              />
            )}
          </View>
          <View style={styles.bottomButtonContainer}>
            <CustomButton
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>

      </SafeAreaView>
    </CustomHeader>
  );
};

export default VehicleAdd;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: ms(12),
  },
  menuButton: {
    padding: ms(10),
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: vs(80),
  },
  formContainer: {
    flex: 1,
    width: "100%",
  },
  bottomButtonContainer: {
    marginTop: 15,
    position: "relative",
    bottom: vs(10),
    width: "100%",
    alignSelf: "center",
  },
  submitButton: {
    width: "100%",
  },
});

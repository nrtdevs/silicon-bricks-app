import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropdown from "@/components/CustomDropdown";
import CustomInput from "@/components/CustomInput";
import CustomValidation from "@/components/CustomValidation";
import ImageUploader from "@/components/ImageUploader";
import Loader from "@/components/ui/Loader";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import {
  CreateVehicleDocument,
  UpdateVehicleDocument,
} from "@/graphql/generated";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import uploadImage from "@/utils/imageUpload";
import { useMutation } from "@apollo/client";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { ms, vs } from "react-native-size-matters";


const InsuranceDropdown = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
]

const VehicleAdd = () => {

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1996 }, (_, index) => ({
      label: (1997 + index).toString(),
      value: (1997 + index).toString(),
    }));
  }, []);

  const { control, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm<any>({
    defaultValues: {
      make: "",
      model: "",
      chassisNumber: "",
      numberPlate: "",
      year: "",
      insurance: { label: "No", value: false },
      color: "",
      avatar: "",
      insuranceValidTill: null,
    },
  });

  const { theme } = useTheme();
  const { data: editedData } = useLocalSearchParams<any>();

  useEffect(() => {
    if (editedData) {
      const parsedData = JSON.parse(editedData);
      const yearValue = years?.find(
        (item: any) => item.value === parsedData?.year
      );
      const insuranceValue = InsuranceDropdown?.find(
        (item) => item.value === parsedData?.insurance
      );
      setValue("make", parsedData?.make);
      setValue("model", parsedData?.model);
      setValue("chassisNumber", parsedData?.chassisNumber);
      setValue("numberPlate", parsedData?.numberPlate);
      setValue("year", yearValue);
      setValue("insurance", insuranceValue);
      setValue("insuranceExpiry", parsedData?.insuranceExpiry);
      setValue("color", parsedData?.color);
      setValue("avatar", parsedData?.avatar);
    }
  }, [editedData]);

  const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
    getDateTimePickerProps(false)
  );
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (editedData) {
      navigation.setOptions({ title: 'Edit Vehicle' });
    } else {
      navigation.setOptions({ title: 'Add Vehicle' });
    }
  }, [editedData]);

  const [addVehicleApi, addVehicleStat] = useMutation<any>(
    CreateVehicleDocument,
    {
      onCompleted: (data) => {
        reset();
        router.back();
      },
      onError: (error) => {
        console.log(error);
        Alert.alert("Error", error.message);
      },
    }
  );

  const [editVehicleApi, editVehicleStat] = useMutation<any>(
    UpdateVehicleDocument,
    {
      onCompleted: (data) => {
        reset();
        router.back();
      },
      onError: (error) => {
        console.log(error);
        Alert.alert("Error", error.message);
      },
    }
  );
  const onSubmit = (data: any) => {
    let params = {
      ...data,
      year: data?.year?.value,
      insurance: data?.insurance?.value,
      ...(editedData ? { id: Number(JSON.parse(editedData)?.id) } : {}),
    };

    if (editedData) {
      editVehicleApi({
        variables: {
          updateVehicleInput: params,
        },
      });
    } else {
      addVehicleApi({
        variables: {
          createVehicleInput: params,
        },
      });
    }
  };

  console.log("insurance", watch('insurance'))

  if (addVehicleStat.loading || editVehicleStat.loading) return <Loader />;
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: Colors[theme].background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>

          {/* Multiple Image Upload */}
          <ImageUploader
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
          {watch('insurance')?.value === 'yes' && (
            <CustomDatePicker
              control={control}
              name="insuranceValidTill"
              label="Insurance Date"
              mode="date"
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <CustomButton
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default VehicleAdd;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: ms(12),
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
    position: "absolute",
    bottom: vs(10),
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: ms(12),
  },
  submitButton: {
    width: "100%",
  },
});

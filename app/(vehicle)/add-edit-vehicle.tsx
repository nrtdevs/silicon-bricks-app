import CustomButton from "@/components/CustomButton";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropdown from "@/components/CustomDropdown";
import CustomInput from "@/components/CustomInput";
import CustomValidation from "@/components/CustomValidation";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import Loader from "@/components/ui/Loader";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import {
  CreateVehicleDocument,
  UpdateVehicleDocument,
} from "@/graphql/generated";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import uploadImage from "@/utils/imageUpload";
import { useMutation } from "@apollo/client";
import { Fontisto } from "@expo/vector-icons";
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

  

  if (addVehicleStat.loading || editVehicleStat.loading) return <Loader />;
  return (
    <SafeAreaView
      style={{
        padding: ms(12),
        alignItems: "center",
        backgroundColor: Colors[theme].background,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: vs(60) }}
      >
        <CustomValidation
          type="image"
          control={control}
          name={"avatar"}
          label={"Avatar"}
          defaultValue={""}
          imageResponseHandler={async (image: any) => {
            const result = await uploadImage(image?.uri);
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
          placeholder="Select Gender"
          options={InsuranceDropdown}
        />

        <CustomDatePicker
          control={control}
          name="insuranceValidTill"
          label="Insurance Date"
          mode="date"
        />

      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: vs(10),
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
       
        <CustomButton
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          style={{ width: "48%" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default VehicleAdd;

const styles = StyleSheet.create({});

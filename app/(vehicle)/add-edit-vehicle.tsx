import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import { ms, vs } from "react-native-size-matters";
import CustomButton from "@/components/CustomButton";
import { Fontisto } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useTheme } from "@/context/ThemeContext";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import uploadImage from "@/utils/imageUpload";
import { useMutation } from "@apollo/client";
import {
  CreateVehicleDocument,
  UpdateVehicleDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import { router, useLocalSearchParams, useNavigation } from "expo-router";

const VehicleAdd = () => {
  const insuranceOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1996 }, (_, index) => ({
      label: (1997 + index).toString(),
      value: (1997 + index).toString(),
    }));
  }, []); 

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<any>({
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
      const insuranceValue = insuranceOptions?.find(
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
        <CustomValidation
          type="input"
          control={control}
          name={"make"}
          label={"Brand"}
          rules={{ required: "Brand is required" }}
        />
        <CustomValidation
          type="input"
          control={control}
          name={"model"}
          label={"Model"}
          rules={{ required: "Model is required" }}
        />
        <CustomValidation
          type="input"
          control={control}
          name={"chassisNumber"}
          label={"Chassis Number"}
          rules={{ required: "Chassis Number is required" }}
        />
        <CustomValidation
          type="input"
          control={control}
          name={"color"}
          label={"Color"}
          rules={{ required: "Color is required" }}
        />
        <CustomValidation
          type="input"
          control={control}
          name={"numberPlate"}
          label={"Number"}
          rules={{ required: "Number is required" }}
        />
        <CustomValidation
          type="picker"
          control={control}
          name={"year"}
          label={"Model Year"}
          data={years}
          rules={{ required: "Model Year is required" }}
          isSearch={true}
        />
        <CustomValidation
          type="picker"
          control={control}
          name={"insurance"}
          label={"Insurance"}
          data={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
        />
        {watch("insurance")?.value && (
          <CustomValidation
            type="input"
            control={control}
            placeholder="Start Date"
            name="insuranceValidTill"
            label="Insurance Valid Till"
            editable={false}
            rightIcon={
              <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
            }
            onPress={() => {
              setDateTimePickerProps(getDateTimePickerProps(true));
            }}
            pointerEvents="none"
            rules={{ required: "Insurance Valid Till is required" }}
          />
        )}
        <DateTimePickerModal
          mode="date"
          dateTimePickerProps={dateTimePickerProps}
          setDateTimePickerProps={setDateTimePickerProps}
          onDateTimeSelection={(event: any, selectedDate: any) => {
            if (event.type != "dismissed")
              setValue(
                "insuranceValidTill",
                formatTimeForAPI(selectedDate, "yyyy-mm-dd") || ""
              );
            setDateTimePickerProps(getDateTimePickerProps(false));
          }}
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
        <CustomButton title="Clear" onPress={reset} style={{ width: "48%" }} />
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

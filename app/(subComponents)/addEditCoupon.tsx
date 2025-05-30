import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import CustomButton from "@/components/CustomButton";
import { Feather, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useTheme } from "@/context/ThemeContext";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import { useMutation } from "@apollo/client";
import {
  CreateCouponDocument,
  UpdateCouponDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Env } from "@/constants/ApiEndpoints";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "@/components/CustomHeader";

const AddEditCoupon = () => {
  const [createCoupon, createCouponState] = useMutation<any>(
    CreateCouponDocument,
    {
      onCompleted: (data) => {
        reset();
        router.back();
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const [updateCoupon, updateCouponState] = useMutation(UpdateCouponDocument, {
    onCompleted: (data) => {
      reset();
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

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
  } = useForm<{
    couponCode: any;
    usageLimit: string;
    description: string;
    discountValue: string;
    minOrderAmount: string;
    start_date: string;
    end_date: string;
    status: any;
  }>({
    defaultValues: {},
  });

  const [dateModal, setDateModal] = useState({
    start: false,
    end: false,
  });

  const { theme } = useTheme();
  const { data: editedData } = useLocalSearchParams<any>();

  const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
    getDateTimePickerProps(false)
  );
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (editedData) {
        // couponCode: item?.couponCode,
        // usageLimit: item?.usageLimit,
        // description: item?.description,
        // discountValue: item?.discountValue,
        // minOrderAmount: item?.minOrderAmount,
        // start_date: item?.startDate,
        // end_date: item?.endDate,
        // status: item?.status,
        // id: item?.id,
        const parsedData = JSON.parse(editedData);
        setValue("couponCode", parsedData?.couponCode || "");
        setValue("usageLimit", parsedData?.usageLimit?.toString() || "");
        setValue("description", parsedData?.description || "");
        setValue("discountValue", parsedData?.discountValue?.toString() || "");
        setValue(
          "minOrderAmount",
          parsedData?.minOrderAmount?.toString() || ""
        );
        setValue(
          "start_date",
          formatTimeForAPI(parsedData?.startDate, "yyyy-mm-dd") || ""
        );
        setValue(
          "end_date",
          formatTimeForAPI(parsedData?.endDate, "yyyy-mm-dd") || ""
        );
      }
    }, [editedData])
  );

  const parseDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split("/");
    return new Date(+year, +month - 1, +day);
  };

  const onSubmit = (data: any) => {
    try {
      const startDate = parseDate(data?.start_date);
      const endDate = parseDate(data?.end_date);

      if (endDate < startDate) {
        console.log("End date should be greater than or equal to start date.");
        Alert.alert(
          "Error",
          "End date should be greater than or equal to start date."
        );
        return;
      }

      if (Number(data?.minOrderAmount) < Number(data?.discountValue)) {
        console.log("Min Order should be greater than discount value date.");
        Alert.alert(
          "Error",
          "Min Order should be greater than or equal to discount value."
        );
        return;
      }

      let params = {
        couponCode: data?.couponCode,
        minOrderAmount: Number(data?.minOrderAmount),
        discountValue: Number(data?.discountValue),
        // discountType: data?.discountType?.value,
        usageLimit: Number(data?.usageLimit),
        startDate: data?.start_date,
        endDate: data?.end_date,
        description: data?.description ?? "",
      };
      // console.log('params', params);

      if (editedData) {
        const parsedData = JSON.parse(editedData);
        updateCoupon({
          variables: {
            updateCouponInput: {
              ...params,
              id: Number(parsedData?.id),
            },
          },
        });
        return;
      }
      createCoupon({
        variables: {
          createCouponInput: params,
        },
      });
    } catch (error) {
      console.log("error in onSubmit", error);
    }
  };

  if (createCouponState.loading || updateCouponState.loading) return <Loader />;

  return (
    <CustomHeader
      leftComponent={
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={{ padding: ms(10) }}
        >
          <FontAwesome5
            name="arrow-left"
            size={22}
            color={Colors[theme].text}
          />
        </Pressable>
      }
      title={editedData ? "Edit Coupon" : "Add Coupon"}
    >
      <ScrollView
        contentContainerStyle={{
          borderRadius: 10,
          padding: 10,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 20,
                    }}
                >
                    <ThemedText type="subtitle">
                        Coupon
                    </ThemedText>
                </View> */}

        <View style={{ padding: 10, paddingTop: 0 }}>
          <CustomValidation
            type="input"
            control={control}
            labelStyle={styles.label}
            name={"couponCode"}
            inputStyle={[{ lineHeight: ms(20) }]}
            label={"Coupon Code"}
            placeholder={"Provide coupon code"}
            rules={{
              required: "couponCode is required",
            }}
            autoCapitalize="none"
          />

          <CustomValidation
            type="input"
            control={control}
            name={"minOrderAmount"}
            keyboardType="number-pad"
            label={"Min Order Amount"}
            placeholder={"Enter min order amount"}
            labelStyle={styles.label}
            rules={{
              required: "Min order amount is required",
            }}
          />

          <CustomValidation
            type="input"
            control={control}
            name={"discountValue"}
            label={"discount Value"}
            placeholder={"Discount Value"}
            keyboardType="number-pad"
            labelStyle={styles.label}
            rules={{
              required: "Max discount amount is required",
            }}
          />

          <CustomValidation
            type="input"
            control={control}
            name={"usageLimit"}
            keyboardType="number-pad"
            label={"Usage Limit"}
            placeholder={"Enter usageLimit"}
            labelStyle={styles.label}
            rules={{
              required: "Usage limit is required",
            }}
          />

          <CustomValidation
            type="input"
            control={control}
            placeholder="Start Date"
            name="start_date"
            label="Start Date"
            labelStyle={styles.label}
            editable={false}
            rightIcon={
              <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
            }
            onPress={() => {
              setDateModal({
                start: !dateModal.start,
                end: false,
              });
              setDateTimePickerProps(getDateTimePickerProps(true));
            }}
            pointerEvents="none"
            rules={{
              required: "Start date is required",
            }}
          />

          <CustomValidation
            type="input"
            control={control}
            placeholder="End Date"
            name="end_date"
            label="End Date"
            labelStyle={styles.label}
            editable={false}
            rightIcon={
              <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
            }
            onPress={() => {
              setDateModal({
                end: !dateModal.end,
                start: false,
              });
              setDateTimePickerProps(getDateTimePickerProps(true));
            }}
            pointerEvents="none"
            rules={{
              required: "End date is required",
            }}
          />

          {/* <CustomValidation
                            type="input"
                            control={control}
                            placeholder="End Date"
                            name="end_date"
                            label="End Date"
                            labelStyle={styles.label}
                            rightIcon={
                                <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                            }
                            onPress={() => {
                                setDateModal({
                                    end: !dateModal.end,
                                    start: false,
                                });
                                setDateTimePickerProps(getDateTimePickerProps(true));
                            }}
                            pointerEvents="none"
                            rules={{
                                required: "End date is required",
                            }}
                        /> */}

          <CustomValidation
            type="input"
            control={control}
            name={"description"}
            multiline
            label={"Description"}
            // placeholder={editModal ? "Test organization description" : "Enter description"}
            labelStyle={styles.label}
            inputContainerStyle={{
              height: vs(100),
            }}
            inputStyle={{
              height: vs(100),
            }}
            containerStyle={{
              height: vs(100),
            }}
            autoCapitalize="none"
          />

          <CustomButton
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: Colors[theme].cart,
              marginTop: vs(50),
            }}
          />
        </View>
      </ScrollView>

      {/* date time picker modal */}
      <DateTimePickerModal
        mode="date"
        dateTimePickerProps={dateTimePickerProps}
        setDateTimePickerProps={setDateTimePickerProps}
        onDateTimeSelection={(event: any, selectedDate: any) => {
          if (event.type != "dismissed") {
            setValue(
              dateModal.start ? "start_date" : "end_date",
              formatTimeForAPI(selectedDate, "yyyy-mm-dd") || ""
            );
          }
          setDateTimePickerProps(getDateTimePickerProps(false));
        }}
      />
    </CustomHeader>
  );
};

export default AddEditCoupon;

const styles = ScaledSheet.create({
  imageContainer: {
    width: "70@ms",
    height: "70@ms",
    borderRadius: "70@ms",
    marginBottom: "12@ms",
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: ms(50),
    resizeMode: "cover",
  },
  editImage: {
    position: "absolute",
    top: 3,
    left: 50,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
});

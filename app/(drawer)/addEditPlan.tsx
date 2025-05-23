import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import CustomButton from "@/components/CustomButton";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useTheme } from "@/context/ThemeContext";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
    CreatePlanDocument,
    CreateUserDocument,
    CreateVehicleDocument,
    DropdownRolesDocument,
    PaginatedCouponsDocument,
    PaginatedPackagesDocument,
    UpdatePlanDocument,
    UpdateUserDocument,
    UpdateVehicleDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Env } from "@/constants/ApiEndpoints";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "@/components/CustomHeader";
import * as FileSystem from "expo-file-system";


const designationData = [
    { label: "CEO", value: "CEO" },
    { label: "CTO", value: "CTO" },
    { label: "Employee", value: "EMPLOYEE" },
    { label: "HR", value: "HR" },
    { label: "Manager", value: "MANAGER" },
    { label: "Super Admin", value: "SUPER_ADMIN" },
    { label: "Team Lead", value: "TEAM_LEAD" },
];

const pickerData = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Blocked", value: "blocked" },
    { label: "Pending", value: "pending" },
];

const userTypeData = [
    { label: "admin", value: "admin" },
    { label: "adminEmployee", value: "adminEmployee" },
    { label: "organization", value: "organization" },
    { label: "organizationEmployee", value: "organizationEmployee" },
];

const AddEditPlan = () => {
    const insuranceOptions = [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ];


    useEffect(() => {
        dropdownCouponData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
        dropdownPackageData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
    }, [])

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear - 1996 }, (_, index) => ({
            label: (1997 + index).toString(),
            value: (1997 + index).toString(),
        }));
    }, []);
    const [image, setImage] = useState<string>("");
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<{
        name: string;
        discountPrice: string;
        duration: string;
        price: string;
        package: any;
        coupon: any;
        description: string;
        status: any;
    }>({
        defaultValues: {},
    });
    const { theme } = useTheme();
    const { data: editedData } = useLocalSearchParams<any>();



    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );


    useFocusEffect(
        useCallback(() => {
            if (editedData) {

                const parsedData = JSON.parse(editedData);
                console.log("editedData", parsedData);
                setValue("name", parsedData?.name);
                setValue("duration", parsedData?.duration?.toString());
                setValue("package", Number(parsedData?.package?.id));
                setValue("price", parsedData?.price);
                setValue("coupon", parsedData?.coupon?.id);
                setValue("description", parsedData?.description);
            }
        }, [editedData])
    );

    useEffect(() => {
        if (watch("package")) {
            console.log('00000', watch('package'));
            setValue("price", watch("package")?.price.toString());
        }
    }, [watch("package")])

    const [createPlan, createPlanState] = useMutation<any>(CreatePlanDocument, {
        onCompleted: (data) => {
            reset();
            router.back();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const [updatePlan, updatePlanState] = useMutation(UpdatePlanDocument, {
        onCompleted: (data) => {
            reset()
            router.back();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const [dropdownCouponData, couponData] = useLazyQuery(
        PaginatedCouponsDocument
    );

    const [dropdownPackageData, packageData] = useLazyQuery(
        PaginatedPackagesDocument
    );
    const onSubmit = (data: any) => {
        try {
            let params = {
                name: data?.name,
                duration: Number(data?.duration),
                // designation: typeof data?.designation == 'string' ? data?.designation : data?.designation?.value,
                packageId: typeof data?.package == 'string' ? data?.package : Number(data?.package?.id),
                price: Number(data?.price),
                // couponId: typeof data?.coupon == 'string' ? Number(data?.coupon) : Number(data?.coupon?.id),
                description: data?.description ?? "",
            }
            console.log('params22', typeof data?.package);
            console.log('params', typeof params?.packageId);

            if (editedData) {
                const parsedData = JSON.parse(editedData);
                updatePlan({
                    variables: {
                        updatePlanInput: {
                            ...params,
                            id: Number(parsedData?.id),
                        }
                    },
                })
                return;
            }
            createPlan({
                variables: {
                    createPlanInput: params,
                },
            });
        } catch (error) {
            console.log('error in onSubmit', error);
        }
    };

    if (createPlanState.loading || updatePlanState.loading) return <Loader />;

    return (
        <CustomHeader>
            <ScrollView
                contentContainerStyle={{
                    backgroundColor: Colors[theme].cart,
                    // height: vs(500),
                    width: '100%',
                    borderRadius: 10,
                    alignSelf: "center",
                    padding: 10,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 20,
                    }}
                >
                    <ThemedText type="subtitle">
                        Plan
                    </ThemedText>
                </View>

                <View style={{ padding: 10 }}>
                    <CustomValidation
                        type="input"
                        control={control}
                        labelStyle={styles.label}
                        name={"name"}
                        inputStyle={[{ lineHeight: ms(20) }]}
                        label={"Name"}
                        placeholder={"Provide Name"}
                        rules={{
                            required: "Name is required",
                        }}
                        autoCapitalize="none"
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        labelStyle={styles.label}
                        name={"duration"}
                        inputStyle={[{ lineHeight: ms(20) }]}
                        label={"Duration (in month)"}
                        placeholder={"Provide Duration"}
                        rules={{
                            required: "Duration is required",
                        }}
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />

                    <CustomValidation
                        data={packageData?.data?.paginatedPackages?.data}
                        type="picker"
                        control={control}
                        keyToCompareData="id"
                        keyToShowData="name"
                        label="Package"
                        labelStyle={styles.label}
                        name="package"
                        placeholder="Select Package"
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select PackageType",
                            },
                        }}
                        isSearch
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        labelStyle={styles.label}
                        name={"price"}
                        inputStyle={[{ lineHeight: ms(20) }]}
                        editable={false}
                        label={"Price"}
                        placeholder={"Provide Price"}
                        rules={{
                            required: "Price is required",
                        }}
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />

                    <CustomValidation
                        data={couponData?.data?.paginatedCoupons?.data}
                        type="picker"
                        keyToCompareData="id"
                        keyToShowData="couponCode"
                        control={control}
                        label="Coupon"
                        labelStyle={styles.label}
                        name="coupon"
                        placeholder="Select Coupon"
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select CouponType",
                            },
                        }}
                        isSearch
                    />

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
                        onPress={() => {
                            handleSubmit(onSubmit)();
                        }}
                        style={{
                            backgroundColor: Colors[theme].background,
                            marginTop: vs(50),
                        }}
                    />
                </View>
            </ScrollView>
        </CustomHeader>
    );
};

export default AddEditPlan;

const styles = ScaledSheet.create({
    imageContainer: {
        width: '90@ms',
        height: '90@ms',
        borderRadius: '70@ms',
        marginBottom: '12@ms',
        backgroundColor: Colors.gray,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: ms(50),
        resizeMode: 'cover',
    },
    editImage: {
        position: 'absolute',
        top: 3,
        left: 55,
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: Colors.grayText,
        fontSize: "14@ms",
        marginBottom: "12@ms",
        fontWeight: 400,
    },
});

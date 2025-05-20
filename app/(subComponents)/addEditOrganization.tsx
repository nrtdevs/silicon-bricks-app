import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
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
import uploadImage from "@/utils/imageUpload";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
    CreateVehicleDocument,
    DropdownRolesDocument,
    UpdateVehicleDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Env } from "@/constants/ApiEndpoints";
import * as ImagePicker from "expo-image-picker";

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

const VehicleAdd = () => {
    const insuranceOptions = [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ];

    const [
        getUserRoles,
        { data: roleData, loading: roleLoading, error: roleError },
    ] = useLazyQuery(DropdownRolesDocument);

    useEffect(() => {
        getUserRoles({
            variables: {
                listInputDto: {},
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

    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const uri = result.assets[0].uri;
            uploadImage(uri);
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
                contentContainerStyle={{
                    backgroundColor: Colors[theme].cart,
                    // height: vs(640),
                    width: "100%",
                    borderRadius: 10,
                    alignSelf: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 22,
                    justifyContent: "flex-start",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                    }}
                >
                    <ThemedText type="subtitle">
                        {editModal ? "Edit User" : "Create User"}
                    </ThemedText>
                </View>

                <View style={{ padding: 10, position: "relative" }}>
                    <Pressable
                        style={styles.imageContainer}
                    >
                        <Image
                            source={{
                                uri: `${Env?.SERVER_URL}${image}`,
                            }}
                            style={styles.image}
                        />
                    </Pressable>

                    {<Pressable
                        onPress={handleImagePickerPress}
                        style={styles?.editImage}>
                        <Feather name="edit-2" size={ms(18)} color='black' style={{ fontWeight: 'bold', }} />
                    </Pressable>}

                    <CustomValidation
                        type="input"
                        control={control}
                        labelStyle={styles.label}
                        name={"name"}
                        inputStyle={[{ lineHeight: ms(20) }]}
                        label={"Name"}
                        rules={{
                            required: "Name is required",
                        }}
                        autoCapitalize="none"
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        name={"email"}
                        label={"Email"}
                        labelStyle={styles.label}
                        rules={{
                            required: "User email is required",
                        }}
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        name={"phoneNo"}
                        // keyboardType="phone-pad"
                        label={"Phone No"}
                        labelStyle={styles.label}
                        rules={{
                            required: "User phoneNo is required",
                        }}
                    />

                    <CustomValidation
                        data={designationData}
                        type="picker"
                        hideStar={false}
                        control={control}
                        name="designation"
                        label="Designation"
                        labelStyle={styles.label}
                        placeholder="Select Designation"
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select a designation",
                            },
                        }}
                    />

                    <CustomValidation
                        data={roleData?.dropdownRoles?.data}
                        type="picker"
                        hideStar={false}
                        keyToCompareData="id"
                        keyToShowData="name"
                        control={control}
                        name="roles"
                        label="Role"
                        labelStyle={styles.label}
                        multiSelect
                        placeholder="Select role name"
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select a role",
                            },
                        }}
                    />

                    <CustomValidation
                        data={userTypeData}
                        type="picker"
                        hideStar={false}
                        control={control}
                        keyToCompareData="value"
                        keyToShowData="label"
                        label="User Type"
                        labelStyle={styles.label}
                        name="usertype"
                        placeholder="Select UserType"
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select a User Type",
                            },
                        }}
                    />
                </View>

                <CustomButton
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                    style={{
                        backgroundColor: Colors[theme].background,
                        marginTop: vs(10),
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default VehicleAdd;

const styles = ScaledSheet.create({
    imageContainer: {
        width: '70@ms',
        height: '70@ms',
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
        left: 50,
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

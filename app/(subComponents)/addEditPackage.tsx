import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
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
    CreatePackageDocument,
    CreateUserDocument,
    CreateVehicleDocument,
    DropdownRolesDocument,
    PaginatedModulesDocument,
    UpdatePackageDocument,
    UpdateUserDocument,
    UpdateVehicleDocument,
} from "@/graphql/generated";
import Loader from "@/components/ui/Loader";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Env } from "@/constants/ApiEndpoints";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "@/components/CustomHeader";


const AddEditPackage = () => {

    const [updatePackage, updatePackageState] = useMutation(
        UpdatePackageDocument,
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

    const [createPackage, createPackageState] = useMutation(
        CreatePackageDocument,
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

    const [
        moduleDataApi,
        {
            error: moduleError,
            data: moduleData,
            loading: moduleLoading,
            refetch: moduleRefetch,
        },
    ] = useLazyQuery(PaginatedModulesDocument);

    useEffect(() => {
        moduleDataApi({
            variables: {
                listInputDto: {}
            },
            fetchPolicy: "network-only"
        });
    }, [])

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
        name: string;
        description: string;
        offerDescription: string;
        status: any;
        price: string;
        discountedPrice: string;
        module: any;
        endDate: string;
        offer;
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
                const parsedData = JSON.parse(editedData);
                let ids = parsedData?.modules?.map((item: any) => item.id);
                console.log('parsedData', parsedData);
                setValue("name", parsedData?.name);
                setValue("description", parsedData?.description);
                setValue("offerDescription", parsedData?.offerDescription);
                setValue("price", parsedData?.price.toString());
                setValue("module", ids);
                
                setValue(
                    "endDate",
                    formatTimeForAPI(parsedData?.offerExpiryDate, "yyyy-mm-dd") || ""
                );
                // setValue("start_date", formatTimeForAPI(currentCoupon?.start_date, "yyyy-mm-dd") || "");
                setValue("discountedPrice", parsedData?.discountedPrice.toString());
            }
        }, [editedData])
    );

    const onSubmit = (data: any) => {
        try {
            const moduleIds = data?.module?.map(Number);
            if (Number(data?.price) < Number(data?.discountedPrice)) {
                console.log("Price should be greater than discounted price date.");
                Alert.alert("Error", "Price should be greater than discounted price.");
                return;
            }
            let params = {
                name: data?.name,
                offerExpiryDate: data?.endDate,
                price: Number(data?.price),
                discountedPrice: Number(data?.discountedPrice),
                moduleIds: moduleIds,
                description: data?.description ?? "",
                offerDescription: data?.offerDescription ?? "",
            };

            if (editedData) {
                const parsedData = JSON.parse(editedData);
                updatePackage({
                    variables: {
                        updatePackageInput: {
                            ...params,
                            id: Number(parsedData?.id),
                        }
                    },
                })
                return;
            }
            console.log("params", params);
            createPackage({
                variables: {
                    createPackageInput: params,
                },
            })
        } catch (error) {
            console.log("error in onSubmit", error);
        }
    };

    if (createPackageState.loading || updatePackageState.loading) return <Loader />;

    return (
        <CustomHeader>
            <ScrollView
                contentContainerStyle={{
                    // backgroundColor: Colors[theme].cart,
                    borderRadius: 10,
                    padding: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 20,
                    }}
                >
                    <ThemedText type="subtitle">
                        Package
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
                        placeholder={"Enter Name"}
                        rules={{
                            required: "name is required",
                        }}
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        placeholder="End Date"
                        name="endDate"
                        label="End Date"
                        labelStyle={styles.label}
                        editable={false}
                        rightIcon={
                            <Fontisto
                                name="date"
                                size={ms(20)}
                                color={Colors[theme]?.text}
                            />
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
                            required: "End date is required",
                        }}
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        name={"price"}
                        label={"Price"}
                        rightIcon={null}
                        placeholder={"Enter Price"}
                        keyboardType="number-pad"
                        labelStyle={styles.label}
                        rules={{
                            required: "Price is required",
                        }}
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        name={"discountedPrice"}
                        keyboardType="number-pad"
                        label={"Discounted Price"}
                        placeholder={"Discounted Price"}
                        labelStyle={styles.label}
                        rules={{
                            required: "Discounted price is required",
                        }}
                    />

                    <CustomValidation
                        data={moduleData?.paginatedModules?.data}
                        type="picker"
                        control={control}
                        keyToCompareData="id"
                        keyToShowData="name"
                        label="Module"
                        labelStyle={styles.label}
                        multiSelect={true}
                        name="module"
                        placeholder="Select Module"
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select Module",
                            },
                        }}
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        name={"offerDescription"}
                        multiline
                        label={"Offer Description"}
                        // placeholder={editModal ? "Test organization Offer Description" : "Enter Offer Description"}
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
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        name={"description"}
                        multiline
                        label={"Description"}
                        // placeholder={editModal ? "Test organization description" : "Enter description"}
                        labelStyle={[styles.label, { marginTop: vs(30) }]}
                        inputContainerStyle={{
                            height: vs(100),
                        }}
                        inputStyle={{
                            height: vs(100),
                        }}
                        containerStyle={{
                            height: vs(100),
                        }}
                    />

                    <CustomButton
                        title="Submit"
                        onPress={() => {
                            handleSubmit(onSubmit)();
                        }}
                        isLoading={
                            updatePackageState.loading || createPackageState.loading
                        }
                        style={{
                            backgroundColor: Colors[theme].background,
                            marginTop: vs(90),
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
                            dateModal.start ? "endDate" : "endDate",
                            formatTimeForAPI(selectedDate, "yyyy-mm-dd") || ""
                        );
                    }
                    setDateTimePickerProps(getDateTimePickerProps(false));
                }}
            />
        </CustomHeader>
    );
};

export default AddEditPackage;

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

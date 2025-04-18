import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { AllPermissionsDocument, CreateRoleDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import CustomValidation from "@/components/CustomValidation";
import { set, useForm } from "react-hook-form";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import CustomButton from "@/components/CustomButton";

const CreateRoleScreen = () => {
    const [rolesData, { data, error, loading, refetch }] = useLazyQuery<any>(
        AllPermissionsDocument
    );

    const [createRole,] = useMutation(CreateRoleDocument, {
        onCompleted: (data) => {
            refetch();
            //   setEditVisible(false);
            //   setCurrentProject(defaultValue)
            //   setModalVisible(false);
            setSelectedRoles([]);
            setValue("name", "");
            Alert.alert("Success", "Role created successfully");

        },
        onError: (error) => {
            setSelectedRoles([]);
            setValue("name", "");
            Alert.alert("Error09", error.message);
        }
    });

    const [currentRole, setCurrentRole] = useState<string>("");
    const [selectedRoles, setSelectedRoles] = useState<any>([]);
    const [roleHeadings, setRoleHeadings] = useState<any>([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<{ role: any, name: string }>({
        defaultValues: {},
    });

    const { theme } = useTheme();

    useEffect(() => {
        rolesData();
    }, []);

    // useEffect(() => {
    //     if (data?.allPermissions?.apps) {
    //         setRoleHeadings((prev: any) => [
    //             ...prev,
    //             ...data.allPermissions.apps.map((item: any) => item.appName),
    //         ])
    //     }
    // }, [data])

    // console.log("9999", selectedRoles);

    useEffect(() => {
        setCurrentRole(watch("role")?.appName);
        setSelectedRoles([])
    }, [watch("role")]);

    const onSubmit = () => {
        // console.log("9999", selectedRoles);
        // const roleIds: number[] = [];
        // if (selectedRoles && Array.isArray(selectedRoles)) {
        //     for (let i = 0; i < selectedRoles.length; i++) {
        //         roleIds.push(Number(selectedRoles[i]));
        //     }
        // }
        const params = {
            name: watch('name'),
            permissionIds: selectedRoles
        }
        console.log('087p', typeof params?.permissionIds[0]);
        createRole({
            variables: {
                data: params
            },
        });
        // createRole(
        //     {
        //         variables: {
        //             data: params
        //         }
        //     }
        // )
    }

    return (
        <CustomHeader>
            <ScrollView contentContainerStyle={styles.container}>
                <ThemedView>
                    <CustomValidation
                        data={data?.allPermissions?.apps}
                        type="picker"
                        keyToCompareData="appName"
                        keyToShowData="appName"
                        control={control}
                        name="role"
                        label="Select role name"
                        labelStyle={styles.label}
                        placeholder="Select role name"
                        inputStyle={{ height: vs(50) }}
                    // rules={{
                    //     required: {
                    //         value: true,
                    //         message: "Select a role",
                    //     },
                    // }}
                    />

                    <CustomValidation
                        type="input"
                        control={control}
                        labelStyle={styles.label}
                        name={"name"}
                        inputStyle={[{ lineHeight: ms(20) }]}
                        label={"Name"}
                        rules={{
                            required: "name is required",
                        }}
                        autoCapitalize="none"
                    />

                    <View style={{ marginTop: 20 }}>
                        {data?.allPermissions?.apps?.map(
                            (item: any) =>
                                item?.appName === currentRole &&
                                item?.modules?.map((item: any) => {
                                    let currentRoles = item?.permissions?.map(
                                        (item: any) => item.id
                                    );
                                    let allIncluded = currentRoles.every((el) =>
                                        selectedRoles?.includes(el)
                                    );
                                    // console.log("00089", allIncluded);
                                    return (
                                        <View >
                                            <View style={{ marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                                                <Pressable
                                                    // onPress={() => {
                                                    //     let arr = [];
                                                    //     allIncluded 
                                                    //         ? (arr = selectedRoles.filter(
                                                    //             (el) => !currentRoles?.includes(el)
                                                    //         ))
                                                    //         : arr = selectedRoles.forEach((el) => {
                                                    //             if (!selectedRoles?.includes(el)) {
                                                    //                 selectedRoles.push(el);
                                                    //             }
                                                    //         });

                                                    //         console.log(arr);

                                                    //     setSelectedRoles(arr);
                                                    // }}
                                                    onPress={() => {
                                                        let arr: any[] = [];

                                                        if (allIncluded) {
                                                            // Remove currentRoles from selectedRoles
                                                            arr = selectedRoles.filter(el => !currentRoles?.includes(el));
                                                            // allIncluded = true;
                                                        } else {
                                                            // Add currentRoles to selectedRoles without duplicates
                                                            const added = currentRoles?.filter(el => !selectedRoles.includes(el)) || [];
                                                            arr = [...selectedRoles, ...added];
                                                        }
                                                        // console.log("Updated roles:", allIncluded);
                                                        setSelectedRoles(arr);
                                                    }}
                                                >
                                                    <MaterialCommunityIcons
                                                        name={
                                                            allIncluded
                                                                ? "checkbox-outline"
                                                                : "checkbox-blank-outline"
                                                        }
                                                        size={35}
                                                        color={Colors[theme].text}
                                                    />
                                                </Pressable>
                                                <ThemedText type="subtitle" >{item.name}</ThemedText>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                    gap: 10,
                                                }}
                                            >
                                                {item.permissions?.map((item: any) => {
                                                    return (
                                                        <View
                                                            style={{
                                                                flexDirection: "row",
                                                                // backgroundColor:'white'
                                                            }}
                                                        >
                                                            {/* <CustomValidation
                                                                type="checkbox"
                                                                control={control}

                                                                label={item.action}
                                                                name={item.action}
                                                            /> */}
                                                            <Pressable onPress={() => {
                                                                setSelectedRoles(prev =>
                                                                    prev.includes(item.id)
                                                                        ? prev.filter(id => id !== item.id)
                                                                        : [...prev, item.id]
                                                                );
                                                            }}>
                                                                <MaterialCommunityIcons
                                                                    name={
                                                                        selectedRoles.includes(item.id)
                                                                            ? "checkbox-outline"
                                                                            : "checkbox-blank-outline"
                                                                    }
                                                                    size={28}
                                                                    color={Colors[theme].text}
                                                                />
                                                            </Pressable>
                                                            {/* <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" /> */}
                                                            <ThemedText style={{ fontSize: 20 }}>{item.action}</ThemedText>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                            <View style={{ height: 30 }} />
                                        </View>
                                    );
                                })
                        )}
                    </View>

                    <CustomButton
                        title="Save"
                        onPress={onSubmit}
                    />

                </ThemedView>
            </ScrollView>
        </CustomHeader>
    );
};

const styles = ScaledSheet.create({
    container: {
        padding: '12@ms',
        // paddingBottom: '100@vs',
        paddingBottom: '25@vs',
    },
    label: {
        color: Colors.grayText,
        fontSize: "14@ms",
        marginBottom: "12@ms",
        fontWeight: 400,
    },

});

export default CreateRoleScreen;

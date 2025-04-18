import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { AllPermissionsDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import CustomValidation from "@/components/CustomValidation";
import { set, useForm } from "react-hook-form";
import { ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

const CreateRole = () => {
    const [rolesData, { data, error, loading }] = useLazyQuery<any>(
        AllPermissionsDocument
    );
    const [currentRole, setCurrentRole] = useState<string>("");
    const [selectedRoles, setSelectedRoles] = useState<any>([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<{ role: any }>({
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

    console.log("9999", currentRole);

    useEffect(() => {
        setCurrentRole(watch("role")?.appName);
        setSelectedRoles([])
    }, [watch("role")]);

    return (
        <CustomHeader>
            <ScrollView>
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

                    {data?.allPermissions?.apps?.map(
                        (item: any) =>
                            item?.appName === currentRole &&
                            item?.modules?.map((item: any) => {
                                return (
                                    <View>
                                        <Text>{item.name}</Text>
                                        <View>
                                            <ThemedText type="subtitle">{item.name}</ThemedText>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                    gap: 20,
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
                                                                    size={35}
                                                                    color={Colors[theme].text}
                                                                />
                                                            </Pressable>
                                                            {/* <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" /> */}
                                                            <ThemedText style={{ fontSize: 25 }}>{item.action}</ThemedText>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    </View>
                                );
                            })
                    )}
                </ThemedView>
            </ScrollView>
        </CustomHeader>
    );
};

const styles = ScaledSheet.create({
    label: {
        color: Colors.grayText,
        fontSize: "14@ms",
        marginBottom: "12@ms",
        fontWeight: 400,
    },
});

export default CreateRole;

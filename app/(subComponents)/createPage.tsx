import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '@/components/CustomHeader'
import { ThemedView } from '@/components/ThemedView'
import { ms, s, ScaledSheet, vs } from 'react-native-size-matters'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { ThemedText } from '@/components/ThemedText'
import CustomButton from '@/components/CustomButton'
import { Env } from "@/constants/ApiEndpoints";
import CustomValidation from '@/components/CustomValidation'
import { Feather } from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";



const createPage = () => {
    const { theme } = useTheme();
    const [image, setImage] = useState<string>("");
    const { control, setValue, handleSubmit, watch } = useForm<{ title: string, description: string, phoneNo: string }>({
        defaultValues: {
            title: "",
            description: "",
        }

    });
    const uploadImage = async (uri: string) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (!fileInfo.exists) {
                console.error("File does not exist:", uri);
                return;
            }

            const fileExtension = uri.split(".").pop() || "jpg"; // Default to jpg if no extension
            const mimeType = `image/${fileExtension}`;

            const formData = new FormData();

            formData.append("file", {
                uri,
                name: `upload.${fileExtension}`,
                type: mimeType,
            } as unknown as Blob);

            // formData.append("file", {
            //   uri: uri,
            //   name: `upload.${fileExtension}`,
            //   type: mimeType,
            // } as any); 

            const uploadResponse = await fetch(`${Env.SERVER_URL}/api/files/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });
            if (!uploadResponse.ok) {
                const err = await uploadResponse.text();
                throw new Error(`Upload failed: ${err}`);
            }
            const responseData = await uploadResponse.json();
            // console.log("Upload successful:", responseData?.files[0]);
            setImage(responseData?.files[0]);
        } catch (error) {
            console.error("Upload failed:", error);
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

    const onSubmit = () => {
        // const params = {
        //     name: watch("name"),
        //     mobileNo: Number(watch("phoneNo")),
        //     id: userId,
        //     email: watch("email"),
        //     avatar: image
        // }

        // try {
        //     updateUser(
        //         {
        //             variables: {
        //                 data: params
        //             }
        //         }
        //     );
        // } catch (error) {
        //     console.error("Error updating user:", error);
        // }
    }

    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View
                    style={{
                        backgroundColor: Colors[theme].cart,
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                        alignSelf: "center",
                        padding: 10,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                        }}
                    >
                        <ThemedText type="subtitle">
                            Create Page
                        </ThemedText>
                    </View>

                    <View style={{ padding: 10 }}>
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
                        <Pressable
                            onPress={handleImagePickerPress}
                            style={styles?.editImage}>
                            <Feather name="edit-2" size={ms(20)} color='black' style={{ fontWeight: 'bold', }} />
                        </Pressable>


                        {/* <Pressable onPress={handleImagePickerPress} style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
              </Pressable> */}
                        <CustomValidation
                            type="input"
                            control={control}
                            labelStyle={styles.label}
                            name={"title"}
                            label={"Title"}
                            rules={{
                                required: "Title is required"
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"description"}
                            label={"Description"}
                            labelStyle={styles.label}
                            containerStyle={{ height: 120, }}
                            inputStyle={{ height: 120 }}
                            inputContainerStyle={{ height: 120 }}
                        />



                    </View>

                    <CustomButton
                        title="Submit"
                        onPress={handleSubmit(onSubmit)}
                        style={{ marginTop: vs(50), backgroundColor: Colors[theme].background }}
                    />
                </View>
            </ThemedView>
        </CustomHeader>
    )
}

const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
        padding: "12@ms",
    },
    imageContainer: {
        width: '80@ms',
        height: '80@ms',
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
        borderRadius: '50@ms',
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
})

export default createPage
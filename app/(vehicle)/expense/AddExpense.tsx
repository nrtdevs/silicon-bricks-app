import CustomButton from '@/components/CustomButton';
import CustomDotsLoader from '@/components/CustomCircleLoader';
import CustomDatePicker from '@/components/CustomDatePicker';
import CustomDropdownApi from '@/components/CustomDropdownApi';
import CustomHeader from '@/components/CustomHeader';
import CustomInput from '@/components/CustomInput';
import { Env } from '@/constants/ApiEndpoints';
import { Colors } from '@/constants/Colors';
import { formatDate } from '@/constants/Dateformat';
import { useTheme } from '@/context/ThemeContext';
import { BreakdownDropdownDocument, CreateVehicleExpenseDocument, CreateVehicleExpenseMutation, FindVehicleExpenseByIdDocument, GetBreakdownTypeSuggestionsDocument, UpdateVehicleExpenseDocument, UpdateVehicleExpenseMutation, VehiclesDropdownDocument } from '@/graphql/generated';
import uploadImage from '@/utils/imageUpload';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { z } from 'zod';

const ExpenseSchema = z.object({
    amount: z.string().min(1, "Amount is required").max(100),
    breakDownId: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "BreakDown is required" }),
    description: z.string().min(1, "Description is required"),
    expenseDate: z.string().min(1, "Expense Date is required"),
    expenseType: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Expense is required" }),
    uploadDoc: z.array(z.object({
        mediaType: z.string(),
        url: z.string(),
    })).optional(),
    vehicleId: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Vehicle is required" }),
});


const defaultValues = {
    amount: '',
    breakDownId: undefined,
    description: '',
    expenseDate: '',
    expenseType: undefined,
    uploadDoc: [],
    vehicleId: undefined,
}

const AddExpense = () => {
    const { data } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data as string) : null;
    const { theme } = useTheme();
    const [localSelectedFiles, setLocalSelectedFiles] = useState<{ mediaType: string; url: string }[]>([]);
    const [serverImage, setServerUploadedFiles] = useState<Array<{ mediaType: string; url: string; id?: string }>>([])
    const [removedFileIds, setRemovedFileIds] = useState<string[]>([]);
    const [isUploadingImages, setIsUploadingImages] = useState(false); 
    const [VehiclesDropdownApi, { data: DropdownData }] = useLazyQuery(VehiclesDropdownDocument);
    const [GetExpenseTypeSuggestions, { data: ExpenseTypeData }] = useLazyQuery(GetBreakdownTypeSuggestionsDocument);
    const [GetBreakdownApi, { data: Breakdown }] = useLazyQuery(BreakdownDropdownDocument);
    const [FindVehicleByid, { data: FindData }] = useLazyQuery(FindVehicleExpenseByIdDocument)


    const EditDataSave = FindData?.findVehicleExpenseById

    //Create Update 
    const [createExpenseApi, { loading, error }] = useMutation<CreateVehicleExpenseMutation>(CreateVehicleExpenseDocument);
    const [UpdateExpenseApi, { loading: updateLoading }] = useMutation<UpdateVehicleExpenseMutation>(UpdateVehicleExpenseDocument);

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue, trigger, clearErrors } = useForm<z.infer<typeof ExpenseSchema>>({
        resolver: zodResolver(ExpenseSchema),
        defaultValues: defaultValues
    });

    // Fetch data function
    const fetchData = useCallback(() => {
        VehiclesDropdownApi({
            variables: {
                listInputDto: {
                    limit: 100,
                    page: 1
                }
            }
        });
    }, [VehiclesDropdownApi]);

    useEffect(() => {
        if (parsedData) {
            FindVehicleByid({
                variables: {
                    findVehicleExpenseByIdId: Number(parsedData)
                }
            })
        }
        fetchData();
        GetExpenseTypeSuggestions(); 
        GetBreakdownApi({
            variables: {
                listInputDto: {
                    limit: 100, // Fetch a reasonable limit
                    page: 1,
                }
            }
        });
    }, [parsedData, fetchData, GetExpenseTypeSuggestions, GetBreakdownApi]);


    const ExpenseTypeDataOptions = ExpenseTypeData?.getBreakdownTypeSuggestions;
    const Maindata = DropdownData?.vehiclesDropdown.data || [];
    const BreakdownDataOptions = Breakdown?.breakdownDropdown.data || [];


    const dropdownOptions = useMemo(() => Maindata?.map((item) => ({
        label: item?.model || "",
        value: item?.id || "",
    })), [Maindata]);

    const DropdownExpenseType = useMemo(() => ExpenseTypeDataOptions?.map((item) => ({
        label: item || "",
        value: item || "",
    })) || [], [ExpenseTypeDataOptions]);

    const DropdownBreakdown = useMemo(() => BreakdownDataOptions?.map((item) => ({
        label: item?.breakdownType || "",
        value: item?.id || "",
    })) || [], [BreakdownDataOptions]);


    useEffect(() => {
        if (parsedData && EditDataSave) {
            const parsedUploadDoc = EditDataSave.uploadDoc ? JSON.parse(EditDataSave.uploadDoc) : [];
            reset({
                amount: String(EditDataSave?.amount),
                breakDownId: EditDataSave.breakDown?.id ? { label: EditDataSave.breakDown?.breakdownType || "", value: EditDataSave.breakDown.id } : undefined,
                description: EditDataSave.description || '',
                expenseDate: EditDataSave.expenseDate,
                expenseType: EditDataSave?.expenseType ? { label: EditDataSave?.expenseType || "", value: EditDataSave.expenseType } : undefined,
                uploadDoc: parsedUploadDoc,
                vehicleId: EditDataSave.vehicle?.id ? { label: EditDataSave.vehicle?.model || "", value: EditDataSave.vehicle.id } : undefined,
            });

            // Set serverImage state for display and tracking removals
            setServerUploadedFiles(parsedUploadDoc);
            setLocalSelectedFiles([]); // Clear local files when editing existing data
            setRemovedFileIds([]); // Clear removed file IDs
        } else {
            reset(defaultValues);
            setServerUploadedFiles([]); // Clear server images for new entry
            setLocalSelectedFiles([]); // Clear local files for new entry
            setRemovedFileIds([]); // Clear removed file IDs for new entry
        }
    }, [EditDataSave, parsedData, reset]);

    const watchedExpenseType = watch("expenseType");
    const watchedVehicleId = watch("vehicleId");
    const breakdownId = watch('breakDownId');




    const pickMedia = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: [
                "image/*",
                "video/*",
                "audio/mpeg"
            ],
            multiple: true,
        });

        if (!result.canceled && result.assets) {
            const newFiles = result.assets.map((asset) => ({
                mediaType: asset.mimeType?.includes("image")
                    ? "image"
                    : asset.mimeType?.includes("video")
                        ? "video"
                        : asset.mimeType?.includes("audio")
                            ? "audio"
                            : "file",
                url: asset.uri,
            }));

            setLocalSelectedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const onSubmit = async (data: z.infer<typeof ExpenseSchema>) => {
        try {
            setIsUploadingImages(true);
            const localUris = localSelectedFiles.map((file) => file.url);
            const uploadedUrls = await uploadImage(localUris);

            const newlyUploadedMedia = localSelectedFiles.map((file, index) => ({
                mediaType: file.mediaType,
                url: uploadedUrls[index],
            }));

            // Filter out removed files from serverImage and combine with newly uploaded media
            const finalUploadDoc = serverImage
                .filter(file => !removedFileIds.includes(file.id || ''))
                .concat(newlyUploadedMedia);

            if (parsedData) {
                await UpdateExpenseApi({
                    variables: {
                        updateVehicleExpenseInput: {
                            id: Number(parsedData),
                            amount: Number(data?.amount),
                            description: data?.description,
                            expenseDate: data?.expenseDate,
                            expenseType: data?.expenseType?.value,
                            vehicleId: data?.vehicleId?.value,
                            breakDownId: data?.breakDownId?.value,
                            uploadDoc: JSON.stringify(finalUploadDoc),
                            removedFileIds: removedFileIds
                        }
                    }
                });
            } else {
                await createExpenseApi({
                    variables: {
                        data: {
                            amount: Number(data?.amount),
                            description: data?.description,
                            expenseDate: formatDate(String(data?.expenseDate)),
                            expenseType: data?.expenseType?.value,
                            vehicleId: Number(data?.vehicleId?.value),
                            breakDownId: Number(data?.breakDownId?.value),
                            uploadDoc: JSON.stringify(finalUploadDoc)
                        }
                    }
                });
            }
            router.navigate("/(vehicle)/expense/ExpenseList");
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsUploadingImages(false); 
        }
    }

    return (
        <CustomHeader
            title={parsedData ? "Update Expense" : "Create Expense"}
            leftComponent={
                <Pressable
                    style={styles.menuButton}
                    onPress={() => {
                        router.navigate({
                            pathname: "/(vehicle)/expense/ExpenseList",
                        })
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
                </Pressable>
            }
        >
            <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View>
                            <CustomDropdownApi
                                options={DropdownExpenseType}
                                placeholder="Select Expense Type"
                                control={control}
                                name="expenseType"
                                error={errors.expenseType as any}
                                label="Expense Type"
                                value={watchedExpenseType}
                                required
                            />
                            <CustomDropdownApi
                                options={dropdownOptions}
                                placeholder="Select Vehicle"
                                control={control}
                                name="vehicleId"
                                error={errors.vehicleId as any}
                                label="Vehicle"
                                value={watchedVehicleId}
                                required
                            />
                            <CustomDropdownApi
                                options={DropdownBreakdown}
                                placeholder="Select BreakDown"
                                control={control}
                                name="breakDownId"
                                error={errors.breakDownId as any}
                                label="BreakDown"
                                value={breakdownId}
                                required
                            />

                            <CustomDatePicker
                                control={control}
                                name="expenseDate"
                                label="Expense Date"
                                mode="date"
                                required
                            />
                            <CustomInput
                                name="amount"
                                control={control}
                                label="Amount"
                                placeholder="Enter Amount"
                                required={true}
                                type='number'
                                error={errors.amount?.message}
                            />
                            <CustomInput
                                name="description"
                                control={control}
                                label="Description"
                                placeholder="Describe the expense..."
                                required={true}
                                multiline={true}
                                numberOfLines={5}
                                error={errors.description?.message}
                            />
                            <View style={styles.mediaUploadArea}>
                                <Ionicons name="cloud-upload-outline" size={48} color={Colors[theme].lightText} />
                                <Text style={[styles.mediaUploadTitle, { color: Colors[theme].text }]}>Upload Photos, Videos & Audio</Text>


                                {/* Image Upload */}
                                <Pressable style={[styles.uploadButton, { borderColor: Colors[theme].tint }]} onPress={pickMedia}>
                                    <Ionicons name="cloud-upload-outline" size={20} color={Colors[theme].tint} />
                                    <Text style={[styles.uploadButtonText, { color: Colors[theme].tint }]}>Upload Media</Text>
                                </Pressable>

                            </View>
                            {/* Display Server Images */}
                            {serverImage.length > 0 && (
                                <View style={styles.mediaPreviewContainer}>
                                    {serverImage.map((file, index) => (
                                        <View key={`server-media-${index}`} style={[styles.mediaItem, { backgroundColor: Colors[theme].cart }]}>
                                            {file.mediaType === "image" ? (
                                                <Image
                                                    source={{ uri: Env.IMAGEURL + file.url }}
                                                    style={styles.mediaThumbnail}
                                                />
                                            ) : file.mediaType === "video" ? (
                                                    <Ionicons name="videocam-outline" size={40} color={Colors[theme].tint} />
                                            ) : file.mediaType === "audio" ? (
                                                        <Ionicons name="musical-notes-outline" size={32} color={Colors[theme].tint} />
                                            ) : (
                                                            <Ionicons name="document-outline" size={32} color={Colors[theme].tint} />
                                            )}
                                            <Text style={[styles.mediaFileName, { color: Colors[theme].text }]}>
                                                {file.url.split("/").pop()}
                                            </Text>
                                            <Pressable
                                                onPress={() => {
                                                    const id = file?.id;
                                                    if (id) {
                                                        setRemovedFileIds((prev) => [...prev, String(id)]);
                                                        setServerUploadedFiles((prev) => prev.filter((item) => item.id !== id));
                                                    }
                                                }}
                                                style={[styles.closeButton, { backgroundColor: Colors[theme].background }]}
                                            >
                                                <Ionicons name="close-circle" size={30} color={Colors.red} />
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                            )}
                            {/* Display Local Images */}
                            {localSelectedFiles.length > 0 && (
                                <View style={styles.mediaPreviewContainer}>
                                    {localSelectedFiles.map((file, index) => (
                                        <View key={`local-media-${index}`} style={[styles.mediaItem, { backgroundColor: Colors[theme].cart }]}>
                                            {file.mediaType === "image" ? (
                                                <Image
                                                    source={{ uri: file.url }}
                                                    style={styles.mediaThumbnail}
                                                />
                                            ) : file.mediaType === "video" ? (
                                                    <Ionicons name="videocam-outline" size={40} color={Colors[theme].tint} />
                                            ) : file.mediaType === "audio" ? (
                                                        <Ionicons name="musical-notes-outline" size={32} color={Colors[theme].tint} />
                                            ) : (
                                                            <Ionicons name="document-outline" size={32} color={Colors[theme].tint} />
                                            )}
                                            <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.mediaFileName, { color: Colors[theme].text }]}>
                                                {file.url.split("/").pop()}
                                            </Text>
                                            <Pressable
                                                onPress={() => {
                                                    const newFiles = localSelectedFiles.filter((_, i) => i !== index);
                                                    setLocalSelectedFiles(newFiles);
                                                }}
                                                style={[styles.closeButton, { backgroundColor: Colors[theme].background }]}
                                            >
                                                <Ionicons name="close-circle" size={24} color={Colors.red} />
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                            )}
                            <CustomButton
                                title={parsedData ? "Update Expense" : "Create Expense"}
                                onPress={handleSubmit(onSubmit)}
                                style={styles.button}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <Modal
                transparent={true}
                animationType="fade"
                visible={isUploadingImages}
                onRequestClose={() => { }}
            >
                <View style={styles.loadingOverlay}>
                    <CustomDotsLoader size={80} dotSize={12} dotCount={12} loadingText='Uploading Images...' />
                    <Text style={styles.loadingText}></Text>
                </View>
            </Modal>
        </CustomHeader>
    )
}

export default AddExpense

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(8),
        borderRadius: ms(20),
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    container: {
        flex: 1
    },
    safeArea: {
        flex: 1,
        padding: ms(10)
    },
    button: {
        marginTop: ms(15)
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: ms(100),
    },
    mediaUploadArea: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ms(30),
        paddingHorizontal: ms(10),
        borderRadius: ms(16),
        borderWidth: 2,
        borderStyle: 'dashed',
    },
    mediaUploadTitle: {
        fontSize: ms(18),
        fontWeight: '600',
        marginTop: ms(10),
        marginBottom: ms(8),
    },

    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ms(10),
        paddingHorizontal: ms(20),
        backgroundColor: '#FFFFFF', // This will be overridden by inline style
        borderRadius: ms(8),
        borderWidth: 1,
    },
    uploadButtonText: {
        marginLeft: ms(6),
        fontSize: ms(16),
        fontWeight: '500',
    },
    mediaPreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: ms(20),
        justifyContent: 'space-around', 
        paddingHorizontal: ms(5), 
    },
    mediaItem: {
        width: ms(100),
        height: ms(115),
        borderRadius: ms(8),
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: ms(5),
        paddingTop: ms(10),
        marginBottom: ms(10), 
    },
    mediaThumbnail: {
        width: '100%',
        height: '65%',
        resizeMode: 'cover',
        borderRadius: ms(4),
    },
    mediaFileName: {
        fontSize: ms(9),
        textAlign: 'center',
        marginTop: ms(5),
        width: '100%',
        color: Colors.light.text, // This will be overridden by inline style
        flexShrink: 1,
    },
    closeButton: {
        position: 'absolute',
        top: ms(-8),
        right: ms(-8),
        zIndex: 1000,
        borderRadius: ms(15),
        padding: ms(2),
    },
    loadingOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        marginTop: ms(10),
        fontSize: ms(16),
        fontWeight: '500',
    },
})

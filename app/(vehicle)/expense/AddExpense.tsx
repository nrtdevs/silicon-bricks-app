import CustomButton from '@/components/CustomButton';
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
import { ActivityIndicator, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { z } from 'zod';

const ExpenseSchema = z.object({
    amount: z.string().min(1, "Amount is required").max(100).optional(),
    breakDownId: z.object({
        label: z.string(),
        value: z.string(),
    }).optional(),
    description: z.string().min(1, "Description is required").optional(),
    expenseDate: z.string().min(1, "Expense Date is required").optional(),
    expenseType: z.object({
        label: z.string(),
        value: z.string(),
    }).optional(),
    uploadDoc: z.array(z.object({
        mediaType: z.string(),
        url: z.string(),
    })).optional(),
    vehicleId: z.object({
        label: z.string(),
        value: z.string(),
    }).optional(),
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
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState<{ mediaType: string; url: string }[]>([]);
    const [serverImage, setserverUploadedFiles] = useState<Array<{ mediaType: string; url: string; id?: string }>>([])
    const [removedFileIds, setRemovedFileIds] = useState<string[]>([]);
    const [isUploadingImages, setIsUploadingImages] = useState(false); 
    const [VehiclesDropdownApi, { data: DropdownData }] = useLazyQuery(VehiclesDropdownDocument);
    const [GetExpenseTypeSuggestions, { data: ExpenseTypeData }] = useLazyQuery(GetBreakdownTypeSuggestionsDocument);
    const [GetBreakdownApi, { data: Breakdown }] = useLazyQuery(BreakdownDropdownDocument);
    const [FindVehicleByid, { data: FindData }] = useLazyQuery(FindVehicleExpenseByIdDocument)


    const EditDataSave = FindData?.findVehicleExpenseById

    console.log(EditDataSave)

    //Create Update 
    const [createExpenseApi, { loading, error }] = useMutation<CreateVehicleExpenseMutation>(CreateVehicleExpenseDocument);
    const [UpdateExpenseApi, { loading: updateLoading }] = useMutation<UpdateVehicleExpenseMutation>(UpdateVehicleExpenseDocument);

    const { control, handleSubmit, formState: { errors }, reset, watch, setValue, trigger, clearErrors } = useForm<z.infer<typeof ExpenseSchema>>({
        resolver: zodResolver(ExpenseSchema),
        defaultValues: defaultValues
    });

    // Fetch data function
    const fetchData = useCallback(() => {
        if (hasMore) {
            VehiclesDropdownApi({
                variables: {
                    listInputDto: {
                        limit: 10,
                        page: currentPage
                    }
                }
            });
        }
    }, [currentPage, hasMore, VehiclesDropdownApi]);

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
    }, [parsedData, fetchData, GetExpenseTypeSuggestions]);


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
        if (EditDataSave) {
            reset({
                amount: String(EditDataSave?.amount),
                breakDownId: EditDataSave.breakDown?.id ? { label: EditDataSave.breakDown?.breakdownType || "", value: EditDataSave.breakDown.id } : undefined,
                description: EditDataSave.description || '',
                expenseDate: EditDataSave.expenseDate,
                expenseType: EditDataSave?.expenseType ? { label: EditDataSave?.expenseType || "", value: EditDataSave.expenseType } : undefined,
                uploadDoc: EditDataSave.uploadDoc ? JSON.parse(EditDataSave.uploadDoc) : [],
                vehicleId: EditDataSave.vehicle?.id ? { label: EditDataSave.vehicle?.model || "", value: EditDataSave.vehicle.id } : undefined,
            });

            // Also set uploadedFiles state for display
            if (EditDataSave.uploadDoc) {
                setUploadedFiles(JSON.parse(EditDataSave.uploadDoc));
            }
        }
    }, [EditDataSave, reset]);

    const watchedExpenseType = watch("expenseType");
    const watchedVehicleId = watch("vehicleId");
    const breakdownId = watch('breakDownId');

    useEffect(() => {

        GetBreakdownApi({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                    search: breakdownId?.value
                }
            }
        });

    }, [breakdownId]);




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

            setUploadedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const onSubmit = async (data: z.infer<typeof ExpenseSchema>) => {
        try {
            setIsUploadingImages(true);
            const localUris = uploadedFiles.map((file) => file.url);
            const uploadedUrls = await uploadImage(localUris);

            const newFormattedMedia = uploadedFiles.map((file, index) => ({
                mediaType: file.mediaType,
                url: uploadedUrls[index],
            }));

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
                            uploadDoc: JSON.stringify(newFormattedMedia),
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
                            uploadDoc: JSON.stringify(newFormattedMedia)
                        }
                    }
                });
            }
            router.navigate("/(vehicle)/expense/ExpenseList");
        } catch (error) {
            console.log(error)
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
                            />
                            <CustomDropdownApi
                                options={dropdownOptions}
                                placeholder="Select Vehicle"
                                control={control}
                                name="vehicleId"
                                error={errors.vehicleId as any}
                                label="Vehicle"
                                value={watchedVehicleId}
                            />
                            <CustomDropdownApi
                                options={DropdownBreakdown}
                                placeholder="Select BreakDown"
                                control={control}
                                name="breakDownId"
                                error={errors.breakDownId as any}
                                label="BreakDown"
                                value={breakdownId}
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
                                <Ionicons name="cloud-upload-outline" size={48} color="#C7C7CC" />
                                <Text style={styles.mediaUploadTitle}>Upload Photos, Videos & Audio</Text>


                                {/* Image Upload */}
                                <Pressable style={styles.uploadButton} onPress={pickMedia}>
                                    <Ionicons name="cloud-upload-outline" size={20} color="#007AFF" />
                                    <Text style={styles.uploadButtonText}>Upload Media</Text>
                                </Pressable>

                            </View>
                            {/* Display Server Images */}
                            {serverImage.length > 0 && (
                                <View style={styles.mediaPreviewContainer}>
                                    {serverImage.map((file, index) => (
                                        <View key={`server-media-${index}`} style={styles.mediaItem}>
                                            {file.mediaType === "image" ? (
                                                <Image
                                                    source={{ uri: Env.IMAGEURL + file.url }}
                                                    style={styles.mediaThumbnail}
                                                />
                                            ) : file.mediaType === "video" ? (
                                                <Ionicons name="videocam-outline" size={40} color="#007AFF" style={styles.IconStyle} />
                                            ) : file.mediaType === "audio" ? (
                                                <Ionicons name="musical-notes-outline" size={32} color="#34C759" style={styles.IconStyle} />
                                            ) : (
                                                <Ionicons name="document-outline" size={32} color="#8E8E93" style={styles.IconStyle} />
                                            )}
                                            <Text style={[styles.mediaFileName, { color: Colors[theme].text }]}>
                                                {file.url.split("/").pop()}
                                            </Text>
                                            <Pressable
                                                onPress={() => {
                                                    const id = file?.id;
                                                    if (id) {
                                                        setRemovedFileIds((prev) => [...prev, String(id)]);
                                                        setserverUploadedFiles((prev) => prev.filter((item) => item.id !== id));
                                                    }
                                                }}
                                                style={styles.closeButton}
                                            >
                                                <Ionicons name="close-circle" size={30} color="#FF3B30" />
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                            )}
                            {/* Display Local Images */}
                            {uploadedFiles.length > 0 && (
                                <View style={styles.mediaPreviewContainer}>
                                    {uploadedFiles.map((file, index) => (
                                        <View key={`local-media-${index}`} style={styles.mediaItem}>
                                            {file.mediaType === "image" ? (
                                                <Image
                                                    source={{ uri: file.url }}
                                                    style={styles.mediaThumbnail}
                                                />
                                            ) : file.mediaType === "video" ? (
                                                <Ionicons name="videocam-outline" size={40} color="#007AFF" />
                                            ) : file.mediaType === "audio" ? (
                                                <Ionicons name="musical-notes-outline" size={32} color="#34C759" />
                                            ) : (
                                                <Ionicons name="document-outline" size={32} color="#8E8E93" />
                                            )}
                                            <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.mediaFileName, { color: Colors[theme].text }]}>
                                                {file.url.split("/").pop()}
                                            </Text>
                                            <Pressable
                                                onPress={() => {
                                                    const newFiles = uploadedFiles.filter((_, i) => i !== index);
                                                    setUploadedFiles(newFiles);
                                                }}
                                                style={styles.closeButton}
                                            >
                                                <Ionicons name="close-circle" size={24} color="#FF3B30" />
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
                    <ActivityIndicator size="large" color={Colors[theme].tint} />
                    <Text style={[styles.loadingText, { color: Colors[theme].text }]}>Uploading Images...</Text>
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
        backgroundColor: '#F9F9F9',
        borderRadius: ms(16),
        borderWidth: 2,
        borderColor: '#E5E5EA',
        borderStyle: 'dashed',
    },
    mediaUploadTitle: {
        fontSize: ms(18),
        fontWeight: '600',
        color: '#1C1C1E',
        marginTop: ms(10),
        marginBottom: ms(8),
    },

    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ms(10),
        paddingHorizontal: ms(20),
        backgroundColor: '#FFFFFF',
        borderRadius: ms(8),
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    uploadButtonText: {
        marginLeft: ms(6),
        fontSize: ms(16),
        color: '#007AFF',
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
        backgroundColor: '#E5E5EA',
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
    IconStyle: {
       
    },
    mediaFileName: {
        fontSize: ms(9),
        textAlign: 'center',
        marginTop: ms(5),
        width: '100%',
        color: Colors.light.text,
        flexShrink: 1,
    },
    closeButton: {
        position: 'absolute',
        top: ms(-8),
        right: ms(-8),
        zIndex: 1000,
        backgroundColor: Colors.light.background,
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

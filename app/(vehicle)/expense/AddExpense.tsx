import CustomButton from '@/components/CustomButton';
import CustomDatePicker from '@/components/CustomDatePicker';
import CustomDropdownApi from '@/components/CustomDropdownApi';
import CustomHeader from '@/components/CustomHeader';
import CustomInput from '@/components/CustomInput';
import CustomToast from '@/components/CustomToast';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { CreateVehicleExpenseDocument, GetBreakdownTypeSuggestionsDocument, UpdateVehicleExpenseDocument, VehiclesDropdownDocument } from '@/graphql/generated';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { z } from 'zod';

const ExpenseSchema = z.object({
    amount: z.string().min(1, "Amount is required").max(100),
    breakDownId: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Breakdown is required" }),
    description: z.string().min(1, "Description is required"),
    expenseDate: z.string().min(1, "Expense Date is required"),
    expenseType: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Expense Type is required" }),
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
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState<{ mediaType: string; url: string }[]>([]);
    const [VehiclesDropdownApi, { data: DropdownData }] = useLazyQuery(VehiclesDropdownDocument);
    const [GetExpenseTypeSuggestions, { data: ExpenseTypeData, error }] = useLazyQuery(GetBreakdownTypeSuggestionsDocument);


    //Create Update 
    const [createExpenseApi, { loading }] = useMutation(CreateVehicleExpenseDocument);
    const [UpdateExpenseApi, { loading: updateLoading }] = useMutation(UpdateVehicleExpenseDocument);

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
        fetchData()
        GetExpenseTypeSuggestions();
    }, [GetExpenseTypeSuggestions]);

    const watchedExpenseType = watch("expenseType");
    const watchedVehicleId = watch("vehicleId");


    const ExpenseTypeDataOptions = ExpenseTypeData?.getBreakdownTypeSuggestions // Renamed for clarity
    const Maindata = DropdownData?.vehiclesDropdown.data || []


    const dropdownOptions = useMemo(() => Maindata?.map((item) => ({
        label: item?.model || "",
        value: item?.id || "",
    })), [Maindata]);

    const DropdownExpenseType = useMemo(() => ExpenseTypeDataOptions?.map((item) => ({
        label: item || "",
        value: item || "",
    })) || [], [ExpenseTypeDataOptions]);

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

    const onSubmit = async (data: any) => {
        try {
            if (parsedData) {
                UpdateExpenseApi({
                    variables: {
                        updateVehicleExpenseInput: {
                            id: Number(parsedData),
                            amount: data?.amount,
                            description: data?.description,
                            expenseDate: data?.expenseDate,
                            expenseType: data?.expenseType,
                            vehicleId: data?.vehicleId?.value,
                            breakDownId: data?.breakDownId?.value,
                            uploadDoc: 
                        }
                    }
                })
            } else {
                createExpenseApi({
                    variables: {
                        data: {
                            amount: data?.amount,
                            description: data?.description,
                            expenseDate: data?.expenseDate,
                            expenseType: data?.expenseType,
                            vehicleId: data?.vehicleId?.value,
                            breakDownId: data?.breakDownId?.value,
                            uploadDoc: 
        }
                    }
                })
            }
        } catch (error) {
            CustomToast("error");
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
                                required={true}
                                value={watchedExpenseType}
                            />
                            <CustomDropdownApi
                                options={dropdownOptions}
                                placeholder="Select Vehicle"
                                control={control}
                                name="vehicleId"
                                error={errors.vehicleId as any}
                                label="Vehicle"
                                required={true}
                                value={watchedVehicleId}
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
                                title={parsedData?.id ? "Update Expense" : "Create Expense"}
                                onPress={handleSubmit(onSubmit)}
                                style={styles.button}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
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
        justifyContent: 'space-around', // Distribute items evenly with space around them
        paddingHorizontal: ms(5), // Add some horizontal padding to the container
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
        marginBottom: ms(10), // Add margin bottom for spacing between rows
    },
    mediaThumbnail: {
        width: '100%',
        height: '65%',
        resizeMode: 'cover',
        borderRadius: ms(4),
    },
    IconStyle: {
        // Removed absolute positioning for icons to allow them to be centered by alignItems and justifyContent of mediaItem
        // The parent mediaItem now handles centering for non-image types
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
})

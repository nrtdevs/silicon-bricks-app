import CustomDatePicker from '@/components/CustomDatePicker';
import CustomDropdownApi from '@/components/CustomDropdownApi';
import CustomHeader from '@/components/CustomHeader';
import CustomInput from '@/components/CustomInput';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { GetBreakdownTypeSuggestionsDocument, VehiclesDropdownDocument } from '@/graphql/generated';
import { useLazyQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { z } from 'zod';
import * as DocumentPicker from "expo-document-picker";
import { Image } from 'react-native';
import { Env } from '@/constants/ApiEndpoints';

const BreakDownSchema = z.object({
    breakdownDate: z.string().min(1, "Breakdown Date is required"),
    breakdownDescription: z.string().min(1, "Breakdown Description is required"),
    breakdownLocation: z.string().min(1, "Breakdown Location is required"),
    breakdownType: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Breakdown Type is required" }),
    latitude: z.string()
        .min(1, "Latitude is required")
        .refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -90 && num <= 90;
        }, { message: "Invalid Latitude" }),

    longitude: z.string()
        .min(1, "Longitude is required")
        .refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -180 && num <= 180;
        }, { message: "Invalid Longitude" }),
    mediaUrl: z.array(z.object({
        mediaType: z.string(),
        url: z.string(),
    })).optional(),
    vehicleId: z.object({
        label: z.string(),
        value: z.string(),
    }, { required_error: "Vehicle is required" }),
});


const defaultValues = {
    breakdownDate: '',
    breakdownDescription: '',
    breakdownLocation: '',
    breakdownType: undefined,
    latitude: '',
    longitude: '',
    mediaUrl: [],
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
    const [VehiclesBreakdownType, { data: BreakdownTypeData }] = useLazyQuery(GetBreakdownTypeSuggestionsDocument);
    const { control, handleSubmit, formState: { errors }, reset, watch, setValue, trigger, clearErrors } = useForm<z.infer<typeof BreakDownSchema>>({
        resolver: zodResolver(BreakDownSchema),
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
        VehiclesBreakdownType();
      }, [ VehiclesBreakdownType]);

    const watchedBreakdownType = watch("breakdownType");
    const watchedVehicleId = watch("vehicleId");

    const BreakDownData = BreakdownTypeData?.getBreakdownTypeSuggestions
    const Maindata = DropdownData?.vehiclesDropdown.data || []

    const dropdownOptions = useMemo(() => Maindata?.map((item) => ({
        label: item?.model || "",
        value: item?.id || "",
    })), [Maindata]);
    const DropdownBreakType = useMemo(() => BreakDownData?.map((item) => ({
        label: item || "",
        value: item || "",
    })) || [], [BreakDownData]);

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
                                options={DropdownBreakType}
                                placeholder="Select Breakdown Type"
                                control={control}
                                name="breakdownType"
                                error={errors.breakdownType as any}
                                label="Breakdown Type"
                                required={true}
                                value={watchedBreakdownType}
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
                                name="insuranceValidTill"
                                label="Insurance Date"
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
                                error={errors.breakdownDate?.message}
                            />
                            <CustomInput
                                name="breakdownDescription"
                                control={control}
                                label="Description"
                                placeholder="Describe the breakdown issue..."
                                required={true}
                                multiline={true}
                                numberOfLines={5}
                                error={errors.breakdownDescription?.message}
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
                                                    const newFiles = uploadedFiles.filter((_, i) => i !== index);
                                                    setUploadedFiles(newFiles);
                                                }}
                                                style={styles.closeButton}
                                            >
                                                <Ionicons name="close-circle" size={30} color="#FF3B30" />
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                            )}
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
    }
})
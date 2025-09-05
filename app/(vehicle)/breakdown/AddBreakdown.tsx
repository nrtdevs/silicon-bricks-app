import CustomDatePicker from "@/components/CustomDatePicker";
import CustomDropdownApi from "@/components/CustomDropdownApi";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import GoogleMapView from "@/components/CustomMap";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { GetBreakdownTypeSuggestionsDocument, VehiclesDropdownDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Animated, Dimensions, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { ms } from "react-native-size-matters";
import StepIndicator from "react-native-step-indicator";
import { z } from 'zod';
import * as DocumentPicker from "expo-document-picker";

const { width } = Dimensions.get('window');
const labels = ["Details", "Location", "Media"];

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
    mediaType: z.string().nullable(),
    url: z.string().nullable(),
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

const AddBreakdown = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [slideAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(1));
  const { theme } = useTheme();
  const { data } = useLocalSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const parsedData = data ? JSON.parse(data as string) : null;
  const [hasMore, setHasMore] = useState(true);
  const [VehiclesBreakdownType, { data: BreakdownTypeData, loading: breakdownLoading, error: breakdownError }] = useLazyQuery(GetBreakdownTypeSuggestionsDocument);
  const [VehiclesDropdownApi, { data: DropdownData, loading: dropdownLoading, error: dropdownError }] = useLazyQuery(VehiclesDropdownDocument);

  const { control, handleSubmit, formState: { errors }, reset, watch, setValue, trigger } = useForm<z.infer<typeof BreakDownSchema>>({
    resolver: zodResolver(BreakDownSchema),
    defaultValues: defaultValues
  });

  const watchedBreakdownType = watch("breakdownType");
  const watchedVehicleId = watch("vehicleId");


  // Fetch data function
  const fetchData = useCallback(() => {
    if (hasMore) {
      VehiclesDropdownApi({
        variables: {
          listInputDto: {
            limit: limit,
            page: currentPage
          }
        }
      });
    }
  }, [currentPage, hasMore, limit, VehiclesDropdownApi]);

  useEffect(() => {
    fetchData();
    VehiclesBreakdownType();
  }, [fetchData, VehiclesBreakdownType]);

  const Maindata = DropdownData?.vehiclesDropdown.data || []
  const BreakDownData = BreakdownTypeData?.getBreakdownTypeSuggestions

  const dropdownOptions = Maindata?.map((item) => ({
    label: item?.model || "",
    value: item?.id || "",
  }));

  const DropdownBreakType = BreakDownData?.map((item) => ({
    label: item || "",
    value: item || "",
  })) || [];

  const animateStepTransition = (direction: 'next' | 'prev') => {
    const toValue = direction === 'next' ? -width : width;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      slideAnim.setValue(direction === 'next' ? width : -width);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const onNextStep = async () => {
    let isValid = false;
    if (currentPosition === 0) {
      isValid = await trigger(["breakdownType", "vehicleId", "breakdownDate", "breakdownDescription"]);
    } else if (currentPosition === 1) {
      isValid = await trigger(["longitude", "latitude", "breakdownLocation"]);
    } else if (currentPosition === 2) {
      // Media upload is optional, so no validation needed to proceed
      isValid = true;
    }

    if (isValid && currentPosition < labels.length - 1) {
      animateStepTransition('next');
      setCurrentPosition(prev => prev + 1);
    }
  };

  const onPrevStep = () => {
    if (currentPosition > 0) {
      animateStepTransition('prev');
      setCurrentPosition(prev => prev - 1);
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState<
    { mediaType: string; url: string }[]
  >([]);

  const pickMedia = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "image/*",   // images
        "video/*",   // videos (mp4, mov, etc.)
        "audio/mpeg" // mp3
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
      setValue("mediaUrl", [...uploadedFiles, ...newFiles]);
    }
  };


  const onSubmit = (data: z.infer<typeof BreakDownSchema>) => {
    console.log("Form Data:", data);
    // Handle form submission logic here
  };

  const renderStepContent = () => {
    const animatedStyle = {
      transform: [{ translateX: slideAnim }],
      opacity: fadeAnim,
    };

    return (
      <Animated.View style={[styles.stepContent, animatedStyle]}>
        {currentPosition === 0 && (
          <View style={styles.formContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
              <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
                Breakdown Details
              </Text>
            </View>
            <View >
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
                name="breakdownDate"
                label="Breakdown Date"
                mode="date"
                required
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
            </View>
          </View>
        )}

        {currentPosition === 1 && (
          <View style={styles.formContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location-outline" size={24} color="#007AFF" />
              <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
                Location Information
              </Text>
            </View>
            <View >
              <CustomInput
                name="longitude"
                control={control}
                label="Longitude"
                placeholder="Longitude"
                required={true}
                type="number"
                error={errors.longitude?.message}
              />
              <CustomInput
                name="latitude"
                control={control}
                label="Latitude"
                placeholder="Latitude"
                required={true}
                type="number"
                error={errors.latitude?.message}
              />

              <CustomInput
                name="breakdownLocation"
                control={control}
                label="Full Address"
                placeholder="Enter complete address"
                required={true}
                multiline={true}
                numberOfLines={4}
                error={errors.breakdownLocation?.message}
              />

              <GoogleMapView
                latitude={37.78825}
                longitude={-122.4324}
                height={400}
                onLocationSelect={(lat, lng, address) => {
                  setValue('longitude', lng?.toFixed(3))
                  setValue('latitude', lat?.toFixed(3))
                  setValue('breakdownLocation', address)
                }}
              />
            </View>
          </View>
        )}

        {currentPosition === 2 && (
          <>
            <View style={styles.mediaUploadArea}>
              <Ionicons name="cloud-upload-outline" size={48} color="#C7C7CC" />
              <Text style={styles.mediaUploadTitle}>Upload Photos, Videos & Audio</Text>
              <Text style={styles.mediaUploadSubtitle}>
                Add images, videos, or mp3 recordings of the breakdown
              </Text>

              {/* Image Upload */}
              <Pressable style={styles.uploadButton} onPress={pickMedia}>
                <Ionicons name="cloud-upload-outline" size={20} color="#007AFF" />
                <Text style={styles.uploadButtonText}>Upload Media</Text>
              </Pressable>

            </View>



            {
              uploadedFiles.map((file, index) => (
                <View style={styles.mediaPreview}>
                  <View key={index} style={styles.mediaItem}>
                    {file.mediaType === "image" ? (
                      <Image
                        source={{ uri: file.url }}
                        style={styles.mediaThumbnail}
                      />
                    ) : file.mediaType === "video" ? (
                      <Ionicons name="videocam-outline" size={40} color="#007AFF" style={styles.IconStyle} />
                    ) : file.mediaType === "audio" ? (
                      <Ionicons name="musical-notes-outline" size={32} color="#34C759" />
                    ) : (
                      <Ionicons name="document-outline" size={32} color="#8E8E93" />
                    )}
                    <Text style={[styles.mediaFileName, { color: Colors[theme].text }]}>
                      {file.url.split("/").pop()}
                    </Text>
                    <Pressable
                      onPress={() => {
                        const newFiles = uploadedFiles.filter((_, i) => i !== index);
                        setUploadedFiles(newFiles);
                        setValue("mediaUrl", newFiles);
                      }}
                      style={styles.closeButton}
                    >
                      <Ionicons name="close-circle" size={30} color="#FF3B30" />
                    </Pressable>
                  </View>
                </View>
              ))
            }


          </>
        )}
      </Animated.View>
    );
  };

  return (
    <CustomHeader
      title={parsedData?.id ? "Update Service" : "Create Service"}
      leftComponent={
        <Pressable
          style={styles.menuButton}
          onPress={() => {
            router.navigate({
              pathname: "/(vehicle)/breakdown/BreakdownList",
            })
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
          onPress={setCurrentPosition}
        />

        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {renderStepContent()}
          </ScrollView>

          <View>
            <View style={styles.navigationButtons}>
              <>
                {currentPosition > 0 && (
                  <Pressable
                    style={[styles.navButton, styles.prevButton]}
                    onPress={onPrevStep}
                    android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                  >
                    <Ionicons name="chevron-back" size={20} color="#f8faffff" />
                    <Text style={styles.ButtonText}>Previous</Text>
                  </Pressable>
                )}
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                  <>
                    <View style={styles.buttonSpacer} />
                    {currentPosition < labels.length - 1 ? (
                      <Pressable
                        style={[styles.navButton, styles.nextButton]}
                        onPress={onNextStep}
                        android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
                      >
                        <Text style={styles.ButtonText}>Next</Text>
                        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
                      </Pressable>
                    ) : (
                      <Pressable
                        style={[styles.navButton, styles.submitButton]}
                        onPress={handleSubmit(onSubmit)}
                        android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
                      >
                        <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                        <Text style={styles.ButtonText}>
                          {parsedData?.id ? "Update" : "Create"}
                        </Text>
                      </Pressable>
                    )}
                  </>
                </View>
              </>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </CustomHeader>
  );
}

export default AddBreakdown

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicatorContainer: {
    paddingHorizontal: ms(20),
    paddingVertical: ms(25),
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: ms(100), // Space for navigation
  },
  menuButton: {
    padding: ms(8),
    borderRadius: ms(20),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: ms(20),
  },
  formContainer: {
    flex: 1,
    paddingTop: ms(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(24),
    paddingBottom: ms(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: ms(20),
    fontWeight: '600',
    marginLeft: ms(12),
    color: '#1C1C1E',
  },
  coordinateRow: {
    flexDirection: 'row',
    gap: ms(12),
  },
  coordinateInput: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(12),
    paddingHorizontal: ms(16),
    backgroundColor: '#F2F2F7',
    borderRadius: ms(10),
    marginTop: ms(8),
  },
  locationButtonText: {
    marginLeft: ms(8),
    fontSize: ms(16),
    color: '#007AFF',
    fontWeight: '500',
  },
  mediaSection: {
    gap: ms(24),
  },
  mediaUploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(40),
    paddingHorizontal: ms(20),
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
    marginTop: ms(16),
    marginBottom: ms(8),
  },
  mediaUploadSubtitle: {
    fontSize: ms(14),
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: ms(20),
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
  mediaPreview: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: ms(12),
    padding: ms(20),
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  previewTitle: {
    fontSize: ms(16),
    fontWeight: '600',
    marginBottom: ms(8),
  },
  previewSubtitle: {
    fontSize: ms(14),
    color: '#8E8E93',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(12),
    marginLeft: 8,
    marginRight: 8
  },
  buttonSpacer: {
    flex: 1,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(12),
    paddingHorizontal: ms(20),
    borderRadius: ms(25),
    minWidth: ms(100),
    justifyContent: 'center',
  },
  prevButton: {
    backgroundColor: '#b9b9caff',
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  submitButton: {
    backgroundColor: '#34C759',

  },
  ButtonText: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#fbfbfbff',
    marginLeft: ms(4),
  },
  mediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(10),
    backgroundColor: '#F2F2F7',
    padding: ms(8),
    borderRadius: ms(8),
  },
  mediaThumbnail: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(8),
    marginRight: ms(12),
  },
  mediaFileName: {
    flex: 1,
    fontSize: ms(14),
    fontWeight: '500',
    marginLeft: 40
  },
  closeButton: {
    marginLeft: ms(12),
    padding: ms(2),
  },
  IconStyle: {
    marginRight: ms(12),
  },
});

const customStyles = {
  stepIndicatorSize: ms(30),
  currentStepIndicatorSize: ms(40),
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#007BFF", // Primary blue
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: "#28A745", // Green for finished steps
  stepStrokeUnFinishedColor: "#CED4DA", // Light grey for unfinished
  separatorFinishedColor: "#28A745",
  separatorUnFinishedColor: "#CED4DA",
  stepIndicatorFinishedColor: "#28A745",
  stepIndicatorUnFinishedColor: "#F8F9FA", // Light background
  stepIndicatorCurrentColor: "#FFFFFF",
  stepIndicatorLabelFontSize: ms(12),
  currentStepIndicatorLabelFontSize: ms(14),
  stepIndicatorLabelCurrentColor: "#007BFF",
  stepIndicatorLabelFinishedColor: "#FFFFFF",
  stepIndicatorLabelUnFinishedColor: "#6C757D", // Dark grey for unfinished labels
  labelColor: "#6C757D",
  labelSize: ms(12),
  currentStepLabelColor: "#007BFF",
};

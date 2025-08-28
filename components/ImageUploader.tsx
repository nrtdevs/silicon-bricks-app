import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


type ImageUploaderProps = {
  type?: "single" | "multiple";
  onChange?: (images: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
};

interface UploadingImage {
  id: string;
  uri: string;
  progress: number;
  status: "uploading" | "success" | "error";
  size?: number;
  fileName?: string;
  customName?: string;
}

const ImageUploader = ({ type = "single", onChange, maxFiles = 10, maxSizeMB = 5 }: ImageUploaderProps) => {
  const [images, setImages] = useState<UploadingImage[]>([]);
  const [uploadAnimation] = useState(new Animated.Value(0));

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const simulateUpload = (imageId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Simulate occasional upload failure (10% chance)
          if (Math.random() < 0.1) {
            setImages((prev) =>
              prev.map((img) =>
                img.id === imageId
                  ? { ...img, status: "error" as const, progress: 0 }
                  : img
              )
            );
            reject(new Error("Upload failed"));
          } else {
            setImages((prev) =>
              prev.map((img) =>
                img.id === imageId
                  ? { ...img, progress: 100, status: "success" as const }
                  : img
              )
            );
            resolve();
          }
        } else {
          setImages((prev) =>
            prev.map((img) => (img.id === imageId ? { ...img, progress } : img))
          );
        }
      }, 200);
    });
  };

  const pickImages = async () => {
    // Permission check
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your gallery to upload images."
      );
      return;
    }

    // Start upload animation
    Animated.spring(uploadAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    // Select images
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: type === "multiple",
      quality: 0.8,
      allowsEditing: type === "single",
      aspect: type === "single" ? [1, 1] : undefined,
    });

    // Reset animation
    Animated.spring(uploadAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    if (!result.canceled) {
      let newImages: UploadingImage[] = [];

      if (type === "single") {
        const asset = result.assets[0];
        newImages = [
          {
            id: generateId(),
            uri: asset.uri,
            progress: 0,
            status: "uploading",
            size: asset.fileSize,
            fileName: asset.fileName || "image.jpg",
            customName: "",
          },
        ];
        setImages(newImages);
      } else {
        // Check if we exceed max files
        const availableSlots = maxFiles - images.length;
        const assetsToAdd = result.assets.slice(0, availableSlots);

        newImages = assetsToAdd.map((asset) => ({
          id: generateId(),
          uri: asset.uri,
          progress: 0,
          status: "uploading" as const,
          size: asset.fileSize,
          fileName: asset.fileName || "image.jpg",
          customName: "",
        }));

        setImages((prev) => [...prev, ...newImages]);
      }

      // Start upload simulation for all new images
      newImages.forEach((img) => {
        simulateUpload(img.id).catch(() => {
          // Error handled in simulateUpload
        });
      });

      // Call onChange immediately with new URIs
      if (onChange) {
        const allUris = type === "single" 
          ? [newImages[0].uri]
          : [...images.map(img => img.uri), ...newImages.map(img => img.uri)];
        onChange(allUris);
      }
    }
  };

  const removeImage = (imageId: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== imageId);
      if (onChange) {
        onChange(updated.map((img) => img.uri));
      }
      return updated;
    });
  };

  const retryUpload = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, status: "uploading" as const, progress: 0 }
          : img
      )
    );
    simulateUpload(imageId).catch(() => {
      // Error handled in simulateUpload
    });
  };

  const updateImageName = (imageId: string, newName: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, customName: newName } : img
      )
    );
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "Unknown size";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.mainTitle}>
        {type === "single" ? "Upload Image" : "Upload Images"}
      </Text>
      <Text style={styles.subtitle}>
        Select {type === "single" ? "an image" : "images"} from your gallery
      </Text>

      {/* Images Row with Plus Button */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imagesRow}
        style={styles.imagesScrollView}
      >
        {/* Plus Button - Always show if not at max limit */}
        {(type === "single" ? images.length === 0 : images.length < maxFiles) && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={pickImages}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addButtonGradient}
            >
              <Animated.View
                style={[
                  styles.addButtonContent,
                  {
                    transform: [
                      {
                        scale: uploadAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.9],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.plusIcon}>+</Text>
                <Text style={styles.addText}>Add</Text>
              </Animated.View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Image Cards */}
        {images.map((image) => (
          <View key={image.id} style={styles.imageCard}>
            {/* Image Container */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.image} />

              {/* Upload Overlay */}
              {image.status === "uploading" && (
                <View style={styles.uploadOverlay}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.progressText}>
                    {Math.round(image.progress)}%
                  </Text>
                </View>
              )}

              {/* Success Badge */}
              {image.status === "success" && (
                <View style={styles.successBadge}>
                  <Text style={styles.successIcon}>✓</Text>
                </View>
              )}

              {/* Error Overlay */}
              {image.status === "error" && (
                <View style={styles.errorOverlay}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <TouchableOpacity
                    style={styles.retryButton}
                    onPress={() => retryUpload(image.id)}
                  >
                    <Text style={styles.retryText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeImage(image.id)}
              >
                <Text style={styles.deleteIcon}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            {image.status === "uploading" && (
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${image.progress}%` },
                  ]}
                />
              </View>
            )}

            {/* File Info */}
            <View style={styles.fileInfo}>
              <Text style={styles.fileSize}>
                {formatFileSize(image.size)}
              </Text>
            </View>

            {/* Name Input */}
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="Enter image name"
                placeholderTextColor="#9ca3af"
                value={image.customName}
                onChangeText={(text) => updateImageName(image.id, text)}
                maxLength={30}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Upload Info */}
      <View style={styles.uploadInfo}>
        <Text style={styles.infoText}>
          Max {maxSizeMB}MB per image • JPG, PNG, GIF supported
        </Text>
        {type === "multiple" && (
          <Text style={styles.infoText}>
            {images.length}/{maxFiles} images selected
          </Text>
        )}
      </View>
    </View>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 30,
  },
  imagesScrollView: {
    marginBottom: 20,
  },
  imagesRow: {
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  addButton: {
    marginRight: 15,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  addButtonGradient: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonContent: {
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
    marginBottom: 4,
  },
  addText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  imageCard: {
    width: 120,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f1f5f9",
  },
  uploadOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  successBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  errorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  errorIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  retryButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  retryText: {
    color: "#ef4444",
    fontSize: 10,
    fontWeight: "600",
  },
  deleteButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 2,
    backgroundColor: "#e2e8f0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#667eea",
  },
  fileInfo: {
    padding: 8,
    alignItems: "center",
  },
  fileSize: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "500",
  },
  nameInputContainer: {
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    textAlign: "center",
  },
  uploadInfo: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 2,
  },
});
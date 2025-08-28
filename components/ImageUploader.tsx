import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ActivityIndicator,Alert, Animated, Dimensions, Image,ScrollView,StyleSheet,Text, TouchableOpacity, View,} from "react-native";

const { width } = Dimensions.get("window");

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
}

const ImageUploader = ({  type = "single",onChange,maxFiles = 10, maxSizeMB = 5}: ImageUploaderProps) => {
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

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "Unknown size";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getItemWidth = () => {
    const padding = 40; // Total horizontal padding
    const gap = 15; // Gap between items
    const columns = width > 600 ? 3 : 2;
    return (width - padding - gap * (columns - 1)) / columns;
  };

  return (
    <View style={styles.container}>
      {/* Upload Button */}
      <TouchableOpacity
        style={styles.uploadButtonContainer}
        onPress={pickImages}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.uploadButton}
        >
          <Animated.View
            style={[
              styles.uploadContent,
              {
                transform: [
                  {
                    scale: uploadAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.95],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadIconText}>📸</Text>
            </View>
            <Text style={styles.uploadTitle}>
              {type === "single" ? "Upload Image" : "Upload Images"}
            </Text>
            <Text style={styles.uploadSubtitle}>
              Tap to select {type === "single" ? "an image" : "images"} from gallery
            </Text>
            <View style={styles.uploadInfo}>
              <Text style={styles.uploadInfoText}>
                Max {maxSizeMB}MB • JPG, PNG, GIF
              </Text>
              {type === "multiple" && (
                <Text style={styles.uploadInfoText}>Up to {maxFiles} files</Text>
              )}
            </View>
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Image Previews */}
      {images.length > 0 && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>
            {type === "single"
              ? "Selected Image"
              : `Selected Images (${images.length}/${maxFiles})`}
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.imageGrid}>
              {images.map((image) => (
                <View
                  key={image.id}
                  style={[styles.imageCard, { width: getItemWidth() }]}
                >
                  {/* Image Preview */}
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
                      <Text style={styles.deleteIcon}>×

                        
                      </Text>
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
                    <Text style={styles.fileName} numberOfLines={1}>
                      {image.fileName}
                    </Text>
                    <Text style={styles.fileSize}>
                      {formatFileSize(image.size)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
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
  uploadButtonContainer: {
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  uploadButton: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  uploadContent: {
    alignItems: "center",
  },
  uploadIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  uploadIconText: {
    fontSize: 28,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: 16,
  },
  uploadInfo: {
    alignItems: "center",
  },
  uploadInfoText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  previewContainer: {
    marginTop: 24,
    flex: 1,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f1f5f9",
  },
  uploadOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  successBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    color: "#fff",
    fontSize: 14,
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
    fontSize: 24,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  retryText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    height: 3,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#667eea",
    borderRadius: 2,
  },
  fileInfo: {
    padding: 12,
  },
  fileName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 10,
    color: "#64748b",
  },
});
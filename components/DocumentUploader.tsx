import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ms } from "react-native-size-matters";

type DocumentUploaderProps = {
  type?: "single" | "multiple";
  onChange?: (docs: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
};

interface UploadingDoc {
  id: string;
  uri: string;
  name: string;
  size?: number;
  progress: number;
  status: "uploading" | "success" | "error";
  customName?: string;
}

const DocumentUploader = ({
  type = "single",
  onChange,
  maxFiles = 10,
  maxSizeMB = 5,
}: DocumentUploaderProps) => {
  const [docs, setDocs] = useState<UploadingDoc[]>([]);
  const [uploadAnimation] = useState(new Animated.Value(0));
  const { theme } = useTheme();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const getFileType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (!extension) return "unknown";
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
      return "image";
    }
    if (extension === "pdf") return "pdf";
    if (["doc", "docx"].includes(extension)) return "word";
    if (["xls", "xlsx"].includes(extension)) return "excel";
    if (extension === "txt") return "text";
    return "unknown";
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return (
          <Ionicons
            name="document-text"
            size={40}
            color={Colors[theme].danger.main}
          />
        );
      case "word":
        return (
          <Ionicons
            name="document"
            size={40}
            color={Colors[theme].primary.main}
          />
        );
      case "excel":
        return (
          <Ionicons
            name="grid"
            size={40}
            color={Colors[theme].success.main}
          />
        );
      case "text":
        return (
          <Feather
            name="file-text"
            size={40}
            color={Colors[theme].secondary.main}
          />
        );
      case "image":
        return (
          <Ionicons
            name="image"
            size={40}
            color={Colors[theme].warning.main}
          />
        );
      default:
        return (
          <Ionicons
            name="document-outline"
            size={40}
            color={Colors[theme].textSecondary}
          />
        );
    }
  };

  // Fake upload simulation
  const simulateUpload = (docId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          if (Math.random() < 0.1) {
            setDocs((prev) =>
              prev.map((d) =>
                d.id === docId ? { ...d, status: "error", progress: 0 } : d
              )
            );
            reject(new Error("Upload failed"));
          } else {
            setDocs((prev) =>
              prev.map((d) =>
                d.id === docId ? { ...d, progress: 100, status: "success" } : d
              )
            );
            resolve();
          }
        } else {
          setDocs((prev) =>
            prev.map((d) => (d.id === docId ? { ...d, progress } : d))
          );
        }
      }, 200);
    });
  };

  const pickDocuments = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "image/*",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
      ],
      multiple: type === "multiple",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    Animated.spring(uploadAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    let newDocs: UploadingDoc[] = [];

    const currentFiles = new Set(docs.map((d) => `${d.name}-${d.size}`));

    const processAssets = (assets: DocumentPicker.DocumentPickerAsset[]) => {
      return assets.filter((asset) => {
        const key = `${asset.name}-${asset.size}`;
        if (currentFiles.has(key)) {
          Alert.alert(
            "Duplicate File Detected",
            "This file has already been uploaded. Please select a new file."
          );
          return false;
        }
        return true;
      });
    };

    if (type === "single") {
      const filteredAsset = processAssets(result.assets);
      if (filteredAsset.length > 0) {
        const asset = filteredAsset[0];
        newDocs = [
          {
            id: generateId(),
            uri: asset.uri,
            name: asset.name,
            size: asset.size,
            progress: 0,
            status: "uploading",
            customName: "",
          },
        ];
        setDocs(newDocs);
        onChange?.(newDocs.map((d) => d.uri));
      }
    } else {
      const availableSlots = maxFiles - docs.length;
      const assetsToAdd = processAssets(result.assets).slice(0, availableSlots);

      if (assetsToAdd.length > 0) {
        newDocs = assetsToAdd.map((a) => ({
          id: generateId(),
          uri: a.uri,
          name: a.name,
          size: a.size,
          progress: 0,
          status: "uploading" as const,
          customName: "",
        }));
        setDocs((prev) => {
          const updatedDocs = [...newDocs, ...prev];
          onChange?.(updatedDocs.map((d) => d.uri));
          return updatedDocs;
        });
      } else if (result.assets.length > 0 && availableSlots === 0) {
        Alert.alert(
          "Max Files Reached",
          "You have reached the maximum number of files allowed."
        );
      }
    }

    newDocs.forEach((doc) => {
      simulateUpload(doc.id).catch(() => { });
    });

    Animated.spring(uploadAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const removeDoc = (docId: string) => {
    setDocs((prev) => {
      const updated = prev.filter((d) => d.id !== docId);
      onChange?.(updated.map((d) => d.uri));
      return updated;
    });
  };

  const retryUpload = (docId: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, status: "uploading", progress: 0 } : d
      )
    );
    simulateUpload(docId).catch(() => { });
  };

  const updateDocName = (docId: string, newName: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, customName: newName } : d))
    );
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "Unknown size";
    const mb = bytes / (1024 * 1024);
    return mb < 1
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${mb.toFixed(1)} MB`;
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.mediaSection}>
        <View style={styles.mediaUploadArea}>
          <Ionicons
            name="cloud-upload-outline"
            size={52}
            color={Colors[theme].primary.main}
          />
          <Text style={styles.mediaUploadTitle}>Upload Documents</Text>
          <Text style={styles.mediaUploadSubtitle}>
            Attach images, PDFs, or files for reference
          </Text>

          {/* Upload Button */}
          <Pressable style={styles.uploadButton} onPress={pickDocuments}>
            <LinearGradient
              colors={[Colors[theme].primary.main, Colors[theme].primary.main]}
              style={styles.uploadGradientBtn}
            >
              <Ionicons name="add-circle-outline" size={22} color="white" />
              <Text style={styles.uploadButtonText}>Browse Files</Text>
            </LinearGradient>
          </Pressable>

          {docs.length === 0 ? (
            <Text style={styles.previewSubtitle}>No files uploaded yet</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {docs.map((doc) => (
                <View
                  key={doc.id}
                  style={[
                    styles.docCard,
                    {
                      borderColor:
                        doc.status === "success"
                          ? "#27ae60"
                          : doc.status === "error"
                            ? "#e74c3c"
                            : "rgba(255,255,255,0.2)",
                    },
                  ]}
                >
                  {/* Preview */}
                  <View >
                    {getFileType(doc.name) === "image" ? (
                      <Image
                        source={{ uri: doc.uri }}
                        style={styles.imagePreview}
                      />
                    ) : (
                      <View style={styles.fileIconContainer}>
                        {getFileIcon(getFileType(doc.name))}
                      </View>
                    )}

                    {/* Status overlays */}
                    {doc.status === "uploading" && (
                      <View style={styles.uploadingOverlay}>
                        <ActivityIndicator size="small" color="white" />
                        <Text style={styles.uploadingText}>
                          {Math.round(doc.progress)}%
                        </Text>
                      </View>
                    )}
                    {doc.status === "success" && (
                      <Ionicons
                        name="checkmark-circle"
                        size={26}
                        color={Colors[theme].success.main}
                        style={styles.statusIcon}
                      />
                    )}
                    {doc.status === "error" && (
                      <View style={styles.errorOverlay}>
                        <Ionicons
                          name="alert-circle"
                          size={26}
                          color="white"
                        />
                        <TouchableOpacity
                          style={styles.fabRetry}
                          onPress={() => retryUpload(doc.id)}
                        >
                          <Ionicons name="refresh" size={16} color="white" />
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Delete Button */}
                    <TouchableOpacity
                      style={styles.fabDelete}
                      onPress={() => removeDoc(doc.id)}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>

                  {/* Progress Bar */}
                  {doc.status === "uploading" && (
                    <View style={styles.progressContainer}>
                      <Animated.View
                        style={[
                          styles.progressFill,
                          { width: `${doc.progress}%` },
                        ]}
                      />
                    </View>
                  )}

                  {/* Info */}
                  <View style={styles.docInfo}>
                    <Text
                      style={styles.docTitle}
                      numberOfLines={2}
                    >
                      {doc.name}
                    </Text>

                    <View style={styles.docMeta}>
                      <Text style={styles.docSize}>
                        {formatFileSize(doc.size)}
                      </Text>
                      <View style={styles.docTypeBadge}>
                        <Text style={styles.docTypeText}>
                          {doc.name.split(".").pop()?.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <TextInput
                      style={styles.nameInput}
                      placeholder="Enter Name"
                      value={doc.customName}
                      onChangeText={(text) => updateDocName(doc.id, text)}
                      maxLength={30}
                    />
                  </View>
                </View>
              ))}
              </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default DocumentUploader;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingTop: ms(20),
  },
  mediaSection: { gap: ms(20) },

  mediaUploadArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: ms(40),
    paddingHorizontal: ms(20),
    backgroundColor: "#F9F9F9",
    borderRadius: ms(20),
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderStyle: "dashed",
  },

  mediaUploadTitle: {
    fontSize: ms(18),
    fontWeight: "600",
    marginTop: ms(16),
    marginBottom: ms(8),
  },
  mediaUploadSubtitle: {
    fontSize: ms(14),
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: ms(20),
  },

  uploadButton: { marginBottom: 12 },
  uploadGradientBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: ms(12),
    paddingHorizontal: ms(22),
    borderRadius: ms(30),
  },
  uploadButtonText: {
    marginLeft: ms(8),
    fontSize: ms(16),
    fontWeight: "600",
    color: "white",
  },

  previewSubtitle: { fontSize: 14, color: "#8E8E93" },
  scrollContent: { paddingHorizontal: 20 },

  docCard: {
    width: 170,
    height: 260,
    marginRight: ms(16),
    borderRadius: ms(18),
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  docPreview: { height: 130, position: "relative" },
  imagePreview: { width: "100%", height: "100%", resizeMode: "cover" },
  fileIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadingText: { color: "white", fontWeight: "bold", marginTop: 6 },

  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(231,76,60,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  statusIcon: {
    position: "absolute",
    top: 8,
    left: 8,
  },

  fabDelete: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  fabRetry: {
    marginTop: 12,
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 20,
  },

  progressContainer: { height: 3, backgroundColor: "#ddd" },
  progressFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#007AFF",
  },

  docInfo: { flex: 1, padding: 10 },
  docTitle: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
  docMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  docSize: { fontSize: 11, color: "#666" },
  docTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  docTypeText: { color: "white", fontSize: 10, fontWeight: "bold" },

  nameInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    borderColor: "#ddd",
  },
});

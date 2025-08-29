import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { color } from "@rneui/base";

const { width } = Dimensions.get('window');

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
    if (extension === "pdf") {
      return "pdf";
    }
    if (["doc", "docx"].includes(extension)) {
      return "word";
    }
    if (["xls", "xlsx"].includes(extension)) {
      return "excel";
    }
    if (extension === "txt") {
      return "text";
    }
    return "unknown";
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <Ionicons name="document-text" size={40} color={Colors[theme].danger.main} />;
      case "word":
        return <Ionicons name="document" size={40} color={Colors[theme].primary.main} />;
      case "excel":
        return <Ionicons name="grid" size={40} color={Colors[theme].success.main} />;
      case "text":
        return <Feather name="file-text" size={40} color={Colors[theme].secondary.main} />;
      case "image":
        return <Ionicons name="image" size={40} color={Colors[theme].warning.main} />;
      default:
        return <Ionicons name="document-outline" size={40} color={Colors[theme].textSecondary} />;
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
      const filteredAssets = assets.filter((asset) => {
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
      return filteredAssets;
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
        if (onChange) {
          onChange(newDocs.map((d) => d.uri));
        }
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
          if (onChange) {
            onChange(updatedDocs.map((d) => d.uri));
          }
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
    return mb < 1 ? `${(bytes / 1024).toFixed(0)} KB` : `${mb.toFixed(1)} MB`;
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      {/* Documents Grid */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <View style={styles.grid}>
          {/* Add Button */}
          {(type === "single" ? docs.length === 0 : docs.length < maxFiles) && (
            <TouchableOpacity
              style={[styles.addCard, { shadowColor: Colors[theme].primary.main }]}
              onPress={pickDocuments}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[Colors[theme].primary.main, Colors[theme].secondary.main]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.addCardGradient}
              >
                <Animated.View
                  style={[
                    styles.addCardContent,
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
                  <View style={styles.addIconContainer}>
                    <Ionicons name="add" size={28} color="white" />
                  </View>
                  <Text style={styles.addTitle}>Add Files</Text>
                  <Text style={styles.addSubtitle}>
                    Tap to browse
                  </Text>
                  <View style={styles.supportedFormats}>
                    <Text style={styles.formatText}>PDF • DOC • XLS • IMG</Text>
                  </View>
                </Animated.View>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Document Cards */}
          {docs.map((doc) => (
            <View
              key={doc.id}
              style={[
                styles.docCard,
                {
                  backgroundColor: Colors[theme].cart,
                  shadowColor: Colors[theme].shadow,
                  borderColor: doc.status === 'success' ? '#27ae60' :
                    doc.status === 'error' ? '#e74c3c' : Colors[theme].border
                },
              ]}
            >
              {/* Document Preview */}
              <View style={styles.docPreview}>
                {getFileType(doc.name) === "image" ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: doc.uri }} style={styles.imagePreview} />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.6)']}
                      style={styles.imageOverlay}
                    />
                  </View>
                ) : (
                  <View style={[styles.fileIconContainer, { backgroundColor: Colors[theme].background }]}>
                    {getFileIcon(getFileType(doc.name))}
                  </View>
                )}

                {/* Status Overlays */}
                {doc.status === "uploading" && (
                  <View style={styles.uploadingOverlay}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={styles.uploadingText}>{Math.round(doc.progress)}%</Text>
                  </View>
                )}

                {doc.status === "success" && (
                  <View style={styles.successOverlay}>
                    <Ionicons name="checkmark-circle" size={24} style={{ color: Colors[theme].success.border }} />
                  </View>
                )}

                {doc.status === "error" && (
                  <View style={styles.errorOverlay}>
                    <Ionicons name="alert-circle" size={24} style={{ color: Colors[theme].danger.border }} />
                    <TouchableOpacity
                      style={styles.retryButton}
                      onPress={() => retryUpload(doc.id)}
                    >
                      <Ionicons name="refresh" size={16} color="white" />
                      <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Delete Button */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeDoc(doc.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>

              {/* Progress Bar */}
              {doc.status === "uploading" && (
                <View style={[styles.progressContainer, { backgroundColor: Colors[theme].border }]}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: `${doc.progress}%`,
                        backgroundColor: Colors[theme].primary.main,
                      },
                    ]}
                  />
                </View>
              )}

              {/* Document Info */}
              <View style={styles.docInfo}>
                <Text
                  style={[styles.docTitle, { color: Colors[theme].textPrimary }]}
                  numberOfLines={2}
                >
                  {doc.name}
                </Text>

                <View style={styles.docMeta}>
                  <Text style={[styles.docSize, { color: Colors[theme].textSecondary }]}>
                    {formatFileSize(doc.size)}
                  </Text>
                  <View style={[styles.docTypeBadge, { backgroundColor: Colors[theme].primary.main }]}>
                    <Text style={styles.docTypeText}>
                      {doc.name.split('.').pop()?.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Custom Name Input */}
                <TextInput
                  style={[
                    styles.nameInput,
                    {
                      borderColor: Colors[theme].border,
                      color: Colors[theme].textPrimary,
                      backgroundColor: Colors[theme].background,
                    },
                  ]}
                  placeholder="Enter Name"
                  placeholderTextColor={Colors[theme].textSecondary}
                  value={doc.customName}
                  onChangeText={(text) => updateDocName(doc.id, text)}
                  maxLength={30}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DocumentUploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  // Header Styles
  header: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerGradient: {
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.white,
    marginTop: 4,
    textAlign: 'center',
  },

  // Stats Bar
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: 16,
  },

  // Scroll and Grid
  scroll: {
    flexGrow: 0,
    height: 280,
    paddingVertical: 10,
  },
  scrollContent: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
  },

  // Add Card
  addCard: {
    width: 160,
    height: 250,
    marginRight: 15, 
    marginBottom: 15,
    borderRadius: 16,
    elevation: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  addCardGradient: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardContent: {
    alignItems: 'center',
  },
  addIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  addTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  addSubtitle: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 12,
  },
  supportedFormats: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  formatText: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: '600',
  },

  // Document Cards
  docCard: {
    width: 160,
    height: 250,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },

  // Document Preview
  docPreview: {
    height: 125,
    position: 'relative',
  },
  imagePreviewContainer: {
    flex: 1,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  fileIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    borderRadius: 12,
  },

  // Status Overlays
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  successOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 4,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(231,76,60,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#e74c3c',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  // Delete Button
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Progress Bar
  progressContainer: {
    height: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },

  // Document Info
  docInfo: {
    flex: 1,
    padding: 8,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 16,
  },
  docMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  docSize: {
    fontSize: 11,
    fontWeight: '500',
  },
  docTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  docTypeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },

  // Name Input
  nameInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12,
    marginHorizontal: 1,
    minHeight: 40,
    flexShrink: 1,
    marginBottom: 10
  },
});

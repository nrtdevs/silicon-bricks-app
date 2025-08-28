// import { Colors } from "@/constants/Colors";
// import { useTheme } from "@/context/ThemeContext";
// import * as DocumentPicker from "expo-document-picker";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image, // Added Image import
// } from "react-native";

// import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Temporarily import MaterialIcons for icons

// type DocumentUploaderProps = {
//   type?: "single" | "multiple";
//   onChange?: (docs: string[]) => void;
//   maxFiles?: number;
//   maxSizeMB?: number;
// };

// interface UploadingDoc {
//   id: string;
//   uri: string;
//   name: string;
//   size?: number;
//   progress: number;
//   status: "uploading" | "success" | "error";
//   customName?: string;
// }

// const DocumentUploader = ({
//   type = "single",
//   onChange,
//   maxFiles = 10,
//   maxSizeMB = 5,
// }: DocumentUploaderProps) => {
//   const [docs, setDocs] = useState<UploadingDoc[]>([]);
//   const [uploadAnimation] = useState(new Animated.Value(0));
//   const { theme } = useTheme();

//   const generateId = () => Math.random().toString(36).substr(2, 9);

//   const getFileType = (fileName: string) => {
//     const extension = fileName.split(".").pop()?.toLowerCase();
//     if (!extension) return "unknown";
//     if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
//       return "image";
//     }
//     if (extension === "pdf") {
//       return "pdf";
//     }
//     if (["doc", "docx", "xls", "xlsx", "txt"].includes(extension)) {
//       return "document";
//     }
//     return "unknown";
//   };

//   // Fake upload simulation
//   const simulateUpload = (docId: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       let progress = 0;
//       const interval = setInterval(() => {
//         progress += Math.random() * 25 + 5;
//         if (progress >= 100) {
//           progress = 100;
//           clearInterval(interval);

//           if (Math.random() < 0.1) {
//             setDocs((prev) =>
//               prev.map((d) =>
//                 d.id === docId ? { ...d, status: "error", progress: 0 } : d
//               )
//             );
//             reject(new Error("Upload failed"));
//           } else {
//             setDocs((prev) =>
//               prev.map((d) =>
//                 d.id === docId ? { ...d, progress: 100, status: "success" } : d
//               )
//             );
//             resolve();
//           }
//         } else {
//           setDocs((prev) =>
//             prev.map((d) => (d.id === docId ? { ...d, progress } : d))
//           );
//         }
//       }, 200);
//     });
//   };

//   const pickDocuments = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: [
//         "application/pdf",
//         "image/*",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "text/plain",
//       ],
//       multiple: type === "multiple",
//       copyToCacheDirectory: true,
//     });

//     if (result.canceled) return;

//     Animated.spring(uploadAnimation, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();

//     let newDocs: UploadingDoc[] = [];

//     if (type === "single") {
//       const asset = result.assets[0];
//       newDocs = [
//         {
//           id: generateId(),
//           uri: asset.uri,
//           name: asset.name,
//           size: asset.size,
//           progress: 0,
//           status: "uploading",
//           customName: "",
//         },
//       ];
//       setDocs(newDocs);
//     } else {
//       const currentUris = new Set(docs.map((d) => d.uri));
//       const availableSlots = maxFiles - docs.length;
//       const assetsToAdd = result.assets
//         .filter((a) => !currentUris.has(a.uri))
//         .slice(0, availableSlots);

//       if (assetsToAdd.length > 0) {
//         newDocs = assetsToAdd.map((a) => ({
//           id: generateId(),
//           uri: a.uri,
//           name: a.name,
//           size: a.size,
//           progress: 0,
//           status: "uploading" as const,
//           customName: "",
//         }));
//         setDocs((prev) => [...prev, ...newDocs]);
//       } else {
//         Alert.alert(
//           "No New Files",
//           "These documents are already added or exceed max limit."
//         );
//       }
//     }

//     newDocs.forEach((doc) => {
//       simulateUpload(doc.id).catch(() => {});
//     });

//     if (onChange) {
//       const allUris =
//         type === "single"
//           ? [newDocs[0].uri]
//           : [...docs.map((d) => d.uri), ...newDocs.map((d) => d.uri)];
//       onChange(allUris);
//     }

//     Animated.spring(uploadAnimation, {
//       toValue: 0,
//       useNativeDriver: true,
//     }).start();
//   };

//   const removeDoc = (docId: string) => {
//     setDocs((prev) => {
//       const updated = prev.filter((d) => d.id !== docId);
//       onChange?.(updated.map((d) => d.uri));
//       return updated;
//     });
//   };

//   const retryUpload = (docId: string) => {
//     setDocs((prev) =>
//       prev.map((d) =>
//         d.id === docId ? { ...d, status: "uploading", progress: 0 } : d
//       )
//     );
//     simulateUpload(docId).catch(() => {});
//   };

//   const updateDocName = (docId: string, newName: string) => {
//     setDocs((prev) =>
//       prev.map((d) => (d.id === docId ? { ...d, customName: newName } : d))
//     );
//   };

//   const formatFileSize = (bytes?: number): string => {
//     if (!bytes) return "Unknown size";
//     const mb = bytes / (1024 * 1024);
//     return `${mb.toFixed(1)} MB`;
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: Colors[theme].background },
//       ]}
//     >
//       <Text
//         style={[styles.mainTitle, { color: Colors[theme].textPrimary }]}
//       >
//         {type === "single" ? "Upload Document" : "Upload Documents"}
//       </Text>
//       <Text
//         style={[styles.subtitle, { color: Colors[theme].textSecondary }]}
//       >
//         Select {type === "single" ? "a document" : "documents"} (PDF, Word, Excel, TXT)
//       </Text>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.row}
//         style={styles.scroll}
//       >
//         {(type === "single" ? docs.length === 0 : docs.length < maxFiles) && (
//           <TouchableOpacity
//             style={[
//               styles.addButton,
//               { shadowColor: Colors[theme].primary.main },
//             ]}
//             onPress={pickDocuments}
//           >
//             <LinearGradient
//               colors={[Colors[theme].primary.main, Colors[theme].secondary.main]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.addButtonGradient}
//             >
//               <Animated.View
//                 style={[
//                   styles.addButtonContent,
//                   {
//                     transform: [
//                       {
//                         scale: uploadAnimation.interpolate({
//                           inputRange: [0, 1],
//                           outputRange: [1, 0.9],
//                         }),
//                       },
//                     ],
//                   },
//                 ]}
//               >
//                 <Text style={[styles.plusIcon, { color: Colors.white }]}>
//                   +
//                 </Text>
//                 <Text style={[styles.addText, { color: Colors.white }]}>
//                   Add
//                 </Text>
//               </Animated.View>
//             </LinearGradient>
//           </TouchableOpacity>
//         )}

//         {docs.map((doc) => (
//           <View
//             key={doc.id}
//             style={[
//               styles.card,
//               { backgroundColor: Colors[theme].cart, shadowColor: Colors[theme].shadow },
//             ]}
//           >
//             <View style={styles.docContainer}>
//               {getFileType(doc.name) === "image" ? (
//                 <Image source={{ uri: doc.uri }} style={styles.docImagePreview} />
//               ) : getFileType(doc.name) === "pdf" ? (
//                 <View style={styles.iconContainer}>
//                   <MaterialIcons name="picture-as-pdf" size={60} color={Colors[theme].textPrimary} />
//                 </View>
//               ) : (
//                 <View style={styles.iconContainer}>
//                   <MaterialIcons name="description" size={60} color={Colors[theme].textPrimary} />
//                 </View>
//               )}

//               <Text
//                 style={[
//                   styles.docName,
//                   { color: Colors[theme].textPrimary },
//                 ]}
//                 numberOfLines={2}
//               >
//                 {doc.name}
//               </Text>

//               {doc.status === "uploading" && (
//                 <View style={styles.uploadOverlay}>
//                   <ActivityIndicator size="small" color={Colors.white} />
//                   <Text style={[styles.progressText, { color: Colors.white }]}>
//                     {Math.round(doc.progress)}%
//                   </Text>
//                 </View>
//               )}

//               {doc.status === "success" && (
//                 <View
//                   style={[
//                     styles.successBadge,
//                     { backgroundColor: Colors[theme].success.main },
//                   ]}
//                 >
//                   <Text style={[styles.successIcon, { color: Colors.white }]}>
//                     ✓
//                   </Text>
//                 </View>
//               )}

//               {doc.status === "error" && (
//                 <View
//                   style={[
//                     styles.errorOverlay,
//                     { backgroundColor: Colors[theme].danger.bg },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.errorIcon,
//                       { color: Colors[theme].danger.text },
//                     ]}
//                   >
//                     ⚠️
//                   </Text>
//                   <TouchableOpacity
//                     style={[styles.retryButton, { backgroundColor: Colors.white }]}
//                     onPress={() => retryUpload(doc.id)}
//                   >
//                     <Text
//                       style={[
//                         styles.retryText,
//                         { color: Colors[theme].danger.main },
//                       ]}
//                     >
//                       Retry
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               )}

//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => removeDoc(doc.id)}
//               >
//                 <Text style={[styles.deleteIcon, { color: Colors.white }]}>
//                   ×
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {doc.status === "uploading" && (
//               <View
//                 style={[styles.progressBar, { backgroundColor: Colors[theme].border }]}
//               >
//                 <View
//                   style={[
//                     styles.progressFill,
//                     {
//                       width: `${doc.progress}%`,
//                       backgroundColor: Colors[theme].primary.main,
//                     },
//                   ]}
//                 />
//               </View>
//             )}

//             <View style={styles.fileInfo}>
//               <Text style={[styles.fileSize, { color: Colors[theme].textSecondary }]}>
//                 {formatFileSize(doc.size)}
//               </Text>
//             </View>

//             <View style={styles.nameInputContainer}>
//               <TextInput
//                 style={[
//                   styles.nameInput,
//                   {
//                     borderColor: Colors[theme].border,
//                     color: Colors[theme].textPrimary,
//                     backgroundColor: Colors[theme].background,
//                   },
//                 ]}
//                 placeholder="Enter file name"
//                 placeholderTextColor={Colors[theme].placeholder}
//                 value={doc.customName}
//                 onChangeText={(t) => updateDocName(doc.id, t)}
//                 maxLength={30}
//               />
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default DocumentUploader;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   mainTitle: { fontSize: 24, fontWeight: "800", marginBottom: 8, textAlign: "center" },
//   subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30 },
//   scroll: { marginBottom: 20 },
//   row: { paddingVertical: 10, alignItems: "flex-start" },
//   addButton: { marginRight: 15, borderRadius: 16, elevation: 6 },
//   addButtonGradient: {
//     width: 120, height: 120, borderRadius: 16, alignItems: "center", justifyContent: "center",
//   },
//   addButtonContent: { alignItems: "center" },
//   plusIcon: { fontSize: 32, fontWeight: "300", marginBottom: 4 },
//   addText: { fontSize: 14, fontWeight: "600" },
//   card: { width: 140, marginRight: 15, borderRadius: 16, elevation: 4, overflow: "hidden" },
//   docContainer: { position: "relative", width: "100%", height: 100, padding: 10, alignItems: "center", justifyContent: "center" },
//   docImagePreview: { width: "100%", height: "100%", resizeMode: "cover", borderRadius: 10 },
//   iconContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
//   docName: { fontSize: 12, fontWeight: "600", position: "absolute", bottom: 5, left: 5, right: 5, backgroundColor: "rgba(255,255,255,0.7)", paddingHorizontal: 5, borderRadius: 5, textAlign: "center" },
//   uploadOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.7)", alignItems: "center", justifyContent: "center" },
//   progressText: { fontSize: 12, fontWeight: "600", marginTop: 6 },
//   successBadge: { position: "absolute", top: 8, left: 8, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
//   successIcon: { fontSize: 12, fontWeight: "bold" },
//   errorOverlay: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
//   errorIcon: { fontSize: 20, marginBottom: 6 },
//   retryButton: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
//   retryText: { fontSize: 10, fontWeight: "600" },
//   deleteButton: { position: "absolute", top: 6, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.7)", alignItems: "center", justifyContent: "center" },
//   deleteIcon: { fontSize: 14, fontWeight: "bold" },
//   progressBar: { height: 2, overflow: "hidden" },
//   progressFill: { height: "100%" },
//   fileInfo: { padding: 6, alignItems: "center" },
//   fileSize: { fontSize: 10, fontWeight: "500" },
//   nameInputContainer: { paddingHorizontal: 8, paddingBottom: 10 },
//   nameInput: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6, fontSize: 12, textAlign: "center" },
// });


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
        return <Ionicons name="document-text" size={40} color="#e74c3c" />;
      case "word":
        return <Ionicons name="document" size={40} color="#2980b9" />;
      case "excel":
        return <Ionicons name="grid" size={40} color="#27ae60" />;
      case "text":
        return <Feather name="file-text" size={40} color="#9b59b6" />;
      case "image":
        return <Ionicons name="image" size={40} color="#f39c12" />;
      default:
        return <Ionicons name="document-outline" size={40} color="#7f8c8d" />;
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

    if (type === "single") {
      const asset = result.assets[0];
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
    } else {
      const currentUris = new Set(docs.map((d) => d.uri));
      const availableSlots = maxFiles - docs.length;
      const assetsToAdd = result.assets
        .filter((a) => !currentUris.has(a.uri))
        .slice(0, availableSlots);

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
        setDocs((prev) => [...prev, ...newDocs]);
      } else {
        Alert.alert(
          "No New Files",
          "These documents are already added or exceed max limit."
        );
      }
    }

    newDocs.forEach((doc) => {
      simulateUpload(doc.id).catch(() => {});
    });

    if (onChange) {
      const allUris =
        type === "single"
          ? [newDocs[0].uri]
          : [...docs.map((d) => d.uri), ...newDocs.map((d) => d.uri)];
      onChange(allUris);
    }

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
    simulateUpload(docId).catch(() => {});
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
      {/* Header Section */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Ionicons name="cloud-upload" size={32} color="white" />
          <Text style={styles.headerTitle}>
            {type === "single" ? "Upload Document" : "Upload Documents"}
          </Text>
          <Text style={styles.headerSubtitle}>
            Select {type === "single" ? "a document" : "documents"} to upload
          </Text>
        </LinearGradient>
      </View>

      {/* Stats Bar */}
      <View style={[styles.statsBar, { backgroundColor: Colors[theme].cart }]}>
        <View style={styles.statItem}>
          <Ionicons name="documents" size={20} color={Colors[theme].primary.main} />
          <Text style={[styles.statText, { color: Colors[theme].textPrimary }]}>
            {docs.length}/{maxFiles}
          </Text>
          <Text style={[styles.statLabel, { color: Colors[theme].textSecondary }]}>
            Files
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
          <Text style={[styles.statText, { color: Colors[theme].textPrimary }]}>
            {docs.filter(d => d.status === 'success').length}
          </Text>
          <Text style={[styles.statLabel, { color: Colors[theme].textSecondary }]}>
            Ready
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Ionicons name="time" size={20} color="#f39c12" />
          <Text style={[styles.statText, { color: Colors[theme].textPrimary }]}>
            {docs.filter(d => d.status === 'uploading').length}
          </Text>
          <Text style={[styles.statLabel, { color: Colors[theme].textSecondary }]}>
            Uploading
          </Text>
        </View>
      </View>

      {/* Documents Grid */}
      <ScrollView 
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
                    <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
                  </View>
                )}

                {doc.status === "error" && (
                  <View style={styles.errorOverlay}>
                    <Ionicons name="alert-circle" size={24} color="#e74c3c" />
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
                  placeholder="Enter custom name (optional)"
                  placeholderTextColor={Colors[theme].placeholder}
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
    backgroundColor: '#f8f9fa',
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
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
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
    backgroundColor: '#e9ecef',
    marginHorizontal: 16,
  },

  // Scroll and Grid
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Add Card
  addCard: {
    width: (width - 60) / 2,
    height: 200,
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
    color: 'white',
    marginBottom: 4,
  },
  addSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
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
    color: 'white',
    fontWeight: '500',
  },

  // Document Cards
  docCard: {
    width: (width - 60) / 2,
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
    height: 120,
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
    padding: 12,
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
    textAlign: 'left',
  },
});
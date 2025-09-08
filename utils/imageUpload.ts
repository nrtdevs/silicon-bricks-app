import * as FileSystem from "expo-file-system";
import { Env } from "@/constants/ApiEndpoints";
  
  
  const uploadImage = async (uris: string[]) => {
    const uploadedUrls: string[] = [];
    for (const uri of uris) {
      try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          console.error("File does not exist:", uri);
          continue; // Skip to the next file
        }

        const fileExtension = uri.split(".").pop() || "jpg";
        const mimeType = getMimeType(fileExtension);

        const formData = new FormData();
        formData.append("file", {
          uri,
          name: `upload.${fileExtension}`,
          type: mimeType,
        } as unknown as Blob);

        const uploadResponse = await fetch(`${Env.IMAGE_UPLOAD}`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          const err = await uploadResponse.text();
          throw new Error(`Upload failed for ${uri}: ${err}`);
        }

        const responseData = await uploadResponse.json();
        if (responseData?.files && responseData.files.length > 0) {
          uploadedUrls.push(responseData.files[0]);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
    return uploadedUrls;
  };

  const getMimeType = (fileExtension: string) => {
    switch (fileExtension.toLowerCase()) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "mp4":
        return "video/mp4";
      case "mov":
        return "video/quicktime";
      case "mp3":
        return "audio/mpeg";
      default:
        return "application/octet-stream"; // Generic binary file
    }
  };

  export default uploadImage;

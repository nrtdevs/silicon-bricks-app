import * as FileSystem from "expo-file-system";
import { Env } from "@/constants/ApiEndpoints";
  
  
  const uploadImage = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        console.error("File does not exist:", uri);
        return;
      }

      const fileExtension = uri.split(".").pop() || "jpg"; // Default to jpg if no extension
      const mimeType = `image/${fileExtension}`;

      const formData = new FormData();

      formData.append("file", {
        uri,
        name: `upload.${fileExtension}`,
        type: mimeType,
      } as unknown as Blob); 

      const uploadResponse = await fetch(`${Env.SERVER_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!uploadResponse.ok) {
        const err = await uploadResponse.text();
        throw new Error(`Upload failed: ${err}`);
      }
      const responseData = await uploadResponse.json(); 
      return responseData?.files[0];
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  export default uploadImage
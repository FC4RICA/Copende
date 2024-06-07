import { supabase } from "../lib/supabase";
import { decode } from "typescript-base64-arraybuffer";

export const uploadImagePost = async (file: any) => {
    const binaryData = decode(file.split(",")[1]);
    const fileName = `/post/${Date.now()}.png`;
    
    const { error } = await supabase.storage
      .from("WebproImg")
      .upload(fileName, binaryData, { 
        cacheControl: "image/png",
      contentType : "image/png"
    });
    
    if (error) {
      throw error;
    }
  
    const { data } = await supabase.storage
      .from("WebproImg")
      .getPublicUrl(fileName);
  
    return data.publicUrl;
};
  
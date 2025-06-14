import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import * as FileSystem from "expo-file-system";

/**
 * Downloads an audio file from Firebase Storage and saves it to device storage.
 * @param {string} firebasePath - The path in Firebase Storage (e.g., 'whiteNoises/sound1.mp3')
 * @param {string} localFileName - The file name to save locally (e.g., 'sound1.mp3')
 * @returns {Promise<string>} - The local URI of the saved file
 */
export const downloadAudioFromFirebase = async (firebasePath, localFileName) => {
  try {
    // Get download URL from Firebase Storage
    const fileRef = ref(storage, firebasePath);
    const url = await getDownloadURL(fileRef);

    // Define local file path
    const localUri = FileSystem.documentDirectory + localFileName;

    // Download and save the file
    const downloadRes = await FileSystem.downloadAsync(url, localUri);
    return downloadRes.uri;
  } catch (error) {
    console.error("❌ Error downloading audio from Firebase:", error);
    throw error;
  }
};
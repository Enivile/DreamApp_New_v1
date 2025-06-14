import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export const startRecording = async () => {
  try {
    await Audio.requestPermissionsAsync();
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
    return recording;
  } catch (error) {
    console.error("❌ Error starting recording:", error);
  }
};

export const stopRecording = async (recording) => {
  try {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    return base64;
  } catch (error) {
    console.error("❌ Error stopping recording:", error);
  }
};

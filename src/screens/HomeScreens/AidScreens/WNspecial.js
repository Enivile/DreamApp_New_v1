import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { downloadAudioFromFirebase } from "../../../utils/firebaseAudioDownloader";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useMiniPlayer } from "../../../context/MiniPlayerContext";

const soundData = [
  { id: "1", name: "Keyboard", icon: "laptop-outline" },
  { id: "2", name: "Clock", icon: "time-outline" },
  { id: "6", name: "Ceiling Fan", icon: "sunny" },
  { id: "7", name: "Piano", icon: "musical-notes-outline" },
  { id: "8", name: "Computer Fan", icon: "desktop-outline" },
  { id: "11", name: "Exhaust Fan", icon: "radio-outline" },
  { id: "19", name: "Old Fan", icon: "radio-outline" },
  { id: "21", name: "Pink Noise", icon: "radio-outline" },
  { id: "33", name: "Small Desk Fan", icon: "radio-outline" }
];

const firebasePathMap = {
  "Keyboard": "whiteNoises/Keyboard.mp3",
  "Clock": "whiteNoises/Clock.mp3",
  "Ceiling Fan": "whiteNoises/Ceiling_Fan.mp3",
  "Piano": "whiteNoises/Piano.mp3",
  "Computer Fan": "whiteNoises/Computer_Fan.mp3",
  "Exhaust Fan": "whiteNoises/Exhaust_Fan.mp3",
  "Old Fan": "whiteNoises/Old_Fan.mp3",
  "Pink Noise": "whiteNoises/Pink_Noise.mp3",
  "Small Desk Fan": "whiteNoises/Small_Desk_Fan.mp3"
};

const WNspecial = () => {
  const [loadingIds, setLoadingIds] = useState([]);
  const navigation = useNavigation();
  const { miniPlayerSounds, updateMiniPlayerSounds, showMiniPlayer } = useMiniPlayer();

  const handleDownload = async (item) => {
    const firebasePath = firebasePathMap[item.name];
    if (!firebasePath) {
      Alert.alert("Not available", "No Firebase path mapped for this sound.");
      return;
    }

    const fileName = firebasePath.split("/").pop();
    const localUri = FileSystem.documentDirectory + fileName;

    try {
      setLoadingIds((prev) => [...prev, item.id]);
      
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      let uri = localUri;
      
      if (!fileInfo.exists) {
        uri = await downloadAudioFromFirebase(firebasePath, fileName);
      }

      const isAlreadyAdded = miniPlayerSounds.some((s) => s.id === item.id);
      if (!isAlreadyAdded) {
        const updatedSounds = [...miniPlayerSounds, { ...item, uri }];
        updateMiniPlayerSounds(updatedSounds);
        showMiniPlayer(updatedSounds);
      }

      navigation.navigate("MainPlayer");
    } catch (error) {
      Alert.alert("Download failed", error.message || "An error occurred while downloading.");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={soundData}
        keyExtractor={(item) => item.id}
        numColumns={4}
        renderItem={({ item }) => (
          <View style={styles.gridItemContainerMain}>
            <TouchableOpacity
              style={styles.gridItemContainer}
              onPress={() => handleDownload(item)}
              disabled={loadingIds.includes(item.id)}
            >
              {loadingIds.includes(item.id) ? (
                <ActivityIndicator size={25} color="white" />
              ) : (
                <Ionicons name={item.icon} size={25} color="white" />
              )}
            </TouchableOpacity>
            <Text style={styles.gridText}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.gridListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  gridItemContainerMain: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  gridItemContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  gridText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
});

export default WNspecial;
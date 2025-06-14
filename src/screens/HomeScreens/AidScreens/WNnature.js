import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { downloadAudioFromFirebase } from "../../../utils/firebaseAudioDownloader";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useMiniPlayer } from "../../../context/MiniPlayerContext";

const soundData = [
  { id: "3", name: "Birds", icon: "sunny-outline" },
  { id: "4", name: "Campfire", icon: "flame-outline" },
  { id: "5", name: "Cave", icon: "earth-outline" },
  { id: "9", name: "Crickets", icon: "bug-outline" },
  { id: "17", name: "Night Insects", icon: "moon-outline" },
  { id: "18", name: "Ocean Waves", icon: "water-outline" },
  { id: "20", name: "Owls", icon: "moon-outline" },
  { id: "30", name: "River", icon: "water-outline" },
  { id: "32", name: "Seagulls", icon: "sunny-outline" },
  { id: "35", name: "Underwater", icon: "water-outline" }
];

const firebasePathMap = {
  "Birds": "whiteNoises/Birds.mp3",
  "Campfire": "whiteNoises/Campfire.mp3",
  "Cave": "whiteNoises/Cave.mp3",
  "Crickets": "whiteNoises/Crickets.mp3",
  "Night Insects": "whiteNoises/Night_Insects.mp3",
  "Ocean Waves": "whiteNoises/Ocean_Waves.mp3",
  "Owls": "whiteNoises/Owls.mp3",
  "River": "whiteNoises/River.mp3",
  "Seagulls": "whiteNoises/Seagulls.mp3",
  "Underwater": "whiteNoises/Underwater.mp3"
};

const WNnature = () => {
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

export default WNnature;
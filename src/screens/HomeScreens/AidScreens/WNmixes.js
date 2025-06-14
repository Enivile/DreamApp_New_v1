/**
 * WNmixes.js - White Noise Mixes Screen
 * 
 * This component displays 4 different themed mixes, each containing 3 contextually related
 * white noise sounds. When a user selects a mix, the app checks if all sounds are downloaded,
 * downloads any missing sounds, and then plays all 3 sounds simultaneously.
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { downloadAudioFromFirebase } from "../../../utils/firebaseAudioDownloader";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useMiniPlayer } from "../../../context/MiniPlayerContext";

/**
 * Predefined sound mixes with contextually related sounds
 * Each mix contains 3 sounds that work well together
 */
const soundMixes = [
  {
    id: "mix1",
    name: "Nature Retreat",
    icon: "leaf-outline",
    description: "Immerse yourself in peaceful forest sounds",
    sounds: [
      { id: "3", name: "Birds", icon: "sunny-outline" },
      { id: "25", name: "Rain Forest", icon: "leaf-outline" },
      { id: "9", name: "Crickets", icon: "bug-outline" }
    ]
  },
  {
    id: "mix2",
    name: "Rainy Day",
    icon: "rainy-outline",
    description: "Relaxing rain sounds for focus and sleep",
    sounds: [
      { id: "23", name: "Rain", icon: "rainy-outline" },
      { id: "27", name: "Rain In Metal Roof", icon: "home-outline" },
      { id: "24", name: "Rain And Thunder", icon: "thunderstorm-outline" }
    ]
  },
  {
    id: "mix3",
    name: "Urban Ambience",
    icon: "business-outline",
    description: "City sounds to create a productive atmosphere",
    sounds: [
      { id: "15", name: "Highway", icon: "car-outline" },
      { id: "31", name: "Train", icon: "train-outline" },
      { id: "1", name: "Keyboard", icon: "laptop-outline" }
    ]
  },
  {
    id: "mix4",
    name: "Deep Relaxation",
    icon: "water-outline",
    description: "Calming sounds for meditation and sleep",
    sounds: [
      { id: "18", name: "Ocean Waves", icon: "water-outline" },
      { id: "21", name: "Pink Noise", icon: "radio-outline" },
      { id: "7", name: "Piano", icon: "musical-notes-outline" }
    ]
  }
];

/**
 * Mapping of sound names to their corresponding file paths in Firebase Storage.
 * Copied from WNall.js to maintain consistency
 */
const firebasePathMap = {
  "Keyboard": "whiteNoises/Keyboard.mp3",
  "Birds": "whiteNoises/Birds.mp3",
  "Crickets": "whiteNoises/Crickets.mp3",
  "Rain": "whiteNoises/Rain.mp3",
  "Rain In Metal Roof": "whiteNoises/Rain_In_Metal_Roof.mp3",
  "Rain And Thunder": "whiteNoises/Rain_And_Thunder.mp3",
  "Rain Forest": "whiteNoises/Rain_Forest.mp3",
  "Highway": "whiteNoises/Highway.mp3",
  "Train": "whiteNoises/Train.mp3",
  "Ocean Waves": "whiteNoises/Ocean_Waves.mp3",
  "Pink Noise": "whiteNoises/Pink_Noise.mp3",
  "Piano": "whiteNoises/Piano.mp3"
};

const WNmixes = () => {
  const [loadingMixIds, setLoadingMixIds] = useState([]);
  const navigation = useNavigation();
  const { miniPlayerSounds, updateMiniPlayerSounds, showMiniPlayer } = useMiniPlayer();

  /**
   * Handles the download and playback of all sounds in a mix
   * 
   * This function:
   * 1. Checks if each sound in the mix exists locally
   * 2. Downloads any missing sounds from Firebase
   * 3. Adds all sounds to the mini player to play simultaneously
   * 
   * @param {Object} mix - The sound mix that was selected
   */
  const handlePlayMix = async (mix) => {
    // Start loading state for this mix
    setLoadingMixIds((prev) => [...prev, mix.id]);
    
    try {
      // Array to collect all downloaded sound objects
      const downloadedSounds = [];
      
      // Process each sound in the mix
      for (const sound of mix.sounds) {
        const firebasePath = firebasePathMap[sound.name];
        if (!firebasePath) {
          throw new Error(`No Firebase path mapped for sound: ${sound.name}`);
        }

        const fileName = firebasePath.split("/").pop();
        const localUri = FileSystem.documentDirectory + fileName;
        
        // Check if file already exists locally
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        let uri = localUri;
        
        // If file doesn't exist locally, download it from Firebase
        if (!fileInfo.exists) {
          uri = await downloadAudioFromFirebase(firebasePath, fileName);
        }
        
        // Add the downloaded sound to our collection
        downloadedSounds.push({ ...sound, uri });
      }
      
      // Update the mini player with all sounds from this mix
      updateMiniPlayerSounds(downloadedSounds);
      showMiniPlayer(downloadedSounds);
      
      // No longer navigate to MainPlayer, just show the mini player
    } catch (error) {
      Alert.alert("Mix playback failed", error.message || "An error occurred while preparing the mix.");
    } finally {
      // End loading state for this mix
      setLoadingMixIds((prev) => prev.filter((id) => id !== mix.id));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={soundMixes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mixCard}
            onPress={() => handlePlayMix(item)}
            disabled={loadingMixIds.includes(item.id)}
          >
            <View style={styles.mixIconContainer}>
              <Ionicons name={item.icon} size={32} color="#00AEEF" />
            </View>
            <View style={styles.mixDetails}>
              <Text style={styles.mixName}>{item.name}</Text>
              <Text style={styles.mixDescription}>{item.description}</Text>
              <View style={styles.soundsContainer}>
                {item.sounds.map((sound) => (
                  <View key={sound.id} style={styles.soundBadge}>
                    <Ionicons name={sound.icon} size={12} color="white" />
                    <Text style={styles.soundName}>{sound.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.playButton}>
              {loadingMixIds.includes(item.id) ? (
                <ActivityIndicator size={24} color="white" />
              ) : (
                <Ionicons name="play" size={24} color="white" />
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  listContainer: {
    padding: 16,
  },
  mixCard: {
    flexDirection: "row",
    backgroundColor: "#232946",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#00AEEF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  mixIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 174, 239, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  mixDetails: {
    flex: 1,
  },
  mixName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mixDescription: {
    color: "#B0B0B0",
    fontSize: 14,
    marginBottom: 8,
  },
  soundsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  soundBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  soundName: {
    color: "white",
    fontSize: 10,
    marginLeft: 4,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#00AEEF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WNmixes;
/**
 * WNall.js - White Noise All Sounds Screen
 * 
 * This component displays a grid of all available white noise sounds that users can download
 * and play. It integrates with the MiniPlayerContext to manage sound playback and navigation.
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For displaying icons
import { downloadAudioFromFirebase } from "../../../utils/firebaseAudioDownloader";
import * as FileSystem from "expo-file-system"; // For local file operations
import { useNavigation } from "@react-navigation/native"; // For navigation between screens
import { useMiniPlayer } from "../../../context/MiniPlayerContext"; // For managing sound playback

/**
 * Array of sound objects to be displayed in the grid.
 * Each sound has a unique ID, display name, and an icon from Ionicons.
 * 
 * @type {Array<{id: string, name: string, icon: string}>}
 */
const soundData = [
  { id: "1", name: "Keyboard", icon: "laptop-outline" },
  { id: "2", name: "Clock", icon: "time-outline" },
  { id: "3", name: "Birds", icon: "sunny-outline" },
  { id: "4", name: "Campfire", icon: "flame-outline" },
  { id: "5", name: "Cave", icon: "earth-outline" },
  { id: "6", name: "Ceiling Fan", icon: "sunny" },
  { id: "7", name: "Piano", icon: "musical-notes-outline" },
  { id: "8", name: "Computer Fan", icon: "desktop-outline" },
  { id: "9", name: "Crickets", icon: "bug-outline" },
  { id: "10", name: "Draming", icon: "musical-note-outline" },
  { id: "11", name: "Exhaust Fan", icon: "radio-outline" },
  { id: "12", name: "Guitar Meditaion", icon: "musical-notes-outline" },
  { id: "13", name: "Hand_Dryer", icon: "hand-right-outline" },
  { id: "14", name: "Light Rain", icon: "rainy-outline" },
  { id: "15", name: "Highway", icon: "car-outline" },
  { id: "16", name: "Keyboard", icon: "laptop-outline" },
  { id: "17", name: "Night Insects", icon: "moon-outline" },
  { id: "18", name: "Ocean Waves", icon: "water-outline" },
  { id: "19", name: "Old Fan", icon: "radio-outline" },
  { id: "20", name: "Owls", icon: "moon-outline" },
  { id: "21", name: "Pink Noise", icon: "radio-outline" },
  { id: "22", name: "Play Ground", icon: "people-outline" },
  { id: "23", name: "Rain", icon: "rainy-outline" },
  { id: "24", name: "Rain And Thunder", icon: "thunderstorm-outline" },
  { id: "25", name: "Rain Forest", icon: "leaf-outline" },
  { id: "26", name: "Rain Forest 2", icon: "leaf-outline" },
  { id: "27", name: "Rain In Metal Roof", icon: "home-outline" },
  { id: "28", name: "Rain On Leaves", icon: "leaf-outline" },
  { id: "29", name: "Rain On Tent", icon: "umbrella-outline" },
  { id: "30", name: "River", icon: "water-outline" },
  { id: "31", name: "Train", icon: "train-outline" },
  { id: "32", name: "Seagulls", icon: "sunny-outline" },
  { id: "33", name: "Small Desk Fan", icon: "radio-outline" },
  { id: "34", name: "Train", icon: "train-outline" },
  { id: "35", name: "Underwater", icon: "water-outline" },
  { id: "36", name: "Urban Downpour", icon: "rainy-outline" },
  
];

/**
 * Mapping of sound names to their corresponding file paths in Firebase Storage.
 * This allows the app to locate and download the correct audio file for each sound.
 * 
 * @type {Object.<string, string>}
 */
const firebasePathMap = {
  "Keyboard": "whiteNoises/Keyboard.mp3",
  "Clock": "whiteNoises/Clock.mp3",
  "Birds": "whiteNoises/Birds.mp3",
  "Campfire": "whiteNoises/Campfire.mp3",
  "Cave": "whiteNoises/Cave.mp3",
  "Ceiling Fan": "whiteNoises/Ceiling_Fan.mp3",
  "Piano": "whiteNoises/Piano.mp3",
  "Computer Fan": "whiteNoises/Computer_Fan.mp3",
  "Crickets": "whiteNoises/Crickets.mp3",
  "Draming": "whiteNoises/Draming.mp3",
  "Exhaust Fan": "whiteNoises/Exhaust_Fan.mp3",
  "Guitar Meditaion": "whiteNoises/Guitar_Meditation.mp3",
  "Hand_Dryer": "whiteNoises/Hand_Dryer.mp3",
  "Light Rain": "whiteNoises/Light_Rain.mp3",
  "Highway": "whiteNoises/Highway.mp3",
  "Night Insects": "whiteNoises/Night_Insects.mp3",
  "Ocean Waves": "whiteNoises/Ocean_Waves.mp3",
  "Old Fan": "whiteNoises/Old_Fan.mp3",
  "Owls": "whiteNoises/Owls.mp3",
  "Pink Noise": "whiteNoises/Pink_Noise.mp3",
  "Play Ground": "whiteNoises/Play_Ground.mp3",
  "Rain": "whiteNoises/Rain.mp3",
  "Rain And Thunder": "whiteNoises/Rain_And_Thunder.mp3",
  "Rain Forest": "whiteNoises/Rain_Forest.mp3",
  "Rain Forest 2": "whiteNoises/Rain_Forest_2.mp3",
  "Rain In Metal Roof": "whiteNoises/Rain_In_Metal_Roof.mp3",
  "Rain On Leaves": "whiteNoises/Rain_On_Leaves.mp3",
  "Rain On Tent": "whiteNoises/Rain_On_Tent.mp3",
  "River": "whiteNoises/River.mp3",
  "Train": "whiteNoises/Train.mp3",
  "Seagulls": "whiteNoises/Seagulls.mp3",
  "Small Desk Fan": "whiteNoises/Small_Desk_Fan.mp3",
  "Underwater": "whiteNoises/Underwater.mp3",
  "Urban Downpour": "whiteNoises/Urban_Downpour.mp3"
};

/**
 * WNall Component - Displays a grid of all available white noise sounds
 * 
 * @returns {React.ReactElement} The rendered component
 */
const WNall = () => {
  // State to track which sounds are currently being downloaded
  const [loadingIds, setLoadingIds] = useState([]);
  
  // Hook for navigation between screens
  const navigation = useNavigation();
  
  // Access mini player context functions and state
  const { miniPlayerSounds, updateMiniPlayerSounds, showMiniPlayer } = useMiniPlayer();

  /**
   * Handles the download and playback of a selected sound
   * 
   * This function:
   * 1. Checks if the sound exists in Firebase
   * 2. Downloads the sound if it's not already on the device
   * 3. Adds the sound to the mini player and shows the mini player
   * 
   * @param {Object} item - The sound item that was selected
   * @param {string} item.id - Unique identifier for the sound
   * @param {string} item.name - Display name of the sound
   * @param {string} item.icon - Icon name from Ionicons
   */
  const handleDownload = async (item) => {
    // Get the Firebase storage path for this sound
    const firebasePath = firebasePathMap[item.name];
    if (!firebasePath) {
      Alert.alert("Not available", "No Firebase path mapped for this sound.");
      return;
    }

    // Extract the filename from the path
    const fileName = firebasePath.split("/").pop();
    const localUri = FileSystem.documentDirectory + fileName;

    try {
      // Add this sound's ID to the loading state to show loading indicator
      setLoadingIds((prev) => [...prev, item.id]);
      
      // Check if the file already exists locally
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      let uri = localUri;
      
      // If file doesn't exist locally, download it from Firebase
      if (!fileInfo.exists) {
        uri = await downloadAudioFromFirebase(firebasePath, fileName);
      }

      // Check if this sound is already in the mini player
      const isAlreadyAdded = miniPlayerSounds.some((s) => s.id === item.id);
      if (!isAlreadyAdded) {
        // Add the sound to the mini player with its local URI
        const updatedSounds = [...miniPlayerSounds, { ...item, uri }];
        updateMiniPlayerSounds(updatedSounds);
        showMiniPlayer(updatedSounds);
      }

      // No longer navigate to MainPlayer, just show the mini player
    } catch (error) {
      Alert.alert("Download failed", error.message || "An error occurred while downloading.");
    } finally {
      // Remove this sound's ID from loading state regardless of success/failure
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  /**
   * Render the component UI
   */
  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={soundData}
        keyExtractor={(item) => item.id}
        numColumns={4} // Display sounds in a 4-column grid
        renderItem={({ item }) => (
          <View style={styles.gridItemContainerMain}>
            <TouchableOpacity
              style={styles.gridItemContainer}
              onPress={() => handleDownload(item)}
              disabled={loadingIds.includes(item.id)} // Disable button while loading
            >
              {loadingIds.includes(item.id) ? (
                // Show loading indicator when downloading
                <ActivityIndicator size={25} color="white" />
              ) : (
                // Show sound icon when not loading
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

/**
 * Component styles
 */
const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: "#121212", // Dark background for the screen
    paddingTop: 0,
  },
  gridListContainer: {
    paddingHorizontal: 10, // Add horizontal padding to the grid
  },
  gridItemContainerMain: {
    width: '25%', // Fixed width for 4 columns
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15, // Space between grid rows
    height: 100, // Fixed height for each grid item
  },
  gridItemContainer: {
    width: 60, // Fixed width for icon container
    height: 60, // Fixed height for icon container
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E", // Slightly lighter than background for buttons
    borderRadius: 50, // Circular buttons
    padding: 15,
  },
  gridText: {
    color: "white", // White text for readability on dark background
    marginTop: 5, // Space between icon and text
    fontSize: 12, // Small font size for sound names
    textAlign: "center", // Center text
    width: 70, // Fixed width for text container
    height: 30, // Fixed height for text area
  },
});

/**
 * Export the WNall component as the default export
 */
export default WNall;

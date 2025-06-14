/**
 * MiniPlayer.js
 * 
 * A compact audio player component that appears at the bottom of the screen
 * when audio is playing but the main player is not visible. It provides basic
 * playback controls and information about the currently playing sound(s).
 * 
 * The component is conditionally rendered based on the state from MiniPlayerContext
 * and provides a way to expand to the full player or dismiss the player entirely.
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMiniPlayer } from "../../context/MiniPlayerContext";
import { useNavigation } from "@react-navigation/native";

/**
 * MiniPlayer Component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onExpand - Callback function triggered when the player expands to full screen
 * @returns {React.ReactElement|null} - Returns the mini player UI or null if it should not be displayed
 */
const MiniPlayer = ({ onExpand }) => {
  // Access player state and functions from the MiniPlayerContext
  const { 
    miniPlayerVisible,      // Boolean indicating if mini player should be shown
    miniPlayerSounds,       // Array of sound objects currently loaded
    isMiniPlayerPlaying,    // Boolean indicating if sounds are currently playing
    toggleMiniPlayerPlay,   // Function to toggle play/pause state
    hideMiniPlayer,         // Function to hide the mini player
    showMiniPlayer,         // Function to show the mini player
    mainPlayerVisible       // Boolean indicating if full-screen player is visible
  } = useMiniPlayer();
  
  const navigation = useNavigation();

  // Don't render the mini player if there are no sounds or if the main player is visible
  if (!miniPlayerSounds.length || mainPlayerVisible) return null;

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.7} 
      >
      {/* Display information about the currently playing sound(s) */}
      <View style={styles.infoRow}>
        {/* Play/Pause button - toggles between play and pause icons based on state */}
        <TouchableOpacity onPress={toggleMiniPlayerPlay} style={styles.playPauseBtn}>
          <Ionicons 
            name={isMiniPlayerPlaying ? "pause" : "play"} 
            size={22} 
            color="#fff" 
          />
        </TouchableOpacity>
        {/* Display the name of the sound(s) - if multiple sounds, show count */}
        <Text style={styles.text} numberOfLines={1}>
          {miniPlayerSounds.length === 1
            ? miniPlayerSounds[0].name  // Show just the name if only one sound
            : `${miniPlayerSounds[0].name} +${miniPlayerSounds.length - 1}`} 
        </Text>
      </View>
      {/* Playback controls */}
      <View style={styles.controls}>
        {/* Maximize to main Player Button */}
        <TouchableOpacity onPress={() => {
          // When the mini player is tapped, show the full-screen player
          showMiniPlayer(miniPlayerSounds);
          navigation.navigate("MainPlayer", { sounds: miniPlayerSounds });
          // Call the onExpand callback if provided
          // if (onExpand) onExpand();
        }}
        style={styles.iconBtn}>
          <Ionicons name="options-outline" size={22} color="#fff" />
        </TouchableOpacity>
        {/* Close button - hides the mini player */}
        <TouchableOpacity onPress={hideMiniPlayer} style={styles.iconBtn}>
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: { // Main container for the mini player
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 70,
    backgroundColor: "#232323",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    zIndex: 2000,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    opacity: 0.95,
  },
  infoRow: { // Container for the sound information (icon and name)
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  text: { // Style for the sound name text
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  controls: { // Container for the playback control buttons
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  iconBtn: { // Style for the individual control buttons
    marginLeft: 10,
    padding: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  playPauseBtn: {
    marginLeft: 0,
    marginRight: 10,
    padding: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default MiniPlayer;
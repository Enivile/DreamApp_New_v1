// src/screens/Player/MainPlayer.js

/**
 * MainPlayer Component
 * 
 * This component serves as the full-screen player interface for the application.
 * It acts as a container for the MultiSoundPlayer component and handles the
 * communication between the player UI and the MiniPlayerContext.
 * 
 * The component is responsible for:
 * - Displaying the full-screen player interface
 * - Managing sound removal from the player
 * - Handling navigation when the player is closed
 */
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import MultiSoundPlayer from "./MultiSoundPlayer";
import { useMiniPlayer } from "../../context/MiniPlayerContext";

const MainPlayer = ({ navigation }) => {
  // Access the miniPlayerSounds array and update function from context
  const { miniPlayerSounds, updateMiniPlayerSounds } = useMiniPlayer();

  /**
   * Handles the removal of a sound from the player
   * 
   * @param {string} id - The unique identifier of the sound to be removed
   */
  const handleRemoveSound = useCallback((id) => {
    // Filter out the sound with the matching id and update the context
    updateMiniPlayerSounds(miniPlayerSounds.filter((s) => s.id !== id));
  }, [miniPlayerSounds, updateMiniPlayerSounds]);

  /**
   * Handles closing the player and returning to the previous screen
   */
  const handleClosePlayer = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MultiSoundPlayer
        sounds={miniPlayerSounds}
        onRemoveSound={handleRemoveSound}
        onClose={handleClosePlayer}
      />
    </View>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainPlayer;

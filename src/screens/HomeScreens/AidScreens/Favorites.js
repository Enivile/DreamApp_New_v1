/**
 * Favorites.js
 * 
 * This component displays a user's saved favorite sounds and mixes.
 * It allows users to view and play their favorites, as well as remove items from favorites.
 * The component requires user authentication and displays appropriate messaging when not logged in.
 */

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { useMiniPlayer } from "../../../context/MiniPlayerContext";
import { getFavorites, removeFromFavorites } from "../../../utils/favoritesHistoryService";
import * as FileSystem from "expo-file-system";
import { downloadAudioFromFirebase } from "../../../utils/firebaseAudioDownloader";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingIds, setLoadingIds] = useState([]);
  const { currentUser, isAuthenticated } = useAuth();
  const navigation = useNavigation();
  const { miniPlayerSounds, updateMiniPlayerSounds, showMiniPlayer } = useMiniPlayer();

  // Load favorites when component mounts or user changes
  useEffect(() => {
    loadFavorites();
  }, [currentUser]);
  
  // Reload favorites data whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && currentUser) {
        loadFavorites();
      }
      return () => {};
    }, [isAuthenticated, currentUser])
  );

  // Function to load user's favorites from Firebase
  const loadFavorites = async () => {
    setLoading(true);
    try {
      if (isAuthenticated && currentUser) {
        const userFavorites = await getFavorites(currentUser.uid);
        setFavorites(userFavorites);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      Alert.alert("Error", "Failed to load favorites. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle playing a favorite sound or mix
  const handlePlayFavorite = async (favorite) => {
    setLoadingIds((prev) => [...prev, favorite.id]);
    
    try {
      if (favorite.type === "mix") {
        // Handle playing a mix (multiple sounds)
        const downloadedSounds = [];
        
        for (const sound of favorite.sounds) {
          const uri = await ensureSoundDownloaded(sound);
          downloadedSounds.push({ ...sound, uri });
        }
        
        updateMiniPlayerSounds(downloadedSounds);
        showMiniPlayer(downloadedSounds);
      } else {
        // Handle playing a single sound
        const uri = await ensureSoundDownloaded(favorite);
        
        const isAlreadyAdded = miniPlayerSounds.some((s) => s.id === favorite.id);
        if (!isAlreadyAdded) {
          const updatedSounds = [...miniPlayerSounds, { ...favorite, uri }];
          updateMiniPlayerSounds(updatedSounds);
          showMiniPlayer(updatedSounds);
        }
      }
      
      navigation.navigate("MainPlayer");
    } catch (error) {
      Alert.alert("Playback failed", error.message || "An error occurred while preparing the sound.");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== favorite.id));
    }
  };

  // Helper function to ensure a sound is downloaded
  const ensureSoundDownloaded = async (sound) => {
    const firebasePath = sound.firebasePath || `whiteNoises/${sound.name.replace(/ /g, "_")}.mp3`;
    const fileName = firebasePath.split("/").pop();
    const localUri = FileSystem.documentDirectory + fileName;
    
    const fileInfo = await FileSystem.getInfoAsync(localUri);
    if (!fileInfo.exists) {
      return await downloadAudioFromFirebase(firebasePath, fileName);
    }
    
    return localUri;
  };

  // Function to remove a favorite
  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFromFavorites(currentUser.uid, favoriteId);
      // Update the local state to remove the favorite
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      Alert.alert("Success", "Removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
      Alert.alert("Error", "Failed to remove from favorites. Please try again.");
    }
  };

  // Render a favorite item
  const renderFavoriteItem = ({ item }) => {
    const isMix = item.type === "mix";
    
    return (
      <TouchableOpacity
        style={isMix ? styles.mixCard : styles.soundCard}
        onPress={() => handlePlayFavorite(item)}
        disabled={loadingIds.includes(item.id)}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon || "musical-note-outline"} size={isMix ? 32 : 25} color="#00AEEF" />
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          {isMix && (
            <View style={styles.soundsContainer}>
              {item.sounds.map((sound, index) => (
                <View key={`${sound.id}-${index}`} style={styles.soundBadge}>
                  <Ionicons name={sound.icon} size={12} color="white" />
                  <Text style={styles.soundName}>{sound.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          {loadingIds.includes(item.id) ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            <>
              <TouchableOpacity 
                style={styles.playButton}
                onPress={() => handlePlayFavorite(item)}
              >
                <Ionicons name="play" size={20} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemoveFavorite(item.id)}
              >
                <Ionicons name="heart-dislike-outline" size={20} color="white" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="log-in-outline" size={50} color="#00AEEF" />
          <Text style={styles.emptyStateTitle}>Login Required</Text>
          <Text style={styles.emptyStateText}>
            Please login to save and view your favorite sounds.
          </Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show loading indicator while fetching favorites
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00AEEF" />
      </View>
    );
  }

  // Show empty state if no favorites
  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="heart-outline" size={50} color="#00AEEF" />
          <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyStateText}>
            Your favorite sounds and mixes will appear here.
          </Text>
        </View>
      </View>
    );
  }

  // Render the list of favorites
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    paddingTop: 0,
  },
  listContainer: {
    padding: 16,
  },
  soundCard: {
    flexDirection: "row",
    backgroundColor: "rgba(35, 41, 70, 0.8)",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: "center",
  },
  mixCard: {
    flexDirection: "row",
    backgroundColor: "rgba(35, 41, 70, 0.8)",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 174, 239, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
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
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#00AEEF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 59, 48, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    padding: 20,
  },
  emptyStateTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#00AEEF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Favorites;
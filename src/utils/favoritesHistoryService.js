/**
 * favoritesHistoryService.js
 * 
 * This file provides utility functions for managing user favorites and play history
 * in Firebase Firestore. It handles adding, retrieving, and removing items from
 * a user's favorites collection and history collection.
 */

import { firestore } from "../../firebaseConfig";
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, orderBy, limit, serverTimestamp, addDoc } from "firebase/firestore";

/**
 * Add a sound to a user's favorites collection
 * 
 * @param {string} userId - The ID of the current user
 * @param {Object} sound - The sound object to add to favorites
 * @returns {Promise<string>} - The ID of the newly created favorite document
 */
export const addToFavorites = async (userId, sound) => {
  try {
    if (!userId) throw new Error("User must be logged in to add favorites");
    
    // Create a reference to the user's favorites collection
    const favoritesRef = collection(firestore, "users", userId, "favorites");
    
    // Add the sound to the favorites collection with a timestamp
    const favoriteData = {
      ...sound,
      addedAt: serverTimestamp(),
      type: sound.sounds ? "mix" : "sound" // Determine if it's a single sound or a mix
    };
    
    // Add the document and get its ID
    const docRef = await addDoc(favoritesRef, favoriteData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

/**
 * Remove a sound from a user's favorites collection
 * 
 * @param {string} userId - The ID of the current user
 * @param {string} favoriteId - The ID of the favorite document to remove
 * @returns {Promise<void>}
 */
export const removeFromFavorites = async (userId, favoriteId) => {
  try {
    if (!userId) throw new Error("User must be logged in to remove favorites");
    
    // Create a reference to the specific favorite document
    const favoriteRef = doc(firestore, "users", userId, "favorites", favoriteId);
    
    // Delete the document
    await deleteDoc(favoriteRef);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

/**
 * Check if a sound is in a user's favorites
 * 
 * @param {string} userId - The ID of the current user
 * @param {string} soundId - The ID of the sound to check
 * @returns {Promise<{isFavorite: boolean, favoriteId: string|null}>} - Whether the sound is a favorite and its favorite document ID
 */
export const checkIsFavorite = async (userId, soundId) => {
  try {
    if (!userId) return { isFavorite: false, favoriteId: null };
    
    // Get all the user's favorites
    const favoritesRef = collection(firestore, "users", userId, "favorites");
    const favoritesSnapshot = await getDocs(favoritesRef);
    
    // Find the favorite with the matching sound ID
    let favoriteDoc = null;
    favoritesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id === soundId) {
        favoriteDoc = { id: doc.id, ...data };
      }
    });
    
    return {
      isFavorite: !!favoriteDoc,
      favoriteId: favoriteDoc ? favoriteDoc.id : null
    };
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return { isFavorite: false, favoriteId: null };
  }
};

/**
 * Get all favorites for a user
 * 
 * @param {string} userId - The ID of the current user
 * @returns {Promise<Array>} - Array of favorite sound objects
 */
export const getFavorites = async (userId) => {
  try {
    if (!userId) return [];
    
    // Get all the user's favorites, ordered by when they were added
    const favoritesRef = collection(firestore, "users", userId, "favorites");
    const q = query(favoritesRef, orderBy("addedAt", "desc"));
    const favoritesSnapshot = await getDocs(q);
    
    // Convert the snapshot to an array of favorite objects
    const favorites = [];
    favoritesSnapshot.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
    
    return favorites;
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

/**
 * Add a sound to a user's play history
 * 
 * @param {string} userId - The ID of the current user
 * @param {Object} sound - The sound object that was played
 * @returns {Promise<string>} - The ID of the newly created history document
 */
export const addToHistory = async (userId, sound) => {
  try {
    if (!userId) throw new Error("User must be logged in to record history");
    
    // Create a reference to the user's history collection
    const historyRef = collection(firestore, "users", userId, "history");
    
    // Add the sound to the history collection with a timestamp
    const historyData = {
      ...sound,
      playedAt: serverTimestamp(),
      type: sound.sounds ? "mix" : "sound" // Determine if it's a single sound or a mix
    };
    
    // Add the document and get its ID
    const docRef = await addDoc(historyRef, historyData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding to history:", error);
    throw error;
  }
};

/**
 * Get play history for a user
 * 
 * @param {string} userId - The ID of the current user
 * @param {number} limit - Maximum number of history items to retrieve (default: 50)
 * @returns {Promise<Array>} - Array of history sound objects
 */
export const getHistory = async (userId, limitCount = 50) => {
  try {
    if (!userId) return [];
    
    // Get the user's history, ordered by when they were played
    const historyRef = collection(firestore, "users", userId, "history");
    const q = query(historyRef, orderBy("playedAt", "desc"), limit(limitCount));
    const historySnapshot = await getDocs(q);
    
    // Convert the snapshot to an array of history objects
    const history = [];
    historySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });
    
    return history;
  } catch (error) {
    console.error("Error getting history:", error);
    return [];
  }
};

/**
 * Clear all play history for a user
 * 
 * @param {string} userId - The ID of the current user
 * @returns {Promise<void>}
 */
export const clearHistory = async (userId) => {
  try {
    if (!userId) throw new Error("User must be logged in to clear history");
    
    // Get all the user's history items
    const historyRef = collection(firestore, "users", userId, "history");
    const historySnapshot = await getDocs(historyRef);
    
    // Delete each history document
    const deletePromises = [];
    historySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing history:", error);
    throw error;
  }
};
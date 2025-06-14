import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  // Function to fetch user details from Firestore
  const fetchUserDetails = async (uid) => {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // If user is logged in, fetch their details
        await fetchUserDetails(user.uid);
      } else {
        // If user is logged out, clear their details
        setUserDetails(null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Add logout function
  const logout = async () => {
    try {
      await signOut(auth);
      // Auth state change will trigger the onAuthStateChanged listener
      // which will update currentUser and userDetails
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Value object that will be passed to any consuming components
  const value = {
    currentUser,
    userDetails,
    isAuthenticated: !!currentUser,
    isPremium: userDetails?.accountType === 'premium',
    loading,
    logout // Add logout function to the context
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
import axios from "axios";

const API_KEY = "tLcXbkAxkzXBr38eoLyax8qqqjxIeiCXQ9UyLkRt"; // Replace with actual API key
const USER_ID = "G-20250318162239-yAgeSvISxlreyYrGArcA"; // Replace with actual user ID
const BASE_URL = "https://api.asleep.ai/data/v3";

/**
 * Start a new sleep session
 * @returns {Promise<string>} sessionId
 */
export const startSession = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sessions`,
      { timezone: "UTC" },
      {
        headers: {
          "x-api-key": API_KEY,
          "x-user-id": USER_ID,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Session started:", response.data);
    return response.data.result.id; // Returns session ID
  } catch (error) {
    console.error("❌ Error starting session:", error.response?.data || error);
    throw error;
  }
};

/**
 * Upload audio data (MELSPECTROGRAM or WAVEFORM) to the session
 * @param {string} sessionId - The session ID
 * @param {string} audioData - Base64-encoded audio data
 * @param {number} seqNum - Sequence number of the audio chunk
 */
export const uploadAudio = async (sessionId, audioData, seqNum) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sessions/${sessionId}/upload`,
      {
        seq_num: seqNum,
        type: "MELSPECTROGRAM", // or "WAVEFORM"
        data: audioData,
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "x-user-id": USER_ID,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Audio uploaded (seq ${seqNum}):`, response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error uploading audio:", error.response?.data || error);
    throw error;
  }
};

/**
 * End the sleep session
 * @param {string} sessionId - The session ID
 */
export const endSession = async (sessionId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sessions/${sessionId}/end`,
      {},
      {
        headers: {
          "x-api-key": API_KEY,
          "x-user-id": USER_ID,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Session ended:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error ending session:", error.response?.data || error);
    throw error;
  }
};

/**
 * Retrieve session results after analysis
 * @param {string} sessionId - The session ID
 */
export const getSessionResults = async (sessionId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/sessions/${sessionId}`,
      {
        headers: {
          "x-api-key": API_KEY,
          "x-user-id": USER_ID,
        },
      }
    );

    console.log("📊 Sleep Analysis:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching results:", error.response?.data || error);
    throw error;
  }
};

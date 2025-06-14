import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { startSession, uploadAudio, endSession, getSessionResults } from "../../utils/asleepApi";
import { startRecording, stopRecording } from "../../utils/audioRecorder";

const Tracker = () => {
  const [sessionId, setSessionId] = useState(null);
  const [recording, setRecording] = useState(null);
  const [seqNum, setSeqNum] = useState(1);

  const handleStartSession = async () => {
    const id = await startSession();
    setSessionId(id);
  };

  const handleStartRecording = async () => {
    const rec = await startRecording();
    setRecording(rec);
  };

  const handleStopRecording = async () => {
    if (!recording || !sessionId) return;
    const audioData = await stopRecording(recording);
    await uploadAudio(sessionId, audioData, seqNum);
    setSeqNum(seqNum + 1);
  };

  const handleEndSession = async () => {
    await endSession(sessionId);
    const results = await getSessionResults(sessionId);
    console.log("📊 Final Sleep Analysis:", results);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
      <View style={{ backgroundColor: "#232946", borderRadius: 16, paddingVertical: 24, paddingHorizontal: 32, marginBottom: 30, alignItems: "center", shadowColor: "#00AEEF", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 8 }}>
        <Text style={{ color: "#00AEEF", fontSize: 28, fontWeight: "bold", marginBottom: 8, letterSpacing: 2 }}>
          Coming Soon
        </Text>
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center", opacity: 0.8 }}>
          Sleep Tracker will be available in a future update. Stay tuned!
        </Text>
      </View>
      {/* <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>Sleep Tracker</Text>
      <Button title="Start Session" onPress={handleStartSession} />
      <Button title="Start Recording" onPress={handleStartRecording} />
      <Button title="Stop Recording & Upload" onPress={handleStopRecording} />
      <Button title="End Session & Get Results" onPress={handleEndSession} /> */}
    </View>
  );
};

export default Tracker;

import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";

function Bubble({ onPop }) {
  const [popped, setPopped] = useState(false);

  const playPopSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require("../assets/popSound.mp3"));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handlePress = () => {
    if (!popped) {
      setPopped(true);
      playPopSound();
      onPop();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={popped ? styles.poppedBubble : styles.bubble}
    >
      {popped && <Text style={styles.text}>pop!</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#218b82",
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  poppedBubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "transparent",
    margin: 5,
    borderWidth: 2,
    borderColor: "#218b82",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#218b82",
    fontSize: 12,
    fontWeight: "bold"
  }
});

export default Bubble;

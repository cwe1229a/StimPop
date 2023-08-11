import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Image, Button } from "react-native";
import Bubble from "./components/Bubble";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const BUBBLE_SIZE = 50;
const BUBBLE_MARGIN = 5;
const BUBBLES_PER_ROW = Math.floor(width / (BUBBLE_SIZE + 2 * BUBBLE_MARGIN));
const BUBBLE_ROWS = Math.floor(height / (BUBBLE_SIZE + 2 * BUBBLE_MARGIN));
const TOTAL_BUBBLES = BUBBLES_PER_ROW * BUBBLE_ROWS;

export default function App() {
  const [poppedCount, setPoppedCount] = useState(0);

  const handleBubblePop = () => {
    setPoppedCount(poppedCount + 1);
  };

  const handleReset = () => {
    setPoppedCount(0);
  };

  return (
    <LinearGradient colors={["#e5dbd9", "#eb96aa"]} style={styles.container}>
      {poppedCount === TOTAL_BUBBLES ? (
        <View style={styles.endScreen}>
          <Image
            source={require("./assets/allPopped.png")}
            style={styles.image}
          />
          <Button title='Pop Again!' onPress={handleReset} />
        </View>
      ) : (
        Array.from({ length: TOTAL_BUBBLES }).map((_, index) => (
          <Bubble key={index} onPop={handleBubblePop} />
        ))
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: BUBBLE_SIZE + 2 * BUBBLE_MARGIN
  },
  endScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain"
  }
});

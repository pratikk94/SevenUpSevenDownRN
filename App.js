import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";

const diceImages = {
  1: require("./assets/1.png"),
  2: require("./assets/2.png"),
  3: require("./assets/3.png"),
  4: require("./assets/4.png"),
  5: require("./assets/5.png"),
  6: require("./assets/6.png"),
};

const App = () => {
  const [diceSum, setDiceSum] = useState(0);
  const [score, setScore] = useState(0);
  const [diceFaces, setDiceFaces] = useState({
    die1: diceImages[1],
    die2: diceImages[1],
  });

  const rollDice = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const sum = die1 + die2;
    setDiceSum(sum);
    setDiceFaces({
      die1: diceImages[die1],
      die2: diceImages[die2],
    });
    return sum;
  };

  const handleGuess = (userGuess) => {
    const sum = rollDice();
    const isCorrect =
      (sum < 7 && userGuess === "down") ||
      (sum === 7 && userGuess === "seven") ||
      (sum > 7 && userGuess === "up");

    if (isCorrect) {
      setScore(score + 10);
    } else {
      setScore(score - 5);
    }

    Alert.alert(
      "Dice Roll",
      `You guessed ${userGuess}. Dice sum is ${sum}. You ${
        isCorrect ? "win" : "lose"
      }!`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>7 Up 7 Down Game</Text>
      <View style={styles.diceContainer}>
        <Image source={diceFaces.die1} style={styles.dice} />
        <Image source={diceFaces.die2} style={styles.dice} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Down (<7)" onPress={() => handleGuess("down")} />
        <Button title="Seven (=7)" onPress={() => handleGuess("seven")} />
        <Button title="Up (>7)" onPress={() => handleGuess("up")} />
      </View>
      <Text style={styles.result}>Last dice sum: {diceSum}</Text>
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  diceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  dice: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default App;

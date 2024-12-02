import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import Icon from './components/Icon';
import Snackbar from 'react-native-snackbar';

// constants
const empty = 'empty'
const circle = 'cicle'
const cross = 'cross'
const defIcon = 'pencil'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {getVersion} from 'jest';

function App(): React.JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkGameWinner = () => {
    //row check
    if (
      gameState[0] != empty &&
      gameState[0] == gameState[1] &&
      gameState[1] == gameState[2]
    ) {
      setGameWinner(`${gameState[0]} has won the game 👿️!!`);
    } else if (
      gameState[3] != empty &&
      gameState[3] == gameState[4] &&
      gameState[4] == gameState[5]
    ) {
      setGameWinner(`${gameState[3]} has won the game 👿️!!`);
    } else if (
      gameState[6] != empty &&
      gameState[6] == gameState[7] &&
      gameState[7] == gameState[8]
    ) {
      setGameWinner(`${gameState[6]} has won the game 👿️!!`);
    } else if (
      //column check
      gameState[0] != empty &&
      gameState[0] == gameState[3] &&
      gameState[3] == gameState[6]
    ) {
      setGameWinner(`${gameState[0]} has won the game 👿️!!`);
    } else if (
      gameState[1] != empty &&
      gameState[1] == gameState[4] &&
      gameState[4] == gameState[7]
    ) {
      setGameWinner(`${gameState[1]} has won the game 👿️!!`);
    } else if (
      gameState[2] != empty &&
      gameState[2] == gameState[5] &&
      gameState[5] == gameState[8]
    ) {
      setGameWinner(`${gameState[2]} has won the game 👿️!!`);
    } else if (
      //checking dialonally
      gameState[0] != empty &&
      gameState[0] == gameState[4] &&
      gameState[4] == gameState[8]
    ) {
      setGameWinner(`${gameState[0]} has won the game 👿️!!`);
    } else if (
      gameState[2] != empty &&
      gameState[2] == gameState[4] &&
      gameState[4] == gameState[6]
    ) {
      setGameWinner(`${gameState[2]} has won the game 👿️!!`)
    } else if(
      //draw case
      !gameState.includes(empty, 0)
    ) {
        setGameWinner(`Game draw....⏳️`)
    }
  };

  const onItemChanged = (index: number) =>  {
    if(gameWinner) {
      return Snackbar.show({
        text: gameWinner, 
        textColor: '#', 
        backgroundColor: '#'
      })
    }
    if(gameState[index] === empty) {
      gameState[index] = isCross ? cross : circle
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: 'No allowed', 
        textColor: '#ffffff', 
        backgroundColor: '#F04A00'
      })
    }
    checkGameWinner()
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Text style={[styles.textWhite, styles.headingTxt]}>Tic-Tac-Toe</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textWhite: {
    padding: 8,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headingTxt: {
    fontSize: 24,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

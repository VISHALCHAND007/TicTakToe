import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import Icon from './components/Icon';
import Snackbar from 'react-native-snackbar';

// constants
const empty = 'empty';
const circle = 'circle';
const cross = 'cross';
const defIcon = 'pencil';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

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
      setGameWinner(`${gameState[2]} has won the game 👿️!!`);
    } else if (
      //draw case
      !gameState.includes(empty, 0)
    ) {
      setGameWinner(`Game draw....⏳️`);
    }
  };

  const onItemChanged = (index: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        textColor: '#',
        backgroundColor: '#',
      });
    }
    if (gameState[index] === empty) {
      gameState[index] = isCross ? cross : circle;
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Not allowed',
        textColor: '#ffffff',
        backgroundColor: '#F04A00',
      });
    }
    checkGameWinner();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? '❌️' : '⭕️'}'s turn
          </Text>
        </View>
      )}
      {/* Game grid */}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => {
              onItemChanged(index);
            }}>
            <Icon name={item} />
          </Pressable>
        )}
      />
      {/* Game action */}
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload-Game'}
        </Text>
      </Pressable>
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
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  // container: {
  //   flexDirection: 'column',
  //   // alignItems: 'center',
  //   justifyContent: 'space-around'
  // }
});

export default App;

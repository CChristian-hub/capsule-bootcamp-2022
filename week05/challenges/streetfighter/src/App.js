import React, { useState } from 'react';
import './App.css';

function App() {
  var playerList1 = []
  var playerList2 = []
  const imgListTiny = [
    "/images/players/tiny/ryu.jpg",
    "/images/players/tiny/honda.jpg",
    "/images/players/tiny/blanka.jpg",
    "/images/players/tiny/guile.jpg",
    "/images/players/tiny/ken.jpg",
    "/images/players/tiny/chun-li.jpg",
    "/images/players/tiny/zangief.jpg",
    "/images/players/tiny/dhalsim.jpg",
  ]
  const imgListLarge = [
    "/images/players/large/ryu.jpg",
    "/images/players/large/honda.jpg",
    "/images/players/large/blanka.jpg",
    "/images/players/large/guile.jpg",
    "/images/players/large/ken.jpg",
    "/images/players/large/chun-li.jpg",
    "/images/players/large/zangief.jpg",
    "/images/players/large/dhalsim.jpg",
  ]

  const [currentPlayer, setcurrentPlayer] = useState(1)
  const [playerOneSelected, setplayerOneSelected] = useState(null)
  const [playerTwoSelected, setplayerTwoSelected] = useState(null)

  var playerSelected = (name) => {
    if (currentPlayer === 1) {
      setcurrentPlayer(2)
      setplayerOneSelected(name)
    } else {
      if (currentPlayer === 2) {
        setcurrentPlayer(1)
        setplayerTwoSelected(name)
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    playerList1.push(<img key={i} index={i} onClick={() => playerSelected(imgListLarge[i])} style={{ width: '100%' }} src={imgListTiny[i]} alt="character pic" />)
    playerList2.push(<img key={i} index={i + 4} onClick={() => playerSelected(imgListLarge[i + 4])} style={{ width: '100%' }} src={imgListTiny[i + 4]} alt="character pic" />)
  }

  var playerOne;
  if (playerOneSelected) {
    playerOne = <Player name={playerOneSelected} player="/images/1p.jpg" />
    var index = imgListLarge.indexOf(playerOneSelected);
    if (index > 3) {
      playerList2[index - 4] = <PlayerPicto key={index - 4} index={index - 4} onClick={() => playerSelected(playerOneSelected)} style={{ width: '100%' }} name={imgListTiny[index]} player="/images/1p-select.png" alt="character pic" />
    } else {
      playerList1[index] = <PlayerPicto key={index} index={index} onClick={() => playerSelected(playerOneSelected)} style={{ width: '100%' }} name={imgListTiny[index]} player="/images/1p-select.png" alt="character pic" />
    }
  }

  var playerTwo;
  if (playerTwoSelected) {
    playerTwo = <Player name={playerTwoSelected} player="/images/2p.jpg" />
    var pos = imgListLarge.indexOf(playerTwoSelected);
    if (pos > 3) {
      playerList2[pos - 4] = <PlayerPicto key={pos - 4} index={pos - 4} onClick={() => playerSelected(playerOneSelected)} style={{ width: '100%' }} name={imgListTiny[pos]} player="/images/2p-select.png" alt="character pic" />
    } else {
      playerList1[pos] = <PlayerPicto key={pos} index={pos} onClick={() => playerSelected(playerOneSelected)} style={{ width: '100%' }} name={imgListTiny[pos]} player="/images/2p-select.png" alt="character pic" />
    }
  }

  return (
    <div style={{ backgroundColor: '#000069', marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '200px' }}>
        {playerOne}
      </div>
      <div style={{ width: '200px', marginLeft: '50px', marginRight: '50px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img style={{ width: '100%', paddingBottom: '50px' }} src="./images/player-select.jpg" alt='Player select' />

        <div style={{ cursor: 'pointer', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: '53px' }}>
            {playerList1}
          </div>
          <div style={{ display: 'flex', height: '53px' }}>
            {playerList2}
          </div>
        </div>
      </div>
      <div style={{ width: '200px' }}>
        {playerTwo}
      </div>
    </div>
  );
}

function PlayerPicto(props) {
  // const [selected, setselected] = useState(null)
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <img style={{ width: '101%', position: 'absolute', top: '-5px' }} src={props.player} alt="playerlogo" />
      <img style={{ width: '100%' }} src={props.name} alt="characterlogo" />
    </div>
  );
}

function Player(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <img style={{ width: '40%' }} src={props.player} alt="playerimg" />
      <img style={{ width: '100%' }} src={props.name} alt="playerchar" />
    </div>

  );
}

export default App;

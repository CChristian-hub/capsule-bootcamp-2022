import './App.css';
import { Yams } from './components/Dice'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, List, Table } from 'reactstrap';
import React, { useState, useEffect } from 'react';

function App() {

  var tab1 = [
    { index: 0, container: 'AS', points: 0, isClicked: false },
    { index: 1, container: 'DEUX', points: 0, isClicked: false },
    { index: 2, container: 'TROIS', points: 0, isClicked: false },
    { index: 3, container: 'QUATRE', points: 0, isClicked: false },
    { index: 4, container: 'CINQ', points: 0, isClicked: false },
    { index: 5, container: 'SIX', points: 0, isClicked: false },
    { index: 6, container: 'Total:', points: 0, isClicked: true },
    { index: 7, container: 'Bonus', points: 0, isClicked: true },
    { index: 8, container: 'Total 1:', points: 0, isClicked: true },
  ]
  var tab2 = [
    { index: 0, container: 'Plus', points: 0, isClicked: false },
    { index: 1, container: 'Minus', points: 0, isClicked: false },
    { index: 2, container: 'Total 2:', points: 0, isClicked: true },
  ]
  var tab3 = [
    { index: 0, container: 'Suite', points: 0, isClicked: false },
    { index: 1, container: 'Full', points: 0, isClicked: false },
    { index: 2, container: 'Carré', points: 0, isClicked: false },
    { index: 3, container: 'Yam', points: 0, isClicked: false },
    { index: 4, container: 'Total 3:', points: 0, isClicked: true },
    { index: 5, container: 'Total 1,2,3:', points: 0, isClicked: true },
  ]

  const [tableOne, setTableOne] = useState([])
  const [tableTwo, setTableTwo] = useState([])
  const [tableThree, setTableThree] = useState([])


  useEffect(() => {
    setTableOne(tab1)
    setTableTwo(tab2)
    setTableThree(tab3)
  }, []);


  var dicesTab = [
    { id: 1, value: '', isSelected: false },
    { id: 2, value: '', isSelected: false },
    { id: 3, value: '', isSelected: false },
    { id: 4, value: '', isSelected: false },
    { id: 5, value: '', isSelected: false },
  ]

  const [dices, setDices] = useState(dicesTab)
  const [numberOfRolls, setNumberOfRolls] = useState(0)

  const generateDices = () => {
    for (var k = 0; k < dicesTab.length; k++) {
      if (dices[k].isSelected) {
        dicesTab[k] = dices[k]
      } else {
        dicesTab[k].value = Math.floor((Math.random() * 6) + 1)
      }
    }
    setDices(dicesTab)
    setNumberOfRolls(numberOfRolls + 1)
  }

  const diceSelectorParent = (index) => {
    var temp = [];
    for (var j = 0; j < dices.length; j++) {
      if (j === index) {
        temp.push({ id: dices[j].id, value: dices[j].value, isSelected: !dices[j].isSelected })
      } else {
        temp.push(dices[j]);
      }
    }
    setDices(temp)
  }

  //! Working here

  const tabOneHandler = (index) => {
    var temp = [...tableOne];
    if (temp[index].isClicked === true) {
      return;
    }
    var sumDices = 0;
    for (const elem of dices) {
      sumDices += elem.value;
    }
    temp[index].points = sumDices
    temp[index].isClicked = true;
    setTableOne(temp)
  }

  const tabTwoHandler = (index) => {
    var temp = [...tableTwo];
    if (temp[index].isClicked === true) {
      return;
    }
    var sumDices = 0;
    for (const elem of dices) {
      sumDices += elem.value;
    }
    temp[index].points = sumDices
    temp[index].isClicked = true;
    setTableTwo(temp)
  }

  const tabThreeHandler = (index) => {
    var temp = [...tableThree];
    if (temp[index].isClicked === true) {
      return;
    }
    var sumDices = 0;
    for (const elem of dices) {
      sumDices += elem.value;
    }
    temp[index].points = sumDices
    temp[index].isClicked = true;
    setTableThree(temp)
  }

  var totalDice = 0
  var tabDiceDisp = []

  for (let i = 0; i < dices.length; i++) {
    tabDiceDisp.push(
      <Yams key={i} index={i} diceSelector={diceSelectorParent} value={dices[i].value} selected={dices[i].isSelected} />
    )
    totalDice += dices[i].value
  }

  var msgStyle = {
    display: 'none'
  }
  if (totalDice === 30) {
    msgStyle = {}
  }

  //!Part 5 begin
  var tabDisp1 = tableOne.map((elem, i) => {
    var tempStyle = {}
    if (!elem.isClicked) tempStyle = { cursor: 'pointer' }
    return (
      <tr key={i}>
        <th scope="row">
          {elem.container}
        </th>
        <td style={tempStyle} onClick={() => tabOneHandler(elem.index)}>
          {elem.points}
        </td>
      </tr>
    )
  })

  var tabDisp2 = tableTwo.map((elem, i) => {
    var tempStyle = {}
    if (!elem.isClicked) tempStyle = { cursor: 'pointer' }
    return (
      <tr key={i}>
        <th scope="row">
          {elem.container}
        </th>
        <td style={tempStyle} onClick={() => tabTwoHandler(elem.index)}>
          {elem.points}
        </td>
      </tr>
    )
  })

  var tabDisp3 = tableThree.map((elem, i) => {
    var tempStyle = {}
    if (!elem.isClicked) tempStyle = { cursor: 'pointer' }
    return (
      <tr key={i}>
        <th scope="row">
          {elem.container}
        </th>
        <td style={tempStyle} onClick={() => tabThreeHandler(elem.index)}>
          {elem.points}
        </td>
      </tr>
    )
  })












  const tabStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25
  }




  return (
    <div className="App">
      <Button onClick={() => generateDices()}>Roll dices</Button>
      <p>Total dices: {totalDice}</p>
      <p>Number of rolls: {numberOfRolls}</p>
      <span className='myContainer'>
        {tabDiceDisp}
      </span>
      <h1 style={msgStyle} >Bravo</h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
      }}>

        <List type="inline" style={tabStyle}>
          <Table bordered>
            <thead>
              <tr>
                <th>Combination</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {tabDisp1}
            </tbody>
          </Table>
        </List >

        <List type="inline" style={tabStyle}>
          <Table bordered>
            <thead>
              <tr>
                <th>Combination</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {tabDisp2}
            </tbody>
          </Table>
        </List >

        <List type="inline" style={tabStyle}>
          <Table bordered>
            <thead>
              <tr>
                <th>Combination</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {tabDisp3}
            </tbody>
          </Table>
        </List >
      </div>

    </div >
  );
}

export default App;

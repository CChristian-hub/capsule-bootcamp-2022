import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';

function App() {
  const [ballPosition, setBallPosition] = useState(null)

  var greenHandler = (index) => {
    if (index === 3 || index === 4) {
      if (ballPosition === 3 || ballPosition === 4) {
        setBallPosition(Math.floor(Math.random() * (8 - 5 + 1) + 5))
      }
    }
    if (index === 5 || index === 6) {
      if (ballPosition === 5 || ballPosition === 6) {
        setBallPosition(Math.floor(Math.random() * (4 - 1 + 1) + 1))
      }
    }
  }

  var whiteHandler = (index) => {
    if (index === 1 || index === 2) {
      if (ballPosition === null) {
        setBallPosition(Math.floor(Math.random() * (8 - 5 + 1) + 5))
      } else {
        if (ballPosition === 1 || ballPosition === 2) {
          setBallPosition(Math.floor(Math.random() * (8 - 5 + 1) + 5))
        }
      }
    }
    if (index === 7 || index === 8) {
      if (ballPosition === null) {
        setBallPosition(Math.floor(Math.random() * (4 - 1 + 1) + 1))
      } else {
        if (ballPosition === 7 || ballPosition === 8) {
          setBallPosition(Math.floor(Math.random() * (4 - 1 + 1) + 1))
        }
      }
    }
  }

  var styleArray = [];
  var invisible = { display: 'none' }
  var visible = { height: '40px' }
  for (var i = 1; i < 9; i++) {
    if (ballPosition !== i) {
      styleArray.push(invisible);
    } else {
      styleArray.push(visible);
    }
  }
  var playerOne = { display: 'none' }
  var playerTwo = { display: 'none' }
  var statusStyle = { display: 'none' }

  if (ballPosition === 1 || ballPosition === 2 || ballPosition === 7 || ballPosition === 8) {
    if (ballPosition === 1 || ballPosition === 2) {
      playerOne = {}
    }
    if (ballPosition === 7 || ballPosition === 8) {
      playerTwo = {}
    }
    statusStyle = {}
  }

  return (
    <div className="App">
      <h1 style={statusStyle}>PERDU</h1>
      <h1 style={playerOne}>VAINQUEUR JOUEUR 1</h1>
      <h1 style={playerTwo}>VAINQUEUR JOUEUR 2</h1>
      <Container className="App">
        <Row className="row">
          <Col className="outside" onClick={() => whiteHandler(1)}><img src="/logo192.png" style={styleArray[0]} alt="Logo" /></Col>
          <Col className="board" onClick={() => greenHandler(3)}><img src="/logo192.png" style={styleArray[2]} alt="Logo" /></Col>
          <Col className="board" onClick={() => greenHandler(5)}><img src="/logo192.png" style={styleArray[4]} alt="Logo" /></Col>
          <Col className="outside" onClick={() => whiteHandler(7)}><img src="/logo192.png" style={styleArray[6]} alt="Logo" /></Col>
        </Row>
        <Row className="row">
          <Col className="outside" onClick={() => whiteHandler(2)}><img src="/logo192.png" style={styleArray[1]} alt="Logo" /></Col>
          <Col className="board" onClick={() => greenHandler(4)}><img src="/logo192.png" style={styleArray[3]} alt="Logo" /></Col>
          <Col className="board" onClick={() => greenHandler(6)}><img src="/logo192.png" style={styleArray[5]} alt="Logo" /></Col>
          <Col className="outside" onClick={() => whiteHandler(8)}><img src="/logo192.png" style={styleArray[7]} alt="Logo" /></Col>
        </Row>
      </Container>
    </div >
  )
}

export default App;

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function ScreenHome(props) {
  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');

  const [emailSignIn, setEmailSignIn] = useState('')
  const [passwordSignIn, setPasswordSignIn] = useState('')

  const [isLogin, setIsLogin] = useState(false);

  const [messagesSignIn, setMessagesSignIn] = useState('')
  const [messagesSignUp, setMessagesSignUp] = useState('')

  const handleSubmitSignIn = async (email, password) => {
    let rawData = await fetch(`/sign-in?email=${email}&password=${password}`)
    let temp = await rawData.json()
    if (temp.result) {
      props.onConnectionSuccess(temp.token)
      setIsLogin(true)
      setMessagesSignIn([])
      cookies.set('token', temp.token, { path: '/' })
      console.log(cookies.get('token'))
    } else {
      setIsLogin(false)
      setMessagesSignIn(temp.messages)
    }
  }

  const handleSubmitSignUp = async (username, email, password) => {
    let rawData = await fetch('/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${username}&email=${email}&password=${password}`
    })
    let temp = await rawData.json()
    if (temp.result) {
      setIsLogin(true)
      setMessagesSignUp([])
      props.onConnectionSuccess(temp.token)
      cookies.set('token', temp.token, { path: '/' })
      console.log(cookies.get('token'))
    } else {
      setIsLogin(false)
      setMessagesSignUp(temp.messages)
    }
  }

  if (isLogin) {
    return (<Redirect to='/screensource' />);
  }


  //! Error messages display in arrays
  var msgSignUp = [];
  var msgSignIn = [];

  for (let i = 0; i < messagesSignUp.length; i++) {
    msgSignUp.push(
      <p style={{ color: 'red' }} key={i}>{messagesSignUp[i]}</p>
    )
  }
  for (let i = 0; i < messagesSignIn.length; i++) {
    msgSignIn.push(
      <p style={{ color: 'red' }} key={i}>{messagesSignIn[i]}</p>
    )
  }


  return (
    <div className="Login-page" >
      {/* SIGN-IN */}

      <div className="Sign">
        {msgSignIn}
        <Input className="Login-input" onChange={(e) => setEmailSignIn(e.target.value)} value={emailSignIn} placeholder="email" />
        <Input.Password className="Login-input" onChange={(e) => setPasswordSignIn(e.target.value)} value={passwordSignIn} placeholder="password" />
        <Button style={{ width: '80px' }} onClick={() => handleSubmitSignIn(emailSignIn, passwordSignIn)} type="primary">Sign-in</Button>
      </div>

      {/* SIGN-UP */}
      <div className="Sign">
        {msgSignUp}
        <Input className="Login-input" onChange={(e) => setUsernameSignUp(e.target.value)} value={usernameSignUp} placeholder="username" />
        <Input className="Login-input" onChange={(e) => setEmailSignUp(e.target.value)} value={emailSignUp} placeholder="email" />
        <Input.Password className="Login-input" onChange={(e) => setPasswordSignUp(e.target.value)} value={passwordSignUp} placeholder="password" />
        <Button style={{ width: '80px' }} onClick={() => handleSubmitSignUp(usernameSignUp, emailSignUp, passwordSignUp)} type="primary">Sign-up</Button>
      </div>
    </div>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onConnectionSuccess: function (token) {
      dispatch({ type: 'setToken', token })
    }
  }
}

export default connect(null, mapDispatchToProps)(ScreenHome);

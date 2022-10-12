import './App.scss';
import React from 'react';
import Nav from './components/Nav';
import Header from './components/Header'
import Main from './components/Main';
import { setUserToken, clearUserToken } from './utils/authToken'
import { useState } from 'react'

function App() {
  const [login, setLogin] = useState({"username":" ", "password":" "})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }

      const newUser = await fetch(
        "https://perfume-store-fm.herokuapp.com/register",configs
      )
      // console.log(newUser)
      const parsedUser = await newUser.json()
      // console.log(parsedUser)

      // sets local storage
      setUserToken(parsedUser.token)
      // put the returned user object in state
      // setCurrentUser(parsedUser.currentUser)
      // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.loggedIn)

      // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
      // this would also require reconfiguring our backend so we only send tokens with a signup

      return parsedUser
    } catch (err) {
      console.log(err)
      clearUserToken();
      setIsAuthenticated(false);
    }
  }

  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(
        "http://localhost:4000/auth/login",
        configs
      )
      const user = await response.json()
      //console.log(user)

      // sets local storage
      setUserToken(user.token)
      // put the returned user object in state
      setCurrentUser(user.currentUser)
      // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(user.loggedIn)

      return user
    } catch (err) {
      clearUserToken()
      setIsAuthenticated(false)
    }
  }

  return (
    <div className="App">
      <Nav />
      <Header/>
      <Main isLoggedIn={isAuthenticated} signup={registerUser}  />
      
      
    </div>
  )
}

export default App;

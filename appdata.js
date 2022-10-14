// import Nav from './components/Nav';
// import Header from './components/Header'
import { setUserToken, clearUserToken } from './utils/authToken'
import { useState } from 'react'
const [currentUser, setCurrentUser]  = useState({ "username": " ", "password": " " })
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
        "https://perfume-store-fm.herokuapp.com/register", configs  //!check endpoint, cannot GET
      )
      
      const parsedUser = await newUser.json()
      
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


  <Main isLoggedIn={isAuthenticated} signup={registerUser} />



  import { Route, Routes } from "react-router-dom";

import Register from "../pages/Register"
import Login from "../pages/Login"
import Perfumes from "../pages/Perfumes"


const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Perfumes />} />
            </Routes>
        </main>
    )
}

export default Main;



                //    <Card>
                //           <Card.Img variant="top" src={perfume.image} alt={perfume.name} />
                //           <Card.Body>
                //             <Card.Title style={{textAlign:"center"}}>{perfume.brand}</Card.Title>
                           
                //             <Card.Text style={{textAlign:"left"}}>
                //               {perfume.name}
                //             </Card.Text>
                           
                           
                //           </Card.Body>
                //         </Card>
                // <section style="background-color: #eee;">
                //       <div style="background-color: #eee;">
                //    <div class="container py-5">
                //      <div class="row justify-content-center">
                //        <div class="col-md-8 col-lg-6 col-xl-4">
                //          <div class="card text-black">
                           
                //            <img src={perfume.image} alt={perfume.name} class="card-img-top"/>
                //            <div class="card-body">
                //              <div class="text-center">
                //                <h5 class="card-title">{perfume.name}</h5>
                //                <p class="text-muted mb-4">Apple pro display XDR</p>
                //              </div>
                //              <div>
                //                <div class="d-flex justify-content-between">
                //                  <span>Pro Display XDR</span><span>$5,999</span>
                //                </div>
                //                <div class="d-flex justify-content-between">
                //                  <span>Pro stand</span><span>$999</span>
//                                </div>
//                                <div class="d-flex justify-content-between">
//                                  <span>Vesa Mount Adapter</span><span>$199</span>
//                                </div>
//                              </div>
//                              <div class="d-flex justify-content-between total font-weight-bold mt-4">
//                                <span>Total</span><span>$7,197.00</span>
//                              </div>
//                            </div>
//                          </div>
//                        </div>
//                      </div>
//                    </div>
//                 //    </div> 
// </div>
// </section>  
{/* 

// <div className="card" >
//     <Link to={`/${perfume.id}`} key={perfume.id}>

//         <h1>{perfume.name}</h1>

//     </Link>
//     <h3>${perfume.price} USD</h3>

//     <div className="card-image">
//         <img src={perfume.image} alt={perfume.name} />

// 
//     </div>
// </div> */}

                // )})})

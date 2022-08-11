import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginPage} from "./components/Login/LoginPage";
import {Navbar} from "../src/components/Navbar/Navbar"
import {UsersPage} from "./components/UsersPage/UsersPage";

function App() {
  return (
      <>

      <BrowserRouter>
          <Navbar/>
    <Routes>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/"} element={<UsersPage/>}/>
    </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;

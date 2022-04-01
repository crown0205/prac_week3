import './App.css';
import React from 'react';

import { BrowserRouter, Route } from "react-router-dom";
import PostList from '../pages/PostList';
import Signup from "../pages/Signup"
import Login from "../pages/Login"

import Header from '../components/Header';
import {Grid} from "../elements/index"

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Grid>
          <Header></Header>
          <Route path='/' exact component={PostList}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          </Grid>
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

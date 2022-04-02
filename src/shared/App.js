import './App.css';
import React from 'react';

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import PostList from '../pages/PostList';
import Signup from "../pages/Signup"
import Login from "../pages/Login"

import Header from '../components/Header';
import {Grid} from "../elements/index"

function App() {
  return (
    <React.Fragment>
        <ConnectedRouter history={history}>
          <Grid>
          <Header></Header>
          <Route path='/' exact component={PostList}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          </Grid>
        </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;

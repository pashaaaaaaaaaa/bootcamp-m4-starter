import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';

import './reset.css';
import './common.css';

class App extends React.Component {
  state={
    key:''
  }
  functionCallBack=(element)=>{
      this.setState({
        key:element
      })
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact ><MainPage functionCallBack={this.functionCallBack}/></Route>
        <Route path="/list" exact ><ListPage newKey={this.state.key}/></Route> 
        
      </div>
    );
  }
}

export default App;

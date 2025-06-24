import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import { News } from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  size =15;
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      />
          <Routes>
            <Route exact path="/" element={<News   setProgress={this.setProgress}     key="ngeneral" size={this.size} country="us" category="general" />} />
            <Route exact path="/about" element={<News   setProgress={this.setProgress}   key="general" size={this.size} country="us" category="general" />} />
            <Route exact path="/business" element={<News   setProgress={this.setProgress}   key="business" size={this.size} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News   setProgress={this.setProgress}   key="entertainment" size={this.size} country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News   setProgress={this.setProgress}   key="general" size={this.size} country="us" category="general" />} />
            <Route exact path="/health" element={<News   setProgress={this.setProgress}   key="health" size={this.size} country="us" category="health" />} />
            <Route exact path="/science" element={<News   setProgress={this.setProgress}   key="science" size={this.size} country="us" category="science" />} />
            <Route exact path="/sports" element={<News   setProgress={this.setProgress}   key="sports" size={this.size} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News   setProgress={this.setProgress}   key="technology" size={this.size} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}



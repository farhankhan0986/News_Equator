import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News  from './Components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


const App =()=> {
  const [progress, setProgress] = useState(0);

  const size =15;

    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color="#f11946"
        progress={progress}
      />
          <Routes>
            <Route exact path="/" element={<News   setProgress={setProgress} key="ngeneral" size={size} country="us" category="general" />} />
            <Route exact path="/about" element={<News   setProgress={setProgress}   key="general" size={size} country="us" category="general" />} />
            <Route exact path="/business" element={<News   setProgress={setProgress}   key="business" size={size} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News   setProgress={setProgress}   key="entertainment" size={size} country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News   setProgress={setProgress}   key="general" size={size} country="us" category="general" />} />
            <Route exact path="/health" element={<News   setProgress={setProgress}   key="health" size={size} country="us" category="health" />} />
            <Route exact path="/science" element={<News   setProgress={setProgress}   key="science" size={size} country="us" category="science" />} />
            <Route exact path="/sports" element={<News   setProgress={setProgress}   key="sports" size={size} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News   setProgress={setProgress}   key="technology" size={size} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  
}


export default App;
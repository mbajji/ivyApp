import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from 'react-bootstrap/Button';
import dino from './dino.png';
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyBT9Yl_ySuvkitYaKkI9H3GtQvqaLDlTZM');

async function run(setMyAnxienty) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "I am feeling stressed. Give me one simple task to help me calm down please. I have already tried deep breaths. Please summarize into 2/3 small sentences pelase"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  setMyAnxienty(text);
}

function App() {
  const [myAnxiety, setMyAnxienty] = useState(null);
  const [ivy, setIvy] = useState('It\'s Ok Dino Ivy Is here to help (click on me after you are done with the task):');

  const handleClick = async () => {
    await run(setMyAnxienty);
  };

  const removetext = async () => {
    setIvy('Still feeling stressed click on the button again for Dino Ivy to help you out' );
    setMyAnxienty();
  };


  return (
    <div className="App">
      <header className="App-header">
        
        <h1>
          Feeling Stressed or Anxious?
        </h1>
        <Button variant="primary" className="large-button" size="lg" onClick={handleClick} style={{ fontSize: '35px', backgroundColor: 'lightgreen' }}>
         Ask Ivy</Button>
      
      {myAnxiety && 
      (
        <div>
          <h3>{ivy}</h3>
          <h4 className='myHelp'>{myAnxiety}</h4>
          
        </div>
      )
      }
      <img src={dino} alt="Ivy" onClick={removetext}/>


</header>
    </div>
  );
}

export default App;

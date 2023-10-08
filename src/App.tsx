import React from 'react';
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Lobby from "./Components/Lobby/Lobby";
import WelcomePage from "./Components/WelcomePage/WelcomePage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/lobby" element={<Lobby/>}/>
                <Route path="/" element={<WelcomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

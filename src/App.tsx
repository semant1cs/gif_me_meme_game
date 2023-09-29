import React from 'react';
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Lobby from "./Components/Lobby/Lobby";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Lobby/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

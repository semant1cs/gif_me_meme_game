import React from 'react';
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Routes/AppRouter";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRouter/>

        </BrowserRouter>
    );
};

export default App;

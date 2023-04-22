import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./components/routes/AppRoute";
import Header from "./components/header/Header";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <AppRoute/>
        </BrowserRouter>
    );
};

export default App;
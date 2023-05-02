import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./components/routes/AppRoute";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <main className="main">
                <AppRoute/>
            </main>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;
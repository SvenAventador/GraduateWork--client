import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import CartStore from "./store/CartStore";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BrandStore from "./store/BrandStore";

import './styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null)

root.render(
    <Context.Provider value = {
        {
            cart: new CartStore(),
            user: new UserStore(),
            device: new DeviceStore(),
            type: new DeviceStore(),
            brand: new BrandStore()
        }
    }>
        <div className="container">
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </div>
    </Context.Provider>
);


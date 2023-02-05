import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LocalStore from './modules/LocalStore';
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        LocalStore: new LocalStore(),
    }}>
        <App />
    </Context.Provider>   
)
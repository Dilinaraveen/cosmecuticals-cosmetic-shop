import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
//setup store
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

// store to persit
const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>
);


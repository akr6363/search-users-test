import './styles/index.scss'
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
);

import { StatusBar } from "expo-status-bar";
import Router from "./router";
import Theme from "./theme";

function App() {
    return (
        <Theme>
            <Router />
            <StatusBar style="auto" />
        </Theme>
    );
}

export default App;

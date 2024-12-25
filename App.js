import { StatusBar } from "expo-status-bar";
import Router from "./src/router";
import Theme from "./src/theme";
import { useFonts } from "expo-font";

function App() {
    const [fontsLoaded] = useFonts({
        "Curlz-MT": require("./assets/fonts/curlz-mt.ttf"),
    });

    if (!fontsLoaded) return <></>;

    return (
        <Theme>
            <StatusBar style="auto" />
            <Router />
        </Theme>
    );
}

export default App;

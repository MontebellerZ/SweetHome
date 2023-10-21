import { StatusBar } from "expo-status-bar";
import Router from "./router";
import Theme from "./theme";
import { View } from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";

registerTranslation("en-GB", enGB);

function App() {
    return (
        // <View style={{ flex: 1, transform: [{ rotate: "180deg" }] }}>
            <Theme>
                <Router />
                <StatusBar style="auto" />
            </Theme>
        // </View>
    );
}

export default App;

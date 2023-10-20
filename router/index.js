import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Initial from "../screens/initial";
import { useTheme } from "@rneui/themed";

const Stack = createNativeStackNavigator();

function Router() {
    const { theme } = useTheme();

    return (
        <NavigationContainer
            theme={{
                colors: {
                    primary: theme.colors.primary,
                    background: theme.colors.background,
                    card: theme.colors.white,
                    text: theme.colors.black,
                },
                dark: theme.mode === "dark",
            }}
        >
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Initial" component={Initial} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;

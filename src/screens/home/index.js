import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { GetUser, RemoveUser } from "../../api";
import { Button, Text } from "react-native-paper";

function Home({ route, navigation }) {
    useEffect(() => {
        GetUser().then((user) => {
            if (!user) {
                return navigation.reset({
                    index: 0,
                    routes: [{ name: "Initial" }],
                });
            }

            navigation.setParams({ user });
        });
    }, []);

    const { user } = route?.params || {};

    return (
        <>
            <Button
                onPress={() =>
                    RemoveUser().then(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Initial" }],
                        });
                    })
                }
                mode="contained"
            >
                teste
            </Button>
        </>
    );
}

export default Home;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const getUser = async (navigation) => {
    const userStorage = await AsyncStorage.getItem("user");

    if (!userStorage) return navigation.navigate("Initial");

    const user = JSON.parse(userStorage);

    navigation.setParams({ user });
};

function Home({ route, navigation }) {
    useEffect(() => {
        getUser(navigation);
    }, []);

    const { user } = route;

    return <></>;
}

export default Home;

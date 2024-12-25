import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_STORAGE_KEY = "userStorage";

export async function SaveUser(username, pronouns) {
    const user = {
        username,
        pronouns,
    };

    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

    return user;
}

export async function GetUser() {
    const userStorage = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (!userStorage) return null;

    return JSON.parse(userStorage);
}

export async function RemoveUser() {
    return await AsyncStorage.removeItem(USER_STORAGE_KEY);
}

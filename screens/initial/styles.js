import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        gap: 2,
        paddingHorizontal: "4%",
        paddingVertical: "4%",
    },
    label: {
        textAlign: "center",
    },
    submit: {},
    dialogTitle: {
        textAlign: "center",
    },
    dialogText: {
        textAlign: "center",
    },
    dialogBold: {
        fontWeight: "bold",
    },
    dialogActions: {
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },
    rowItem: {
        flex: 1,
    },
});

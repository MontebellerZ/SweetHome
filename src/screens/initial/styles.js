import { Dimensions, StyleSheet } from "react-native";
import { basicColors } from "../../theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingHorizontal: "6%",
        paddingVertical: "10%",
        justifyContent: "center",
    },
    header: {
        // flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
    logo: {
        width: "35%",
        maxWidth: 200,
        height: undefined,
        aspectRatio: 1,
    },
    title: {
        fontFamily: "Curlz-MT",
        color: basicColors.background,
        textShadowColor: "#000",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    },
    form: {
        gap: 8,
        backgroundColor: basicColors.background,
        padding: "6%",
        borderWidth: 1,
        borderColor: "#999999",
        borderRadius: 10,
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

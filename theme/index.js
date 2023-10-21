import { ThemeProvider, createTheme } from "@rneui/themed";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

const themeRNE = createTheme({
    lightColors: {
        primary: "#FF70A6",
        secondary: "#70D6FF",
        success: "#E9FF70",
        warning: "#FFD670",
        error: "#FF9770",
        background: "#F7F7F7",
    },
    mode: "light",
});
const themeRNP = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "rgb(170, 44, 99)",
        onPrimary: "rgb(255, 255, 255)",
        primaryContainer: "rgb(255, 217, 226)",
        onPrimaryContainer: "rgb(62, 0, 30)",
        secondary: "rgb(0, 103, 131)",
        onSecondary: "rgb(255, 255, 255)",
        secondaryContainer: "rgb(188, 233, 255)",
        onSecondaryContainer: "rgb(0, 31, 42)",
        tertiary: "rgb(118, 90, 0)",
        onTertiary: "rgb(255, 255, 255)",
        tertiaryContainer: "rgb(255, 223, 149)",
        onTertiaryContainer: "rgb(37, 26, 0)",
        error: "rgb(186, 26, 26)",
        onError: "rgb(255, 255, 255)",
        errorContainer: "rgb(255, 218, 214)",
        onErrorContainer: "rgb(65, 0, 2)",
        background: "#F7F7F7",
        onBackground: "rgb(32, 26, 27)",
        surface: "rgb(255, 251, 255)",
        onSurface: "rgb(32, 26, 27)",
        surfaceVariant: "rgb(248, 238, 242)",
        onSurfaceVariant: "rgb(81, 67, 71)",
        outline: "rgb(131, 115, 119)",
        outlineVariant: "rgb(213, 194, 198)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(53, 47, 48)",
        inverseOnSurface: "rgb(250, 238, 239)",
        inversePrimary: "rgb(255, 176, 200)",
        surfaceDisabled: "rgba(32, 26, 27, 0.12)",
        onSurfaceDisabled: "rgba(32, 26, 27, 0.38)",
        backdrop: "rgba(58, 45, 48, 0.4)",
    },
    dark: false,
};

function Theme({ children }) {
    return (
        <ThemeProvider theme={themeRNE}>
            <PaperProvider theme={themeRNP}>{children}</PaperProvider>
        </ThemeProvider>
    );
}

export default Theme;

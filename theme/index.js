import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
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

function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;

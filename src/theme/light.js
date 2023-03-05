import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const lightTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'light',
        background: {
            default: "#F0EBE3"
        },
        primary: {
            light: "#fff",
            main: "#ab918f",
            dark: "#ab918f",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
    },
    typography: {
        fontFamily: "Jost, sans-serif",
    },
}))

export default lightTheme
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const darkTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#222831"
        },
        primary: {
            light: "#fff",
            main: "#29a587",
            dark: "#29a587",
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
    }
}))

export default darkTheme
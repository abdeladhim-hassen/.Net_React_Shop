import {Container, createTheme, CssBaseline, ThemeProvider,} from '@mui/material';
import Header from "./Header";
import {useState} from "react";
import { Outlet } from 'react-router-dom';


function App() {
    const  [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? "dark" : "light";

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background:{
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })
    const ChangeMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} ChangeMode={ChangeMode} />
            <Container>
               <Outlet />
            </Container>
        </ThemeProvider>
    );
}

export default App;

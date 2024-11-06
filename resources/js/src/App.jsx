import "./assets/styles/index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";
import "mantine-react-table/styles.css";
import { Suspense } from "react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/router/AppRouter";
import { theme } from "./theme";
import { store } from "./store";
//import { AppRouter2 } from "./routes/AppRouter2";

export const App = () => {
    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            <Provider store={store}>
                <Suspense fallback={<span>Loading...</span>}>
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                </Suspense>
            </Provider>
        </MantineProvider>
    );
};

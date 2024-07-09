import {createBrowserRouter} from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import Catalog from "../../features/catalog/Catalog";

export const router = createBrowserRouter([
               {
                    path: '/',
                    element: <App />,
                    children: [
                        {
                            path: '/',
                            element: <HomePage />,
                        },
                        {
                            path: 'catalog',
                            element: <Catalog />,
                        },
                        {
                            path: 'catalog/:id',
                            element: <ProductDetails />,
                        },
                        {
                            path: 'contact',
                            element: <ContactPage />,
                        },
                        {
                            path: 'about',
                            element: <AboutPage />,
                        }
                    ]

               }
               ])
import {Product} from "../../app/models/Product";
import ProductList from "./ProductList";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";


export default function Catalog()
{
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async ()   => {
            try {
                const response = await fetch("https://localhost:7273/api/products");
                if (!response.ok) {
                    console.log("Network response was not ok.");
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log('An unexpected error occurred');
                }
            }
        };

        fetchData().catch((error) => {
            console.error('Error in fetchData:', error);
        });
    }, []);
    return(
        <>
            <ProductList products={products} />
        </>
    )
}
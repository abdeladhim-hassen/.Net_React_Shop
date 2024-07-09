import {Product} from "../../app/models/Product";
import {Grid} from "@mui/material";
import ProductCard from "./ProductCard";
interface props {
    products: Product[];
}
export default  function ProductList({products}: props) {
    return(
        <Grid container spacing={4} >
            {products.map((product:Product) => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product}  />
                </Grid>
            ))}
        </Grid>
    )
}
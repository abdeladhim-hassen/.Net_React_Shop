import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Product} from "../../app/models/Product";
import axios from "axios";

export default function ProductDetails() {
    const {id} = useParams<{id:string}>();
    const[product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(
        () => {
            axios.get(`https://localhost:7273/api/products/${id}`)
                .then((response)=>setProduct(response.data))
                .catch(error => console.log(error))
                .finally(() => setLoading(false) );
        },[id]
    )
    if(loading) return <p>Loading...</p>;
    if(!product) return <p>Product not found...</p>;
   return(
       <Grid container spacing={6}>
           <Grid item xs={6}>
               <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
           </Grid>
           <Grid item xs={6}>
               <Typography variant='h3'>{product.name}</Typography>
               <Divider sx={{ mb: 2 }} />
               <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
               <TableContainer>
                   <Table>
                       <TableBody sx={{ fontSize: '1.1em' }}>
                           <TableRow>
                               <TableCell>Name</TableCell>
                               <TableCell>{product.name}</TableCell>
                           </TableRow>
                           <TableRow>
                               <TableCell>Description</TableCell>
                               <TableCell>{product.description}</TableCell>
                           </TableRow>
                           <TableRow>
                               <TableCell>Type</TableCell>
                               <TableCell>{product.type}</TableCell>
                           </TableRow>
                           <TableRow>
                               <TableCell>Brand</TableCell>
                               <TableCell>{product.brand}</TableCell>
                           </TableRow>
                           <TableRow>
                               <TableCell>Quantity in stock</TableCell>
                               <TableCell>{product.quantityInStock}</TableCell>
                           </TableRow>
                       </TableBody>
                   </Table>
               </TableContainer>
           </Grid>
       </Grid>
   )
}
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent, CardHeader,
    CardMedia,
    Typography
} from "@mui/material";

import {Product} from "../../app/models/Product";
import {Link} from "react-router-dom";
interface props{
    product:Product
}
export default function  ProductCard({product}: props) {
    return(
    <Card>
        <CardHeader
            avatar =
                {
                    <Avatar sx={{
                        bgcolor: 'secondary.main'
                    }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
            title={product.name}
            titleTypographyProps = {
                {
                   sx:{
                       fontWeight: 'bold',
                       color: 'primary.main'
                      }
                }
            }
        />

        <CardMedia
            component="img"
            alt={product.name}
            title={product.name}
            sx={{height:"140", backgroundSize: 'contain' , bgcolor: 'primary.light'}}
            image={product.pictureUrl}
        />
        <CardContent>
            <Typography gutterBottom color="secondary" variant="h5" component="div">
                ${(product.price / 100).toFixed(3)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.brand} / {product.type}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Add to cart</Button>
            <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
        </CardActions>
    </Card>
    )
}
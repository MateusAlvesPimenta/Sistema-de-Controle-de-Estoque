import { Container } from "reactstrap"
import { ProductsHeader } from "./ProductsHeader"
import { ListProducts } from "./ListProducts"

export const Products = () => {
    
    return (
        <Container>
            <ProductsHeader />
            <ListProducts />
        </Container>
    )
}
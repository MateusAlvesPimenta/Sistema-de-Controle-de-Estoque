import { Container } from "reactstrap"
import { ProductsHeader } from "./ProductsHeader"
import { ListProducts } from "./ListProducts"
import { ProductsFilter } from "./ProductsFilter"

export const Products = () => {

    return (
        <Container>
            <ProductsHeader />
            <ProductsFilter />
            <ListProducts />
        </Container>
    )
}
import { Container } from "reactstrap";
import { ProductsWithLowStockHeader } from "./ProductsWithLowStockHeader";
import { ListProductsWithLowStock } from "./ListProductsWithLowStock";

export const ProductsWithLowStock = () => {

    return (
        <Container>
            <ProductsWithLowStockHeader />
            <ListProductsWithLowStock />
        </Container>
    )
}
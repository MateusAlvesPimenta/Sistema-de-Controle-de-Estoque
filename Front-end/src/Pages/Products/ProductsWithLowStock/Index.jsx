import { Container } from "reactstrap";
import { ProductsWithLowStockHeader } from "./ProductsWithLowStockHeader";
import { ProductsWithLowStockTable } from "./ProductsWithLowStockTable";

export const ProductsWithLowStock = () => {

    return (
        <Container>
            <ProductsWithLowStockHeader />
            <ProductsWithLowStockTable />
        </Container>
    )
}
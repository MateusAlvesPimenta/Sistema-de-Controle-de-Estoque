import { Container } from "reactstrap";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsFilter } from "./ProductsFilter";
import { ProductsTable } from "./ProductsTable";
import "./Styles.css";

export const Products = () => {

    return (
        <Container>
            <ProductsHeader />
            <ProductsFilter />
            <ProductsTable/>
        </Container>
    )
}
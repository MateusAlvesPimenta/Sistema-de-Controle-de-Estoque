import { Container } from "reactstrap"
import { ListTopSellingProducts } from "./ListTopSellingProducts"
import { TopSellingProductsHeader } from "./TopSellingProductsHeader"

export const TopSellingProducts = () => {

    return (
        <Container>
            <TopSellingProductsHeader />
            <ListTopSellingProducts />
        </Container>
    )
}
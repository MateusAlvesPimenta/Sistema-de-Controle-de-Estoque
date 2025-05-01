import { Container } from "reactstrap"
import { TopSellingProductsHeader } from "./TopSellingProductsHeader"
import { TopSellingProductsTable } from "../../../Components/Tables/TopSellingProductsTable"

export const TopSellingProducts = () => {

    return (
        <Container>
            <TopSellingProductsHeader />
            <TopSellingProductsTable fullInfo={true} />
        </Container>
    )
}
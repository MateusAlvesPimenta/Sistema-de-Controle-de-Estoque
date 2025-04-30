import { useContext, useEffect } from "react"
import { Container } from "reactstrap"
import { useParams } from "react-router-dom"

import { SaleContent } from "./SaleContent"
import { SaleItemsContent } from "./SaleItemsContent"
import { Context } from "../../../Context/Index"

export const SaleDetails = () => {

    const { saleId } = useParams();
    const { getById } = useContext(Context);

    useEffect(() => {
        getById(saleId);
    }, [])
    
    return (
        <Container>
            <SaleContent />
            <SaleItemsContent />
        </Container>
    )
}
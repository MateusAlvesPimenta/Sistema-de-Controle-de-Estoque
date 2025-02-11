import { AddProductButton } from "../../ActionButtons/ProductsButtons/Index"

export const ProductsHeader = () => { 
    return (
        <header className="py-3">
            <h1>Products</h1>
            <br />
            <AddProductButton />
        </header>
    )
}
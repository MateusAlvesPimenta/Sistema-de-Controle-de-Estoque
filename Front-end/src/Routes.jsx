import { Route, Routes } from "react-router-dom"
import { Suppliers } from "./Components/Pages/Suppliers/Index"
import { Products } from "./Components/Pages/Products/Index"
import { Sales } from "./Components/Pages/Sales/Index"
import { Expenses } from "./Components/Pages/Expenses/Index"
import { TopSellingProducts } from "./Components/Pages/TopSellingProducts/Index"
import { Dashboard } from "./Components/Pages/Dashboard/Index"
import { ProductsWithLowStock } from "./Components/Pages/ProductsWithLowStock/Index"


export const MainRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/top-selling" element={<TopSellingProducts />} />
            <Route path="/products/low-stock" element={<ProductsWithLowStock />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/expenses" element={<Expenses />} />
        </Routes>
    )
}
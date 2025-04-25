import { Route, Routes } from "react-router-dom"

import { Dashboard } from "./Pages/Dashboard"
import { Products } from "./Pages/Products"
import { ProductsWithLowStock } from "./Pages/ProductsWithLowStock"
import { TopSellingProducts } from "./Pages/TopSellingProducts"
import { Suppliers } from "./Pages/Suppliers"
import { Sales } from "./Pages/Sales"
import { SaleDetails } from "./Pages/SaleDetails/Index"
import { Expenses } from "./Pages/Expenses"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"


export const MainRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/top-selling" element={<TopSellingProducts />} />
            <Route path="/products/low-stock" element={<ProductsWithLowStock />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sale/details/:saleId" element={<SaleDetails />} />
            <Route path="/expenses" element={<Expenses />} />
        </Routes>
    )
}
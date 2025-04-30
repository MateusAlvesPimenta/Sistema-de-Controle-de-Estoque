import { Route, Routes } from "react-router-dom"

import { Dashboard } from "./Pages/Dashboard"
import { Products } from "./Pages/Products/AllProducts"
import { ProductsWithLowStock } from "./Pages/Products/ProductsWithLowStock"
import { TopSellingProducts } from "./Pages/Products/TopSellingProducts"
import { Suppliers } from "./Pages/Suppliers"
import { Login } from "./Pages/Authentication/Login/Index"
import { Register } from "./Pages/Authentication/Register/Index"
import { Sales } from "./Pages/Sales&Expenses/Sales/Index"
import { SaleDetails } from "./Pages/Sales&Expenses/SaleDetails/Index"
import { Expenses } from "./Pages/Sales&Expenses/Expenses/Index"


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
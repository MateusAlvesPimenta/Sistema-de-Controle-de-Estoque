import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./Components/Pages/Dashboard"
import { Suppliers } from "./Components/Pages/Suppliers"
import { Products } from "./Components/Pages/Products"
import { Sales } from "./Components/Pages/Sales"
import { Expenses } from "./Components/Pages/Expenses/Index"


export const MainRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/expenses" element={<Expenses />} />
        </Routes>
    )
}
import { Route, Routes } from "react-router-dom"
import { Home } from "./Components/Pages/Home/Index"
import { Suppliers } from "./Components/Pages/Suppliers/Index"
import { Products } from "./Components/Pages/Products/Index"
import { Sales } from "./Components/Pages/Sales"


export const MainRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
        </Routes>
    )
}
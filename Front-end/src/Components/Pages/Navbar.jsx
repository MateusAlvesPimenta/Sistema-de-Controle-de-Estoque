import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap"


export const MyNavBar = () => {

    let initialActive = sessionStorage.getItem("active");
    const [activeItem, setActiveItem] = useState(initialActive == null ? "" : initialActive);

    const handleClick = (name) => {
        setActiveItem(name);
        sessionStorage.setItem("active", name)
    }
    return (
            <Nav fill tabs>
                <NavItem>
                    <Link to="/"
                        onClick={() => handleClick("")}
                        className="border-2 fw-bold fs-4 text-decoration-none">
                        <NavLink active={activeItem === ""}>
                            Home
                        </NavLink>
                    </Link>
                </NavItem>
                <NavItem >
                    <Link
                        to="/products"
                        onClick={() => handleClick("products")}
                        className="border-2 fw-bold fs-4 text-decoration-none">
                        <NavLink
                            active={activeItem === "products" ? true : false}>
                            Products
                        </NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/suppliers"
                        onClick={() => handleClick("suppliers")}
                        className="border-2 fw-bold fs-4 text-decoration-none">
                        <NavLink
                            active={activeItem === "suppliers" ? true : false}>
                            Suppliers
                        </NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/categories"
                        onClick={() => handleClick("categories")}
                        className="border-2 fw-bold fs-4 text-decoration-none">
                        <NavLink
                            active={activeItem === "categories" ? true : false}>
                            Categories
                        </NavLink>
                    </Link>
                </NavItem>
            </Nav>
    )
}
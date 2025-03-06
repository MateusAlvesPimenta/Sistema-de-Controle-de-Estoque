import { Link } from "react-router-dom";

export const MyNavBar = () => {

    return (
        <nav className="side-bar">
            <Link to="/"
                className="nav-link link-light py-3">
                <i className="bi bi-list"></i>
                <span>
                    Dashboard
                </span>
            </Link>
            <Link to="/products"
                className="nav-link link-light">
                <i className="bi bi-bag"></i>
                <span>
                    Products
                </span>
            </Link>
            <Link to="/suppliers"
                className="nav-link link-light">
                <i className="bi bi-box"></i>
                <span>
                    Suppliers
                </span>
            </Link>
            <Link to="/sales"
                className="nav-link link-light">
                <i className="bi bi-graph-up-arrow"></i>
                <span>
                    Sales
                </span>
            </Link>
            <Link to="/expenses"
                className="nav-link link-light">
                <i className="bi bi-graph-down-arrow"></i>
                <span>
                    Expenses
                </span>
            </Link>
            {/* <Link to="/sales"
                className="nav-link link-light">
                <i className="bi bi-graph-up-arrow"></i>
                <span>
                    Income and expenses
                </span>
            </Link> */}
        </nav>
    )
}
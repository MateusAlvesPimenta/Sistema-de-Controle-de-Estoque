import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccordionBody, AccordionHeader, UncontrolledAccordion } from "reactstrap";
import { Context } from "../../Context/Index";
import "./Styles.css";

export const MyNavBar = () => {

    const { logout } = useContext(Context);

    return (
        <nav className="sidebar">
            <div>
                <Link to="/dashboard"
                    className="nav-link py-3">
                    <i className="bi bi-list"></i>
                    <span>
                        Dashboard
                    </span>
                </Link>
                <UncontrolledAccordion defaultOpen="0">
                    <AccordionHeader targetId="1" className="nav-link">
                        <i className="bi bi-bag"> </i>
                        <span>
                            Products
                        </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Link to="/products"
                            className="nav-link">
                            <span>
                                All Products
                            </span>
                        </Link>
                        <Link to="/products/top-selling"
                            className="nav-link">
                            <span>
                                Top selling
                            </span>
                        </Link>
                        <Link to="/products/low-stock"
                            className="nav-link">
                            <span>
                                Low stock
                            </span>
                        </Link>
                    </AccordionBody>
                </UncontrolledAccordion>
                <Link to="/suppliers"
                    className="nav-link">
                    <i className="bi bi-box"></i>
                    <span>
                        Suppliers
                    </span>
                </Link>
                <Link to="/sales"
                    className="nav-link">
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>
                        Sales
                    </span>
                </Link>
                <Link to="/expenses"
                    className="nav-link">
                    <i className="bi bi-graph-down-arrow"></i>
                    <span>
                        Expenses
                    </span>
                </Link>
            </div>
            <Link to="/"
                onClick={logout}
                className="nav-link">
                <i title="Logout" className="bi bi-box-arrow-right"></i>
                <span>
                    Logout
                </span>
            </Link>
        </nav>
    )
}
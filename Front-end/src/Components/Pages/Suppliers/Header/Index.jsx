import React from "react";
import { AddSupplier } from "../../../ActionButtons/SuppliersButtons/Index";

export const Header = () => {

    return (
        <header className="py-5">
            <h1>Suppliers</h1>
            <br />
            <AddSupplier />
        </header>
    )
}
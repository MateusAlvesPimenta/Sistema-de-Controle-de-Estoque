import { useContext, useMemo, useState } from "react"
import { Table } from "reactstrap"
import { Context } from "../../Context/Index"

export const ListTopSellingProducts = (props) => {

    const { info } = props;
    const { saleItems } = useContext(Context);
    const [reducedItems, setReducedItems] = useState([]);

    useMemo(() => {
        let tempReducedItems = [];
        saleItems.forEach(item => {
            let existingItem = tempReducedItems.find(i => i.productId === item.productId);

            if (existingItem) {
                existingItem.quantity += item.quantity;
                existingItem.price += item.price;
            }
            else {
                tempReducedItems.push({ ...item });
            }
        });
        tempReducedItems.sort((a, b) => b.price - a.price);
        setReducedItems(tempReducedItems);
    }, [saleItems]);

    if (info.toLowerCase() === "full") {
        return (
            <Table hover>
                <thead>
                    <tr>
                        <th>Product id</th>
                        <th>Name</th>
                        <th>Quantity sold</th>
                        <th>Value sold</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reducedItems.map(item => (
                            <tr key={item.productId}>
                                <td>{item.productId}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>R${item.price.toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }
    return (
        <Table hover size="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value sold</th>
                </tr>
            </thead>
            <tbody>
                {
                    reducedItems.slice(0, 3).map(item => (
                        <tr key={item.productId}>
                            <td>{item.name}</td>
                            <td>R${item.price.toLocaleString()}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
import { useContext, useMemo, useState } from "react"
import { Table } from "reactstrap"
import { Context } from "../../Context/Index"

export const ListTopSellingProducts = () => {

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

    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount sold</th>
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
        </>
    )
}
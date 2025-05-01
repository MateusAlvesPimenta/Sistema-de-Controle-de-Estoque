import { useContext, useMemo, useState } from "react"
import { Table } from "reactstrap"
import { Context } from "../../Context/Index"

export const TopSellingProductsTable = (props) => {

    const { fullInfo } = props;
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
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    {fullInfo && <th>Product id</th>}
                    <th>Quantity sold</th>
                    <th>Value sold</th>
                </tr>
            </thead>
            <tbody>
                {fullInfo ?
                    reducedItems.map(item => (
                        <tr key={item.productId}>
                            <td>{reducedItems.findIndex(i => i === item) + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.productId}</td>
                            <td>{item.quantity}</td>
                            <td>R${item.price.toLocaleString()}</td>
                        </tr>
                    ))
                    :
                    reducedItems.slice(0, 5).map(item => (
                        <tr key={item.productId}>
                            <td>{reducedItems.findIndex(i => i === item) + 1}</td>
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
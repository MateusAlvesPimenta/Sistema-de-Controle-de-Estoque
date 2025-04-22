import { useContext, useState } from "react"
import {
    Button, Form, FormGroup, Input,
    Label, Modal, ModalBody, ModalFooter, ModalHeader, Table
} from "reactstrap";
import { Context } from "../../../Context/Index"

export const AddSaleButton = () => {

    const { post, products } = useContext(Context);
    const [modal, setModal] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [saleItems, setSaleItems] = useState([]);

    const toggleModal = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setCustomerName(value);
    }

    const handleProductNameChange = (e) => {
        const { value } = e.target;
        if (value === "") {
            setFilteredProducts([]);
            return;
        }
        setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(value.toLowerCase())));
    }

    const removeItem = (item) => {
        setSaleItems(saleItems.filter(saleItem => saleItem.productId != item.productId));
    }

    const removeOneItem = (item) => {

        if (item.quantity == 1) {
            removeItem(item);
            return;
        }
        saleItems.forEach(saleItem => {
            if (saleItem == item) {
                saleItem.quantity--;
            }
        })
        setSaleItems([...saleItems]);
    }

    const addItem = (product) => {
        if (!saleItems.some(item => item.productId == product.productId)) {
            setSaleItems([...saleItems, {
                name: product.name,
                productId: product.productId,
                price: product.price,
                quantity: 1
            }]);
            return;
        }
        saleItems.forEach(item => {
            if (item.productId === product.productId) {
                item.quantity++;
            }
        })
        setSaleItems([...saleItems]);
    }

    const submit = () => {
        event.preventDefault();
        if (saleItems.length <= 0) {
            return;
        }
        const saleDTO = {
            customerName: customerName,
            saleItemDTOs: saleItems
        };
        post(saleDTO, "sale");
        toggleModal();
    }

    return (
        <>
            <Button
                onClick={toggleModal}
                size="lg"
                color="primary">
                <i className="bi bi-plus-circle"> </i>
                Register sale
            </Button>
            <Modal isOpen={modal} className="sale-modal">
                <ModalHeader>Register sale</ModalHeader>
                <Form
                    onSubmit={submit}
                    onReset={toggleModal}>
                    <ModalBody className="sale-modal">
                        <FormGroup floating>
                            <Input
                                type="text"
                                id="customerName"
                                name="customerName"
                                placeholder="Customer name"
                                onChange={handleChange}
                                required />
                            <Label for="customerName">Customer name</Label>
                        </FormGroup>
                        <FormGroup floating className="d-flex">
                            <Input
                                type="text"
                                id="productName"
                                name="productName"
                                placeholder="Product name"
                                onChange={handleProductNameChange} />
                            <Label for="productName">Product name</Label>
                        </FormGroup>
                        <Table hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts && filteredProducts.map(item => (
                                    <tr key={item.productId + 100}>
                                        <td>{item.name}</td>
                                        <td>R${item.price.toLocaleString()}</td>
                                        <td>
                                            <Button
                                                outline
                                                onClick={() => addItem(item)}
                                                color="primary btn-action">
                                                <i className="bi bi-plus-circle"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <h5>
                            SaleItems
                        </h5>
                        <Table hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {saleItems && saleItems.map(item => (
                                    <tr key={item.productId}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>R${(item.quantity * item.price).toLocaleString()}</td>
                                        <td>
                                            <Button
                                                outline
                                                onClick={() => addItem(item)}
                                                color="primary btn-action">
                                                <i className="bi bi-plus-circle"></i>
                                            </Button>
                                            <Button
                                                outline
                                                onClick={() => removeOneItem(item)}
                                                color="warning btn-action">
                                                <i className="bi bi-dash-circle"></i>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                outline
                                                onClick={() => removeItem(item)}
                                                color="danger btn-action">
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <h4>Total: R${saleItems.reduce((accumulator, next) => accumulator + (next.price * next.quantity), 0).toLocaleString()}</h4>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Process Sale</Button>
                        <Button type="reset">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}
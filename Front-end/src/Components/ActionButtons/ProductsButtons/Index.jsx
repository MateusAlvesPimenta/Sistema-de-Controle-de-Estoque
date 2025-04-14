import { useContext, useState } from "react"
import {
    Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap"
import { Context } from "../../../Context/Index";

export const AddProductButton = () => {

    const { suppliers, post } = useContext(Context)
    const [modal, setModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        supplierId: suppliers.length <= 0 ? 1 : suppliers.supplierId
    });
    const [selectedSupplier, setSelectedSupplier] = useState(suppliers && suppliers[0]);

    const toggleModal = () => {
        setModal(!modal);
    }

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    const submit = () => {
        post(product, "product");
        toggleModal();
        event.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const selectSupplier = (supplier) => {
        setSelectedSupplier(supplier);
        setProduct({ ...product, supplierId: supplier.supplierId });
    }

    return (
        <>
            <Button
                onClick={toggleModal}
                size="lg"
                color="primary">
                <i className="bi bi-plus-circle"> </i>
                Add product
            </Button>

            <Modal isOpen={modal}>
                <ModalHeader>Add product</ModalHeader>
                <Form
                    onReset={toggleModal}
                    onSubmit={submit}>
                    <ModalBody>
                        <FormGroup floating>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                maxLength="100"
                                onChange={handleChange}
                                required />
                            <Label for="name">Name</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                name="description"
                                type="textarea"
                                placeholder="Description"
                                maxLength="500"
                                onChange={handleChange}
                                required />
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="number"
                                step=".01"
                                id="price"
                                name="price"
                                placeholder="Price"
                                onChange={handleChange}
                                required />
                            <Label for="price">Price</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                placeholder="Quantity"
                                onChange={handleChange}
                                required />
                            <Label for="quantity">Quantity</Label>
                        </FormGroup>
                        <Dropdown isOpen={dropdown} toggle={toggleDropdown}>
                            <DropdownToggle caret>{selectedSupplier != null ? selectedSupplier.name : "suppliers"}</DropdownToggle>
                            <DropdownMenu>
                                {
                                    suppliers && suppliers.map(supplier => (
                                        <DropdownItem
                                            onClick={() => selectSupplier(supplier)}
                                            key={supplier.supplierId}>
                                            {supplier.name}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Add</Button>
                        <Button type="reset" color="secondary">reset</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}

export const EditProductButton = (props) => {

    const { entity } = props;
    const { put, suppliers } = useContext(Context);
    const [modal, setModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [product, setProduct] = useState({ ...entity });
    const [selectedSupplier, setSelectedSupplier] = useState(
        suppliers.filter(supplier => entity.supplierId == supplier.supplierId)[0]
    );

    const toggleModal = () => {
        setModal(!modal);
    }

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }

    const selectSupplier = (supplier) => {
        setSelectedSupplier(supplier);
        setProduct({ ...product, supplierId: supplier.supplierId });
    }

    const submit = () => {
        put(product, "product");
        toggleModal();
        event.preventDefault();
    }

    return (
        <>
            <Button onClick={toggleModal} outline color="success btn-action">
                <i className="bi bi-pen-fill"></i>
            </Button>

            <Modal isOpen={modal}>
                <ModalHeader>Edit product</ModalHeader>
                <Form
                    onSubmit={submit}
                    onReset={toggleModal}>
                    <ModalBody>
                        <FormGroup floating>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                value={product && product.name}
                                required />
                            <Label for="name">Name</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="textarea"
                                id="description"
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={product && product.description}
                                required />
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="number"
                                step=".01"
                                id="price"
                                name="price"
                                placeholder="Price"
                                onChange={handleChange}
                                value={product && product.price}
                                required />
                            <Label for="price">Price</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="number"
                                id="quantity"
                                name="quantity"
                                placeholder="Quantity"
                                onChange={handleChange}
                                value={product && product.quantity}
                                required />
                            <Label for="quantity">Quantity</Label>
                        </FormGroup>
                        <Dropdown isOpen={dropdown} toggle={toggleDropdown}>
                            <DropdownToggle caret>{selectedSupplier != null ? selectedSupplier.name : "suppliers"}</DropdownToggle>
                            <DropdownMenu>
                                {
                                    suppliers.map(supplier => (
                                        <DropdownItem
                                            onClick={() => selectSupplier(supplier)}
                                            key={supplier.supplierId}>
                                            {supplier.name}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Submit</Button>
                        <Button type="reset" color="secondary">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}

export const RestockProductsButton = (props) => {

    const { id, name } = props;
    const { restock } = useContext(Context);
    const [modal, setModal] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const toggle = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setQuantity(value);
    }

    const submit = () => {
        restock(id, quantity);
        toggle();
        event.preventDefault();
    }

    return (
        <>
            <Button onClick={toggle} color="success">Restock</Button>
            <Modal isOpen={modal}>
                <ModalHeader>Restock product: {name}</ModalHeader>
                <Form
                    onReset={toggle}
                    onSubmit={submit}>
                    <ModalBody>
                        <FormGroup floating>
                            <Input
                                type="number"
                                id="quantity"
                                placeholder="Quantity"
                                className="col-1"
                                onChange={handleChange}
                                required />
                            <Label for="quantity">Quantity</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Restock</Button>
                        <Button type="reset" color="secondary">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}
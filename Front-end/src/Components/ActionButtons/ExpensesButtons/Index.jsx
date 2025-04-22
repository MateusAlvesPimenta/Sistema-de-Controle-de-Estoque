import { useContext, useState } from "react"
import {
    Button, Form, FormGroup, Input, Label,
    Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap"
import { Context } from "../../../Context/Index"

export const AddExpenseButton = () => {

    const { post } = useContext(Context);
    const [modal, setModal] = useState(false);
    const [expense, setExpense] = useState({
        name: "",
        price: 0
    });

    const toggleModal = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    }

    const submit = () => {
        event.preventDefault();
        toggleModal();
        post(expense, "expense");
    }

    return (
        <>
            <Button
                onClick={toggleModal}
                size="lg"
                color="primary">
                <i className="bi bi-plus-circle"> </i>
                Register expense</Button>

            <Modal isOpen={modal}>
                <ModalHeader>Register expense</ModalHeader>
                <Form
                    onReset={toggleModal}
                    onSubmit={submit}>
                    <ModalBody>
                        <FormGroup floating>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                required />
                            <Label for="name">Name</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="number"
                                step=".01"
                                id="price"
                                name="price"
                                placeholder="value"
                                onChange={handleChange}
                                required />
                            <Label for="price">Value</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Register expense</Button>
                        <Button type="reset">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}

export const EditExpenseButton = (props) => {

    const { entity } = props;
    const { put } = useContext(Context);
    const [modal, setModal] = useState(false);
    const [expense, setExpense] = useState({ ...entity });

    const toggleModal = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    }

    const submit = () => {
        event.preventDefault();
        toggleModal();
        put(expense, "expense");
    }

    return (
        <>
            <Button
                onClick={toggleModal}
                outline
                color="success btn-action">
                <i className="bi bi-pen-fill"></i>
            </Button>
            <Modal isOpen={modal}>
                <ModalHeader>Edit expense</ModalHeader>
                <Form
                    onReset={toggleModal}
                    onSubmit={submit}>
                    <ModalBody>
                        <FormGroup floating>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                value={expense && expense.name}
                                required />
                            <Label for="name">Name</Label>
                        </FormGroup>
                        <FormGroup floating>
                            <Input
                                type="number"
                                step=".01"
                                id="price"
                                name="price"
                                placeholder="price"
                                onChange={handleChange}
                                value={expense && expense.price}
                                required />
                            <Label for="price">Price</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Submit</Button>
                        <Button type="reset">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}
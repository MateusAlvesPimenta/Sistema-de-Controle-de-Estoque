import { useContext, useState } from "react";
import { Button, Form, Modal, ModalFooter, ModalHeader } from "reactstrap";

import { Context } from "../Context/Index";


export const DeleteEntity = (props) => {

    const { entityId, entityName, entityType } = props;
    const { deleteEntity } = useContext(Context);
    const [modal, setModal] = useState(false);

    const openCloseModal = () => {
        setModal(!modal);
    }

    const submit = () => {
        deleteEntity(entityId, entityType);
        openCloseModal();
        event.preventDefault();
    }

    return (
        <>
            <Button onClick={openCloseModal} outline className="ms-3" color="danger">Delete</Button>
            <Modal isOpen={modal}>
                <ModalHeader>
                    Are you sure you want to delete the {entityType}: {entityName}?
                </ModalHeader>
                <Form
                    onSubmit={submit}
                    onReset={openCloseModal}>
                    <ModalFooter>
                        <Button type="submit" color="danger">Delete</Button>
                        <Button type="reset">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal >
        </>
    )
}
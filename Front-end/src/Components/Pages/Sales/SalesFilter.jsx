import { useContext, useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { Context } from "../../Context/Index";

export const SalesFilter = () => {

    const { getByDate } = useContext(Context);
    const [initialDate, setInitialDate] = useState();
    const [lastDate, setLastDate] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "initialDate") {
            setInitialDate(value);
            console.log(value);
            return;
        }
        console.log(value);
        setLastDate(value);
    }

    const submit = () => {
        getByDate(initialDate, lastDate);
        event.preventDefault();
    }

    return (
        <>
            <Form
                className="float-start mt-3"
                onSubmit={submit}>
                <div className="d-flex mt-3">
                    <FormGroup floating >
                        <Input
                            type="date"
                            id="initialDate"
                            name="initialDate"
                            onChange={handleChange}
                            required />
                        <Label for="initialDate" >Initial date</Label>
                    </FormGroup>
                    <FormGroup floating >
                        <Input
                            type="date"
                            id="lastDate"
                            name="lastDate"
                            onChange={handleChange}
                            required />
                        <Label for="lastDate" >Last date</Label>
                    </FormGroup>
                </div>
                <Button type="submit" color="primary" className="float-start">Filter</Button>
                <Button type="reset" className="float-end">Reset</Button>
            </Form>
        </>
    )
}
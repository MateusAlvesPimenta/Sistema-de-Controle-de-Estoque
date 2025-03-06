import { useContext, useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { Context } from "../Context/Index";
import { format } from "date-fns";

export const DateFilter = (props) => {

    const { entityType } = props;
    const { getByDate, getAll } = useContext(Context);
    const [initialDate, setInitialDate] = useState();
    const [lastDate, setLastDate] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "initialDate") {
            setInitialDate(value);
            return;
        }
        let date = new Date(value + "T23:59:59");
        setLastDate(format(date, "yyyy-MM-dd HH:mm:ss"));
    }

    const reset = () => {
        getAll(entityType);
    }

    const submit = () => {
        getByDate(initialDate, lastDate, entityType);
        event.preventDefault();
    }

    return (
        <>
            <Form
                className="float-start mt-3"
                onReset={reset}
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
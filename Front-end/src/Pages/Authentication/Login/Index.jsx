import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Context } from "../../../Context/Index";

export const Login = () => {

    const { authenticate } = useContext(Context);
    const [user, setUser] = useState({});
    const [displayAlert, setDisplayAlert] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const submit = async () => {
        event.preventDefault();
        const status = await authenticate(user, "login");
        switch (status) {
            case 200:
                navigate("/dashboard");
                break;

            default:
                console.warn(`Login attempt failed \nstatus: ${status} \nUser:`, user);
                setDisplayAlert(true);
                break;
        }
    }
    return (

        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Card className="form-container">
                <CardBody>
                    <CardTitle tag="h2" className="mb-4 text-center">
                        Sign in
                    </CardTitle>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label for="email">Email address</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                onChange={handleChange}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required />
                        </FormGroup>
                        <ul className={displayAlert ? "display-alert" : "hide-alert"}>
                            <li>Email or password incorrect</li>
                        </ul>
                        <Button type="submit" color="primary" className="w-100 mt-1 mb-1">Sign in</Button>
                        <span>
                            Dont have an account?
                            <Link to="/register"> Register</Link>
                        </span>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Context } from "../../Context/Index";

export const Login = () => {

    const { authenticate } = useContext(Context);
    const [user, setUser] = useState({});
    const [invalid, setInvalid] = useState(false)
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
                setInvalid(true);
                break;
        }
    }
    return (

        <Container className="d-flex align-items-center justify-content-center">
            <Card className="form-container">
                <CardBody>
                    <CardTitle tag="h2" className="mb-4 text-center">
                        Sign in
                    </CardTitle>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label for="email">Email adress</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                onChange={handleChange}
                                value={user && user.email}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                invalid={invalid}
                                onChange={handleChange}
                                value={user && user.password}
                                required />
                        </FormGroup>
                        <Button color="primary" className="w-100 mt-3 mb-1">Sign in</Button>
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
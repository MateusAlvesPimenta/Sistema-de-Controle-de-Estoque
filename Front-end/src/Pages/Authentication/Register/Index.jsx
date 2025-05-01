import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { Context } from "../../../Context/Index";
import "../Styles.css";

export const Register = () => {

    const { authenticate } = useContext(Context);
    const [user, setUser] = useState({});
    const [touched, setTouched] = useState({});
    const [displayAlert, setDisplayAlert] = useState(false);
    const navigate = useNavigate();

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submit = async () => {
        event.preventDefault();
        if (user.password !== user.confirmPassword) {
            setDisplayAlert(true);
            return;
        }
        const status = await authenticate(user, "register");
        console.log(status)
        switch (status) {
            case 200:
                navigate("/");
                break;

            default:
                console.warn(`Invalid register \nStatus: ${status} \nUser:`, user);
                break;
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Card className="form-container">
                <CardBody>
                    <CardTitle tag="h2" className="mb-4 text-center">
                        Register
                    </CardTitle>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label for="email">Email address</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email@example.com"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={touched.email && "input-validation"}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`mb-2 ${touched.password && "input-validation"}`}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm password</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="••••••••"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                required />
                        </FormGroup>
                        Password must contain:
                        <ul>
                            <li>8+ characters</li>
                            <li>Uppercase letters</li>
                            <li>Lowercase letters</li>
                            <li>Numbers</li>
                            <li>Symbols</li>
                        </ul>
                        <ul className={displayAlert ? "display-alert" : "hide-alert"}>
                            <li>Must match password</li>
                        </ul>
                        <Button type="submit" color="primary" className="w-100 mt-1 mb-1">Register</Button>
                        <span>
                            Already have an account?
                            <Link to="/"> Sign in</Link>
                        </span>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}
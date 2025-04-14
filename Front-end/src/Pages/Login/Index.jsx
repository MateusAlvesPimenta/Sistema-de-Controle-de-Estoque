import { Link } from "react-router-dom"
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from "reactstrap"

export const Login = () => {

    const handleChange = () => {

    }
    const submit = () => {

    }
    return (

        <Container className="d-flex align-items-center justify-content-center">
            <Card className="form-container">
                <CardBody>
                    <CardTitle tag="h2" className="mb-4 text-center">
                        Sign in
                    </CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email adress</Label>
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
                                onChange={handleChange}
                                placeholder="••••••••"
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
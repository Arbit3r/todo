import axios from "axios";
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  Container,
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Auth(props) {
  //const moveTO = useNavigate();
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setDataa] = useState([]);
  axios.defaults.withCredentials = true;
  const gotToNextPage = () => moveTO("/todolist");

  const postLogin = () => {
    axios.post('http://localhost:5000/login', {
      username: username,
      password: password,
      //userId: Math.random().toString(36).slice(2);

    })

        .then((res) => res.json())
        .then((result) => {
          if (result.error_message) {
            alert(result.error_message);
          } else {
            console.log(result.data);
            localStorage.setItem("username", result.username);
            moveTO("/register");
          }
          console.log(result);
        })
        .catch((error) => console.log("Error Login form", error));
  };

  const handleUser = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value)
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value)
  };
  const handleSubmitLogin = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      postLogin(username, password);
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (

      <Container fluid="md">
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary rounded"></div>
            <Card className="shadow border border-3">
              <Card.Body>
                <div className="mb-1 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Log in</h2>
                  <p className="mb-5">Please enter your login and password!</p>
                  <div className="mb-5">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmitLogin}
                    >
                      <Form.Group  controlId="validationCustom01">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                        >
                          <Form.Control
                              required
                              type="text"
                              placeholder="User name"
                              minLength={4}
                              value={username}
                              onChange={handleUser}
                              //{...register("firstName", { required: true, maxLength: 10 })}
                          /></FloatingLabel>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Username should be more then three letter
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                          className="mb-3"
                          controlId="validationCustomPassword"
                      >
                        {/*<Form.Label className="text-center">Password</Form.Label>*/}
                        <FloatingLabel controlId="floatingPassword" label="Password">
                          <Form.Control
                              type="password"
                              placeholder="Password"
                              value={password}
                              required
                              minLength={6}
                              //pattern={Patter_PASS}
                              onChange={handlePassword}
                              /* {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: Patter_PASS,
                  })}*/
                          /></FloatingLabel>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Password should be more then three letter
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className="d-grid">
                        <Button type="submit">Log in</Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      {/*<p className="mb-0 text-center">
                      Don't have an account?
                      <a href="#" className="text-primary fw-bold">
                        Sign
                      </a>
          </p>*/}
                      <p className="mb-0 text-center">
                        Already have an account?

                          <Link className="text-primary fw-bold " to="/register"> Sign Up</Link>

                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}
export default Auth;
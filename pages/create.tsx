import Navbar from "../components/navbar"
import { useState, useReducer } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Sidebar from "../components/sidebar";


const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value

    }
}

export default function AddProduct() {

    const [formData, setFormData] = useReducer(formReducer, {})

    const handleAdd = async (e) => {
        console.log(formData, "ini form data");

        try {
            await axios.post(`http://127.0.0.1:8000/api/database/store`, formData, { withCredentials: false })
                .then(res => {
                    // console.log(res.status, 'response');

                    if (res.status === 201) {
                        console.log("sukses");
                    }
                })
        } catch (error) {
            console.log(error.message, 'GAGAL')
        }
    }

    // const handleAdd = async () => {
    //     const rawResponse = await fetch('http://127.0.0.1:8000/api/database/store', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ a: 1, b: 'Textual content' })
    //     });
    //     const content = await rawResponse.json();

    //     console.log(content);
    // };

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className='row'>
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Add Film</h1>
                        </div>
                        <Container className='form'>
                            <Form>
                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label className='add-product-label'>
                                        Title
                                    </Form.Label>
                                    <Form.Control type="text" name="title" onChange={setFormData} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label className='add-product-label'>
                                        Category
                                    </Form.Label>
                                    <Form.Control type="text" name="category" onChange={setFormData} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label className='add-product-label'>
                                        Year
                                    </Form.Label>
                                    <Form.Control type="text" name="year" onChange={setFormData} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label className='add-product-label'>
                                        Trailer
                                    </Form.Label>
                                    <Form.Control type="text" name="trailer" onChange={setFormData} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label className='add-product-label'>
                                        Poster
                                    </Form.Label>
                                    <Form.Control type="text" name="poster" onChange={setFormData} />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formBasicEmail">
                                    <Form.Label className='add-product-label'>
                                        Overview
                                    </Form.Label>
                                    <Form.Control type="text" name="overview" onChange={setFormData} />
                                </Form.Group>
                            </Form>
                            <div className='button-add-product mb-4'>
                                <Button onClick={handleAdd} className='styleButton' variant="primary" type="submit">
                                    Add
                                </Button>
                            </div>
                        </Container>
                    </main>
                </div>
            </div>
        </div>
    )
}
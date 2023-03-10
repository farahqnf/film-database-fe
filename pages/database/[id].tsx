import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import React from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";

import { Form, Button } from 'react-bootstrap';
import { useReducer } from 'react';
import axios from 'axios';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value

    }
}

export default function UpdateFIlm(props) {

    const { film } = props;
    const [formData, setFormData] = useReducer(formReducer, {})

    const router = useRouter();

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        formData.title = `${formData.title ?? film.title}`
        formData.year = `${formData.year ?? film.year}`
        formData.category = `${formData.category ?? film.category}`
        formData.poster = `${formData.poster ?? film.poster}`
        formData.trailer = `${formData.trailer ?? film.trailer}`
        formData.overview = `${formData.overview ?? film.overview}`

        await axios.put(`http://127.0.0.1:8000/api/database/${id}`, formData)
            .then(res => {
                console.log("sukses");
                router.push('/database');
                toast.success('Data Film Berhasil Diubah', {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: "colored"
                })
            })
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: "colored"
                });
            })
    }

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
                                <Row>
                                    <Col sm={12}>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>
                                                Title
                                            </Form.Label>
                                            <Form.Control type="text" defaultValue={film.title} name="title" onChange={setFormData} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Category</Form.Label>
                                            <Form.Control type="text" defaultValue={film.category} name="category" onChange={setFormData} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Year</Form.Label>
                                            <Form.Control type="text" defaultValue={film.year} name="year" onChange={setFormData} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Trailer</Form.Label>
                                            <Form.Control type="text" defaultValue={film.trailer} name="trailer" onChange={setFormData} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Poster</Form.Label>
                                            <Form.Control type="text" defaultValue={film.poster} name="poster" onChange={setFormData} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Overview</Form.Label>
                                            <Form.Control type="text" defaultValue={film.overview} name="overview" onChange={setFormData} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Row>
                                <Col>
                                    <div className='button-add-product mb-4'>
                                        <Button onClick={e => handleUpdate(e, film.id)} className='styleButton' variant="primary" type="submit">
                                            Update
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </main>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const response = await fetch('http://127.0.0.1:8000/api/my-films')
    const dataFetch = await response.json();
    const paths = dataFetch.data.map((film) => ({
        params: {
            id: `${film.id}`
        }
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(contex) {
    const { id } = contex.params;

    const response = await axios.get(`http://127.0.0.1:8000/api/my-films/${id}`)
    const dataFetch = response.data;

    return {
        props: {
            film: dataFetch.data,
        },
    };
}
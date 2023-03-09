import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// import './styleAddProduct.css';
import Image_2 from './Group_86.png';
// import styleRegister from '../../../components/Register/register.module.css';
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
const { REACT_APP_API_URL } = process.env;


function UpdateProduct() {

    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState('');
    const [trailer, setTrailer] = useState('');
    const [poster, setPoster] = useState('');
    const [overview, setOverview] = useState('');

    const { id } = useParams();

    const getFilm = async () => {

        await fetch(`http://127.0.0.1:8000/film/${id}`)
            .then(res => {
                console.log(res, 'ini res');
                // console.log(res.data.title);
                
                
                // setData(res.data)
                // setTitle(res.data.title)
                // setYear(res.data.year)
                // setCategory(res.data.category)
                // setTrailer(res.data.trailer)
                // setPoster(res.data.poster)
                // setOverview(res.data.overview)
            })
    }



    const handleUpdate = async (e) => {
        e.preventDefault();

        const status = 'available';
        let formData = new FormData();

        formData.append('title', title);
        formData.append('category', category);
        formData.append('year', year);
        formData.append('trailer', trailer);
        formData.append('poster', poster);
        formData.append('overview', overview);

        await axios.put(`http://127.0.0.1:8000/database/${id}`, formData)
            .then(res => {
                getFilm()
            })

    }

    useEffect(() => {
        getFilm();
    }, [])

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
                                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Category</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setCategory(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Year</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setYear(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Trailer</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setTrailer(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Poster</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setPoster(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label className='add-product-label'>Overview</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setOverview(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <Row>
                                <Col>
                                    <div className='button-add-product mb-4'>
                                        <Button onClick={handleUpdate} className='styleButton' variant="primary" type="submit">
                                            Update
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct

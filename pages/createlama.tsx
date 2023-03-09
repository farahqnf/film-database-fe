import Navbar from "../components/navbar"
import { useState, useReducer } from 'react';
import axios from 'axios';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Sidebar from "../components/sidebar";

export default function AddFilm() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState('');
    const [trailer, setTrailer] = useState('');
    const [poster, setPoster] = useState('');
    const [overview, setOverview] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append('title', title);
        formData.append('category', category);
        formData.append('year', year);
        formData.append('trailer', trailer);
        formData.append('poster', poster);
        formData.append('overview', overview);

        console.log(formData, 'ini formdata');
        try {
            await axios.post(`http://127.0.0.1:8000/api/database/store`, formData)
                .then(res => {
                    // console.log(res.status, 'response');
                    
                    if (res.status === 201) {
                        console.log("sukses");
                    }
                })
        } catch (error) {
            console.log(error.message, 'catch2')
        }
    };

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
                        <Container>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className='add-product-label'>
                                        Title
                                    </Form.Label>
                                    <Form.Control type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='add-product-label'>
                                        Category
                                    </Form.Label>
                                    <Form.Control type="text" name="category" onChange={(e) => setCategory(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='add-product-label'>
                                        Year
                                    </Form.Label>
                                    <Form.Control type="text" name="year" onChange={(e) => setYear(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='add-product-label'>
                                        Trailer
                                    </Form.Label>
                                    <Form.Control type="text" name="trailer" onChange={(e) => setTrailer(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='add-product-label'>
                                        Poster
                                    </Form.Label>
                                    <Form.Control type="text" name="poster" onChange={(e) => setPoster(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className='add-product-label'>
                                        Overview
                                    </Form.Label>
                                    <Form.Control type="text" name="overview" onChange={(e) => setOverview(e.target.value)} />
                                </Form.Group>
                            </Form>
                            {/* <Row>
                            <Col> */}
                            <div className='button-add-product mb-4'>
                                <Button onClick={handlePost} className='styleButton' variant="primary" type="submit">
                                    Post
                                </Button>
                            </div>
                            {/* </Col> */}
                            {/* <Col>
                            </Col> */}
                            {/* </Row> */}
                        </Container>
                    </main>
                </div>
            </div>
        </div>
    )
}
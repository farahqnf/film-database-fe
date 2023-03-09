import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Router, useRouter } from 'next/router';

export default function Database(props) {
  const { dataTable } = props;
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('ini di page');
  }, [])

  const getProducts = async () => {

    await axios.get('http://127.0.0.1:8000/database')
      .then(res => {
        setItems(res.data.product)
      })
  }

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://127.0.0.1:8000/database/delete/${id}`)
        .then(res => {
          if (res.data.status === 'success') {
            getProducts();
          }
        })
        .catch(err => {
          console.log(err, 'error')
        })
    } catch (error) {
      console.log(error, 'error')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className='row'>

          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
            </div>
            <div className="table-responsive ms-4">
              <Table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Year</th>
                    <th>Poster</th>
                    <th>Trailer</th>
                    <th>Overview</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {dataTable.map((data) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                        <td>{data.category}</td>
                        <td>{data.year}</td>
                        <td>{data.poster}</td>
                        <td>{data.trailer}</td>
                        <td>{data.overview}</td>
                        <td>
                          <a href="/database/update">Update</a>
                          <Button onClick={e => handleDelete(e, data.id)}>
                            Delete
                          </Button>

                        </td>
                      </tr>
                    </tbody>
                  )
                })}
              </Table>
            </div>
          </main>
        </div>
      </div>
    </div>

  );
}

export async function getStaticProps() {
  const response = await fetch('http://127.0.0.1:8000/my-films')
  const dataFetch = await response.json();
  console.log(dataFetch);

  return {
    props: {
      dataTable: dataFetch,
    }
  }
}





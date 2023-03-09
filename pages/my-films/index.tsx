import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Sidebar from "../../components/sidebar"
import { useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import Navbar from '../../components/navbar';

export default function MyFilms(props) {
  const { dataFilms } = props;
  const router = useRouter();

  useEffect(() => {
    console.log('ini di page');
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className='row'>

          <Sidebar />
            <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
              <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h1 className='h2'>My Films</h1>
              </div>
              <div className='row'>
                {dataFilms.map((film) => {
                  return (
                    <div className='col-lg-2 mb-3'>
                      <Card >
                        <Card.Img variant="top" src={film.poster} />
                        <Card.Body>
                          <Card.Title>{film.title}</Card.Title>
                          <Card.Text>
                            {film.category}
                          </Card.Text>
                          <Button variant="primary" onClick={() => router.push(`/my-films/${film.id}`)}>Details</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </main>
        </div>
      </div >
    </div>

  );
}

export async function getStaticProps() {
  const response = await fetch('http://127.0.0.1:8000/api/my-films')
  const dataFetch = await response.json();

  return {
    props: {
      dataFilms: dataFetch.data,
    }
  }
}
import Image from "next/image";
import axios from 'axios';
import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar";

export default function FilmDetail(props) {
    const { film } = props;
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className='row'>
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">{film.title}</h1>
                                </div>
                                <h5>{film.category} | {film.year}</h5>
                                <p>{film.overview}</p>
                                <h6><a href={ film.trailer } rel="noopener" target="_blank">Whatch the trailer</a></h6>
                            </div>
                            <div className="col-md-6 mt-4 ms-4">
                                <img src={film.poster} alt='photo' />
                            </div>
                        </div>

                    </main>
                </div>
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

    const response = await axios.get(`http://127.0.0.1:8000/my-films/${id}`)
    const dataFetch = response.data;
    
    return {
        props: {
            film: dataFetch,
        },
    };
}
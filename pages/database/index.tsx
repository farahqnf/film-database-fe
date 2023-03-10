import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';


import { Router, useRouter } from 'next/router';

export default function Database(props) {
  const { dataTable } = props;
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('ini di page dtabase');
  }, [])

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axios.get(`http://127.0.0.1:8000/api/database/delete/${id}`)
        .then(() => {
          router.reload();
          toast.success('Film Dihapus', {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 2000,
            theme: "colored"
          })
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
            <div className="table-responsive ms-1">
              <table className="table min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Year</th>
                    {/* <th className="text-center">Poster</th>
                    <th className="text-center">Trailer</th> */}
                    <th className="text-center">Overview</th>
                    <th className="text-center">Action</th>
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
                        {/* <td>
                          <div >
                            {data.poster}
                          </div>
                        </td>
                        <td>{data.trailer}</td> */}
                        <td>{data.overview}</td>
                        <td className="px-16 py-2 flex flex-justify-around gap-5">
                          <button onClick={() => { router.push(`/database/${data.id}`); }}>
                            <BiEdit size={25}></BiEdit>
                          </button>
                        </td>
                        <td>
                          <button onClick={e => handleDelete(e, data.id)}>
                            <BiTrashAlt size={25}></BiTrashAlt>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  )
                })}
              </table>
            </div>
          </main>
        </div>
      </div>

      <ToastContainer />
    </div>

  );
}

export async function getStaticProps() {
  const response = await fetch('http://127.0.0.1:8000/api/my-films')
  const dataFetch = await response.json();

  return {
    props: {
      dataTable: dataFetch.data,
    }
  }
}





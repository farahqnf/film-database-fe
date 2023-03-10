import { BiAddToQueue, BiFilm, BiFolderOpen } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';

function Sidebar() {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Button className="button-sidebar" aria-current="page" href="/my-films">
                            <BiFilm className='me-3' size={20}></BiFilm>
                            My Films
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button className="button-sidebar" href="/database">
                            <BiFolderOpen className='me-3' size={20}></BiFolderOpen>
                            Database
                        </Button>
                    </li>
                    <li className="nav-item">
                        <Button className="button-sidebar" href="/create">
                            <BiAddToQueue className='me-3' size={20}></BiAddToQueue>
                            Add New Film
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar
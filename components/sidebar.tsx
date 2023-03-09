
function Sidebar() {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light collapse">
    <div className="position-sticky pt-3">
        <ul className="nav flex-column">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/my-films">
                    <span data-feather="home"></span>
                    My Films
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/database">
                    <span data-feather="file"></span>
                    Database
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/create">
                    <span data-feather="file"></span>
                    Add New Film
                </a>
            </li>
        </ul>
    </div>
</nav>
  );
}

export default Sidebar
export default function Navbar({ setPage }) {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">

        <a className="navbar-brand" href="#">
          <h5 className="mb-0">🏍️ CRAZY WHEELS </h5>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <button className="btn btn-primary" onClick={() => setPage('owners')}>
                Usuarios
              </button>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Motocicletas</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#" onClick={() => setPage('bikes')}>Registrar motocicleta</a>
                <a className="dropdown-item" href="#" onClick={() => setPage('bikes')}>registrar aceites</a>
                <a className="dropdown-item" href="#" onClick={() => setPage('bikes')}>registrar marca</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={() => setPage('bikes')}>
                Motocicletas
              </button>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
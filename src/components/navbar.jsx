export default function Navbar({ setPage }) {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">

        <a className="navbar-brand" href="#">
          <h5 class="mb-0">🏍️ CRAZY WHEELS </h5>
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
              <button className="btn btn-primary" onClick={() => setPage('users')}>
                Usuarios
              </button>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Motocicletas</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#" onClick={() => setPage('bikes')}>Registrar motocicleta</a>
                <a class="dropdown-item" href="#" onClick={() => setPage('bikes')}>registrar aceites</a>
                <a class="dropdown-item" href="#" onClick={() => setPage('bikes')}>registrar marca</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
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
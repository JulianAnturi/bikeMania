
export default function Bikes() {

  return (

    <div className="container mt-4">

      <div className="card">

        <div className="card-header">
          <h3>Registro de Motocicletas</h3>
        </div>

        <div className="card-body">

          {/* ========================= */}
          {/* MOTORCYCLE */}
          {/* ========================= */}

          <h5 className="mb-3">Información motocicleta</h5>

          <div className="row">

            <div className="col-md-4 mb-3">
              <label className="form-label">Placa</label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Color</label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Año</label>
              <input type="number" className="form-control" />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">VIN</label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Marca motocicleta</label>

              <select className="form-select">
                <option>Yamaha</option>
                <option>Honda</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Modelo motocicleta</label>

              <select className="form-select">
                <option>FZ150</option>
                <option>NKD125</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Aceite preferido</label>

              <select className="form-select">
                <option>Motul</option>
                <option>Mobil</option>
              </select>
            </div>

          </div>

          <button className="btn btn-primary">
            Guardar
          </button>

        </div>
      </div>
    </div>
  )
}
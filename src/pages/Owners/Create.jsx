// import { OwnerController } from "../controllers/ownerController";
// import { createOwnerController } from "../controllers/ownerController";
// const ownerController = new OwnerController();
import { useState } from "react";
export default function createOwners() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    identification: "",
    identification_type: "",
    address: "",
    phone: "",
    email: "",
    birth_date: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const saveOwner = async () => {
    const response = await window.api.createOwner(form);
    console.log(response);
  }
  return (

    <div className="container mt-4">

      <div className="card">

        <div className="card-header">
          <h3>Registro de Usuarios</h3>
        </div>

        <div className="card-body">

          {/* ========================= */}
          {/* OWNER */}
          {/* ========================= */}

          <h5 className="mb-3">Información del propietario</h5>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" name="last_name" value={form.last_name} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Identificación</label>
              <input type="text" className="form-control" name="identification" value={form.identification} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Tipo identificación</label>

              <select className="form-select">
                <option>CC</option>
                <option>CE</option>
                <option>Pasaporte</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Dirección</label>
              <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono</label>
              <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha nacimiento</label>
              <input type="date" className="form-control" name="birth_date" value={form.birth_date} onChange={handleChange} />
            </div>

          </div>

          <button className="btn btn-primary" onClick={() => {
            console.log(form);
            saveOwner(form)
          }}
          >
            Guardar
          </button>

        </div>
      </div>
    </div>
  )
}
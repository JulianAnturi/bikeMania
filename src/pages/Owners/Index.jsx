import { useEffect, useState } from "react";
export default function Owners({ setPage, onCreate, onEdit }) {

    const [owners, setOwners] = useState([]);

    const getAllOwners = async () => {
        const response = await window.api.getOwners();
        console.log(response.owners);
        setOwners(response.owners);
    }
    const deleteOwner = async (ownerId) => {
        const response = await window.api.deleteOwner(ownerId);
        console.log(response);
        getAllOwners();
    }
    useEffect(() => {
        getAllOwners();
    },[]);
    return (
        <div className="container mt-4">

            <div className="card">

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h4 className="mb-0">
                        Propietarios
                    </h4>

                    <button
                        className="btn btn-primary"
                        onClick={() => setPage('createOwners')}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Nuevo Usuario
                    </button>

                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-striped table-hover align-middle">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Identificación</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>

                            </thead>

                            <tbody>

                                {owners == undefined || owners.length === 0 ? (

                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No hay registros
                                        </td>
                                    </tr>

                                ) : (

                                    owners.map((owner) => (

                                        <tr key={owner.id}>

                                            <td>{owner.id}</td>
                                            <td>{owner.name}</td>
                                            <td>{owner.last_name}</td>
                                            <td>{owner.identification}</td>
                                            <td>{owner.phone}</td>
                                            <td>{owner.email}</td>

                                            <td>

                                                <div className="btn-group">

                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        title="Editar"
                                                        onClick={() => onEdit(owner)}
                                                    >
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        title="Eliminar"
                                                        onClick={() => deleteOwner(owner.id)}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}
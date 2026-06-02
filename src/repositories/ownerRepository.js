// este es el primer paso, crear la función en el repositorio, 
// luego llamarla desde el servicio, el servicio se utiliza para realizar validaciones y logica de negocio. 
// Luego se llama al servicio desde el controlador, el controlador se encarga de recibir la petición y enviar la respuesta.
// finalmente se llama al controlador desde el ipcHandler para exponer la funcionalidad a la interfaz de usuario.

import db from '../database/database.js';

export function createOwner(ownerData) {

  const stmt = db.prepare(`
    INSERT INTO owners (
      name,
      last_name,
      identification,
      identification_type,
      address,
      phone,
      email,
      birth_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    ownerData.name,
    ownerData.last_name,
    ownerData.identification,
    ownerData.identification_type,
    ownerData.address,
    ownerData.phone,
    ownerData.email,
    ownerData.birth_date
  );

  return result.lastInsertRowid;
}
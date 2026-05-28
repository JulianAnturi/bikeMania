// seed.js
const db = require('./database'); // Ajusta la ruta según tu estructura

// -----------------------------
// 1. Limpieza de tablas (orden inverso a las dependencias)
// -----------------------------
function clearTables() {
  console.log('Limpiando datos existentes...');
  
  // Desactivar temporalmente las restricciones FK para poder truncar
  db.pragma('foreign_keys = OFF');
  
  const tables = [
    'pending_sync',
    'attachments',
    'client_devices',
    'notifications',
    'invoice_details',
    'invoices',
    'appointments',
    'maintenance_details',
    'maintenance_oils',
    'maintenance',
    'motorcycles',
    'workshop_users',
    'oils',
    'motorcycle_models',
    'part_brands',
    'oil_brands',
    'motorcycle_brands',
    'owners',
    'users',
    'predefined_services',
    'procedures',
    'parts'
  ];
  
  for (const table of tables) {
    try {
      db.prepare(`DELETE FROM ${table}`).run();
      console.log(`Limpiada tabla ${table}`);
    } catch (err) {
      console.log(`No se pudo limpiar ${table}: ${err.message}`);
    }
  }
  
  // Resetear secuencias de autoincremento (SQLite lo hace automáticamente al borrar)
  db.pragma('foreign_keys = ON');
  console.log('Limpieza completada.\n');
}

// -----------------------------
// 2. Inserción de datos de prueba
// -----------------------------
function insertSeedData() {
  console.log('Insertando datos de prueba...');
  
  // --- USERS (clientes con credenciales) ---
  const users = [
    { username: 'jperez', password: 'hash_clave123' },
    { username: 'mgomez', password: 'hash_segura456' },
    { username: 'lrodriguez', password: 'hash_moto789' },
  ];
  const userIds = [];
  for (const u of users) {
    const info = db.prepare(`
      INSERT INTO users (username, password) 
      VALUES (?, ?)
    `).run(u.username, u.password);
    userIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${users.length} usuarios clientes`);
  
  // --- OWNERS ---
  const ownersData = [
    { name: 'Juan', last_name: 'Pérez', identification: '12345678', identification_type: 'DNI', address: 'Av. Siempre Viva 123', phone: '555-1234', email: 'jperez@email.com', birth_date: '1980-05-15' },
    { name: 'María', last_name: 'Gómez', identification: '87654321', identification_type: 'DNI', address: 'Calle Falsa 456', phone: '555-5678', email: 'mgomez@email.com', birth_date: '1992-11-22' },
    { name: 'Luis', last_name: 'Rodríguez', identification: '11223344', identification_type: 'RUT', address: 'Av. Libertador 789', phone: '555-9012', email: 'lrodriguez@email.com', birth_date: '1985-07-30' },
    { name: 'Ana', last_name: 'Martínez', identification: '55667788', identification_type: 'DNI', address: 'Calle 9 de Julio 321', phone: '555-3456', email: 'amartinez@email.com', birth_date: '1995-03-10' },
  ];
  const ownerIds = [];
  for (const o of ownersData) {
    const info = db.prepare(`
      INSERT INTO owners (name, last_name, identification, identification_type, address, phone, email, birth_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(o.name, o.last_name, o.identification, o.identification_type, o.address, o.phone, o.email, o.birth_date);
    ownerIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${ownersData.length} dueños`);
  
  // --- MOTORCYCLE BRANDS ---
  const bikeBrands = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'KTM', 'BMW'];
  const bikeBrandIds = [];
  for (const name of bikeBrands) {
    const info = db.prepare(`INSERT INTO motorcycle_brands (name) VALUES (?)`).run(name);
    bikeBrandIds.push(info.lastInsertRowid);
  }
  console.log(`Insertadas ${bikeBrands.length} marcas de motos`);
  
  // --- OIL BRANDS ---
  const oilBrands = ['Castrol', 'Mobil', 'Motul', 'Shell', 'Total', 'Repsol'];
  const oilBrandIds = [];
  for (const name of oilBrands) {
    const info = db.prepare(`INSERT INTO oil_brands (name) VALUES (?)`).run(name);
    oilBrandIds.push(info.lastInsertRowid);
  }
  console.log(`Insertadas ${oilBrands.length} marcas de aceite`);
  
  // --- PART BRANDS ---
  const partBrands = ['Brembo', 'NGK', 'Bosch', 'Shinko', 'Michelin', 'DID'];
  const partBrandIds = [];
  for (const name of partBrands) {
    const info = db.prepare(`INSERT INTO part_brands (name) VALUES (?)`).run(name);
    partBrandIds.push(info.lastInsertRowid);
  }
  console.log(`Insertadas ${partBrands.length} marcas de repuestos`);
  
  // --- MOTORCYCLE MODELS ---
  const models = [
    { brand_id: bikeBrandIds[0], name: 'CB190R', engine_capacity: '190cc' },
    { brand_id: bikeBrandIds[0], name: 'XR150L', engine_capacity: '150cc' },
    { brand_id: bikeBrandIds[1], name: 'FZ-16', engine_capacity: '160cc' },
    { brand_id: bikeBrandIds[1], name: 'MT-03', engine_capacity: '320cc' },
    { brand_id: bikeBrandIds[2], name: 'GSX-R150', engine_capacity: '150cc' },
    { brand_id: bikeBrandIds[2], name: 'V-Strom 650', engine_capacity: '650cc' },
    { brand_id: bikeBrandIds[3], name: 'Ninja 400', engine_capacity: '400cc' },
  ];
  const modelIds = [];
  for (const m of models) {
    const info = db.prepare(`
      INSERT INTO motorcycle_models (brand_id, name, engine_capacity)
      VALUES (?, ?, ?)
    `).run(m.brand_id, m.name, m.engine_capacity);
    modelIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${models.length} modelos de moto`);
  
  // --- OILS ---
  const oilsData = [
    { brand_id: oilBrandIds[0], viscosity: '10W-40', type: 'semi-synthetic', reference_price: 15.50 },
    { brand_id: oilBrandIds[0], viscosity: '20W-50', type: 'mineral', reference_price: 12.00 },
    { brand_id: oilBrandIds[1], viscosity: '5W-30', type: 'synthetic', reference_price: 22.00 },
    { brand_id: oilBrandIds[2], viscosity: '10W-40', type: 'synthetic', reference_price: 18.75 },
    { brand_id: oilBrandIds[3], viscosity: '15W-50', type: 'semi-synthetic', reference_price: 14.25 },
  ];
  const oilIds = [];
  for (const o of oilsData) {
    const info = db.prepare(`
      INSERT INTO oils (brand_id, viscosity, type, reference_price)
      VALUES (?, ?, ?, ?)
    `).run(o.brand_id, o.viscosity, o.type, o.reference_price);
    oilIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${oilsData.length} aceites`);
  
  // --- WORKSHOP USERS ---
  const workshopUsers = [
    { name: 'Carlos Mecánico', email: 'carlos@taller.com', password_hash: 'hash_admin123', role: 'admin', is_active: 1 },
    { name: 'Laura Supervisora', email: 'laura@taller.com', password_hash: 'hash_manager456', role: 'manager', is_active: 1 },
    { name: 'Pedro Mecánico', email: 'pedro@taller.com', password_hash: 'hash_mech789', role: 'mechanic', is_active: 1 },
    { name: 'Sofía Recepcionista', email: 'sofia@taller.com', password_hash: 'hash_recep000', role: 'receptionist', is_active: 1 },
  ];
  const workshopUserIds = [];
  for (const wu of workshopUsers) {
    const info = db.prepare(`
      INSERT INTO workshop_users (name, email, password_hash, role, is_active)
      VALUES (?, ?, ?, ?, ?)
    `).run(wu.name, wu.email, wu.password_hash, wu.role, wu.is_active);
    workshopUserIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${workshopUsers.length} usuarios del taller`);
  
  // --- PARTS (repuestos) ---
  const partsData = [
    { name: 'Filtro de aceite', description: 'Filtro original', stock: 20, minimum_stock: 5, purchase_price: 5.00, sale_price: 8.50, brand_id: partBrandIds[2] },
    { name: 'Pastillas de freno delanteras', description: 'Sinterizadas', stock: 12, minimum_stock: 3, purchase_price: 12.00, sale_price: 18.00, brand_id: partBrandIds[0] },
    { name: 'Bujía', description: 'Iridio', stock: 30, minimum_stock: 10, purchase_price: 3.50, sale_price: 6.00, brand_id: partBrandIds[1] },
    { name: 'Cadena de transmisión', description: 'O-ring', stock: 8, minimum_stock: 2, purchase_price: 25.00, sale_price: 40.00, brand_id: partBrandIds[5] },
    { name: 'Neumático trasero', description: 'Touring', stock: 4, minimum_stock: 2, purchase_price: 70.00, sale_price: 110.00, brand_id: partBrandIds[4] },
  ];
  const partIds = [];
  for (const p of partsData) {
    const info = db.prepare(`
      INSERT INTO parts (name, description, stock, minimum_stock, purchase_price, sale_price, brand_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(p.name, p.description, p.stock, p.minimum_stock, p.purchase_price, p.sale_price, p.brand_id);
    partIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${partsData.length} repuestos`);
  
  // --- PROCEDURES (servicios) ---
  const proceduresData = [
    { name: 'Cambio de aceite y filtro', description: 'Incluye drenaje y relleno', estimated_time_minutes: 30, labor_cost: 20.00 },
    { name: 'Ajuste de frenos', description: 'Limpieza y ajuste de pastillas', estimated_time_minutes: 20, labor_cost: 15.00 },
    { name: 'Revisión de transmisión', description: 'Limpieza y lubricación de cadena', estimated_time_minutes: 25, labor_cost: 18.00 },
    { name: 'Cambio de bujía', description: 'Reemplazo de bujía', estimated_time_minutes: 15, labor_cost: 10.00 },
  ];
  const procedureIds = [];
  for (const proc of proceduresData) {
    const info = db.prepare(`
      INSERT INTO procedures (name, description, estimated_time_minutes, labor_cost)
      VALUES (?, ?, ?, ?)
    `).run(proc.name, proc.description, proc.estimated_time_minutes, proc.labor_cost);
    procedureIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${proceduresData.length} procedimientos`);
  
  // --- PREDEFINED SERVICES ---
  const predefinedServices = [
    { name: 'Servicio Básico', description: 'Cambio de aceite + ajuste de frenos', base_cost: 45.00, estimated_duration: 60, is_active: 1 },
    { name: 'Servicio Completo', description: 'Cambio de aceite, filtro, bujía y ajuste general', base_cost: 85.00, estimated_duration: 120, is_active: 1 },
    { name: 'Checkup Express', description: 'Solo inspección visual y ajustes menores', base_cost: 25.00, estimated_duration: 30, is_active: 1 },
  ];
  for (const svc of predefinedServices) {
    db.prepare(`
      INSERT INTO predefined_services (name, description, base_cost, estimated_duration, is_active)
      VALUES (?, ?, ?, ?, ?)
    `).run(svc.name, svc.description, svc.base_cost, svc.estimated_duration, svc.is_active);
  }
  console.log(`Insertados ${predefinedServices.length} servicios predefinidos`);
  
  // --- MOTORCYCLES ---
  const motorcyclesData = [
    { plate: 'ABC123', color: 'Rojo', owner_id: ownerIds[0], model_id: modelIds[0], preferred_oil_id: oilIds[0], year: 2020, vin: 'JH2SC5729K123456' },
    { plate: 'XYZ789', color: 'Negro', owner_id: ownerIds[1], model_id: modelIds[2], preferred_oil_id: oilIds[1], year: 2021, vin: 'JYARJ01E6KA012345' },
    { plate: 'LMN456', color: 'Azul', owner_id: ownerIds[2], model_id: modelIds[3], preferred_oil_id: oilIds[2], year: 2022, vin: 'WB10C090XKZ98765' },
    { plate: 'QWE111', color: 'Blanco', owner_id: ownerIds[3], model_id: modelIds[4], preferred_oil_id: oilIds[3], year: 2019, vin: 'MBLHRN1A4K5001234' },
    { plate: 'RTY222', color: 'Gris', owner_id: ownerIds[0], model_id: modelIds[5], preferred_oil_id: oilIds[4], year: 2023, vin: 'VF7MAHX0J8U567890' },
  ];
  const motorcycleIds = [];
  for (const m of motorcyclesData) {
    const info = db.prepare(`
      INSERT INTO motorcycles (plate, color, owner_id, model_id, preferred_oil_id, year, vin)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(m.plate, m.color, m.owner_id, m.model_id, m.preferred_oil_id, m.year, m.vin);
    motorcycleIds.push(info.lastInsertRowid);
  }
  console.log(`Insertadas ${motorcyclesData.length} motos`);
  
  // --- MAINTENANCE (registros de mantenimiento) ---
  const maintenanceData = [
    { motorcycle_id: motorcycleIds[0], date: '2024-01-15', mileage: 5000, next_mileage: 10000, notes: 'Cambio de aceite y filtro', mechanic_id: workshopUserIds[2] },
    { motorcycle_id: motorcycleIds[0], date: '2024-06-20', mileage: 10000, next_mileage: 15000, notes: 'Ajuste de frenos y lubricación de cadena', mechanic_id: workshopUserIds[2] },
    { motorcycle_id: motorcycleIds[1], date: '2024-02-10', mileage: 3000, next_mileage: 8000, notes: 'Servicio de los 3000 km', mechanic_id: workshopUserIds[0] },
    { motorcycle_id: motorcycleIds[2], date: '2024-03-05', mileage: 8000, next_mileage: 13000, notes: 'Revisión general', mechanic_id: workshopUserIds[2] },
  ];
  const maintenanceIds = [];
  for (const mt of maintenanceData) {
    const info = db.prepare(`
      INSERT INTO maintenance (motorcycle_id, date, mileage, next_mileage, notes, mechanic_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(mt.motorcycle_id, mt.date, mt.mileage, mt.next_mileage, mt.notes, mt.mechanic_id);
    maintenanceIds.push(info.lastInsertRowid);
  }
  console.log(`Insertados ${maintenanceData.length} mantenimientos`);
  
  // --- MAINTENANCE OILS (aceites usados en cada mantenimiento) ---
  const maintOils = [
    { maintenance_id: maintenanceIds[0], oil_id: oilIds[0], quantity_liters: 1.2, unit_cost: 12.00 },
    { maintenance_id: maintenanceIds[0], oil_id: oilIds[1], quantity_liters: 0.5, unit_cost: 8.00 },
    { maintenance_id: maintenanceIds[1], oil_id: oilIds[0], quantity_liters: 1.2, unit_cost: 12.50 },
    { maintenance_id: maintenanceIds[2], oil_id: oilIds[2], quantity_liters: 1.0, unit_cost: 18.00 },
    { maintenance_id: maintenanceIds[3], oil_id: oilIds[3], quantity_liters: 1.2, unit_cost: 14.00 },
  ];
  for (const mo of maintOils) {
    db.prepare(`
      INSERT INTO maintenance_oils (maintenance_id, oil_id, quantity_liters, unit_cost)
      VALUES (?, ?, ?, ?)
    `).run(mo.maintenance_id, mo.oil_id, mo.quantity_liters, mo.unit_cost);
  }
  console.log(`Insertados ${maintOils.length} asignaciones de aceite a mantenimientos`);
  
  // --- MAINTENANCE DETAILS ---
  const maintDetails = [
    { maintenance_id: maintenanceIds[0], procedure_id: procedureIds[0], part_id: partIds[0], part_quantity: 1, labor_cost: 20.00, part_cost: 5.00, notes: 'Filtro incluido' },
    { maintenance_id: maintenanceIds[1], procedure_id: procedureIds[1], part_id: partIds[1], part_quantity: 1, labor_cost: 15.00, part_cost: 12.00, notes: 'Pastillas nuevas' },
    { maintenance_id: maintenanceIds[2], procedure_id: procedureIds[2], part_id: null, part_quantity: null, labor_cost: 18.00, part_cost: null, notes: 'Solo lubricación' },
    { maintenance_id: maintenanceIds[3], procedure_id: procedureIds[3], part_id: partIds[2], part_quantity: 1, labor_cost: 10.00, part_cost: 3.50, notes: 'Bujía nueva' },
  ];
  for (const md of maintDetails) {
    db.prepare(`
      INSERT INTO maintenance_details (maintenance_id, procedure_id, part_id, part_quantity, labor_cost, part_cost, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(md.maintenance_id, md.procedure_id, md.part_id, md.part_quantity, md.labor_cost, md.part_cost, md.notes);
  }
  console.log(`Insertados ${maintDetails.length} detalles de mantenimiento`);
  
  // --- APPOINTMENTS ---
  const appointmentsData = [
    { motorcycle_id: motorcycleIds[0], scheduled_at: '2024-07-10 09:00:00', status: 'completed', service_type: 'Cambio de aceite', customer_notes: 'Revisar frenos', workshop_notes: 'Cliente puntual', created_by_user_id: workshopUserIds[3], maintenance_id: maintenanceIds[0] },
    { motorcycle_id: motorcycleIds[1], scheduled_at: '2024-07-15 14:30:00', status: 'pending', service_type: 'Ajuste general', customer_notes: 'Ruido en cadena', workshop_notes: null, created_by_user_id: workshopUserIds[3], maintenance_id: null },
    { motorcycle_id: motorcycleIds[2], scheduled_at: '2024-07-20 11:00:00', status: 'confirmed', service_type: 'Cambio de bujía', customer_notes: 'Traer repuesto', workshop_notes: 'Confirmado por teléfono', created_by_user_id: workshopUserIds[3], maintenance_id: null },
    { motorcycle_id: motorcycleIds[3], scheduled_at: '2024-08-01 10:15:00', status: 'in_progress', service_type: 'Servicio completo', customer_notes: '', workshop_notes: 'En taller ahora', created_by_user_id: workshopUserIds[3], maintenance_id: maintenanceIds[3] },
  ];
  for (const ap of appointmentsData) {
    db.prepare(`
      INSERT INTO appointments (motorcycle_id, scheduled_at, status, service_type, customer_notes, workshop_notes, created_by_user_id, maintenance_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(ap.motorcycle_id, ap.scheduled_at, ap.status, ap.service_type, ap.customer_notes, ap.workshop_notes, ap.created_by_user_id, ap.maintenance_id);
  }
  console.log(`Insertadas ${appointmentsData.length} citas`);
  
  // --- INVOICES ---
  const invoicesData = [
    { owner_id: ownerIds[0], date: '2024-01-15', subtotal: 45.50, tax: 8.19, discount: 0, total: 53.69, status: 'paid', payment_method: 'cash', payment_date: '2024-01-15 18:00:00' },
    { owner_id: ownerIds[0], date: '2024-06-20', subtotal: 38.00, tax: 6.84, discount: 5.00, total: 39.84, status: 'paid', payment_method: 'card', payment_date: '2024-06-20 17:30:00' },
    { owner_id: ownerIds[1], date: '2024-02-10', subtotal: 25.00, tax: 4.50, discount: 0, total: 29.50, status: 'pending', payment_method: null, payment_date: null },
    { owner_id: ownerIds[2], date: '2024-03-05', subtotal: 62.00, tax: 11.16, discount: 2.00, total: 71.16, status: 'paid', payment_method: 'transfer', payment_date: '2024-03-06 09:20:00' },
  ];
  const invoiceIds = [];
  for (const inv of invoicesData) {
    const info = db.prepare(`
      INSERT INTO invoices (owner_id, date, subtotal, tax, discount, total, status, payment_method, payment_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(inv.owner_id, inv.date, inv.subtotal, inv.tax, inv.discount, inv.total, inv.status, inv.payment_method, inv.payment_date);
    invoiceIds.push(info.lastInsertRowid);
  }
  console.log(`Insertadas ${invoicesData.length} facturas`);
  
  // --- INVOICE DETAILS ---
  const invoiceDetailsData = [
    { invoice_id: invoiceIds[0], maintenance_id: maintenanceIds[0], description: 'Cambio de aceite y filtro', item_type: 'maintenance', cost: 45.50 },
    { invoice_id: invoiceIds[1], maintenance_id: maintenanceIds[1], description: 'Ajuste de frenos + lubricación', item_type: 'maintenance', cost: 38.00 },
    { invoice_id: invoiceIds[2], maintenance_id: null, description: 'Consulta mecánica', item_type: 'service', cost: 25.00 },
    { invoice_id: invoiceIds[3], maintenance_id: maintenanceIds[3], description: 'Revisión general + bujía', item_type: 'maintenance', cost: 62.00 },
  ];
  for (const invd of invoiceDetailsData) {
    db.prepare(`
      INSERT INTO invoice_details (invoice_id, maintenance_id, description, item_type, cost)
      VALUES (?, ?, ?, ?, ?)
    `).run(invd.invoice_id, invd.maintenance_id, invd.description, invd.item_type, invd.cost);
  }
  console.log(`Insertados ${invoiceDetailsData.length} detalles de factura`);
  
  // --- NOTIFICATIONS ---
  const notificationsData = [
    { owner_id: ownerIds[0], type: 'maintenance_reminder', message: 'Su próximo cambio de aceite es a los 15000 km', scheduled_at: '2024-08-01 08:00:00', sent: 0, read: 0 },
    { owner_id: ownerIds[1], type: 'appointment_reminder', message: 'Recordatorio de cita para el 15/07', scheduled_at: '2024-07-14 10:00:00', sent: 1, read: 1, sent_at: '2024-07-14 10:00:01' },
    { owner_id: ownerIds[2], type: 'promotion', message: 'Descuento en servicio completo hasta fin de mes', scheduled_at: '2024-07-01 00:00:00', sent: 1, read: 0, sent_at: '2024-07-01 00:05:00' },
  ];
  for (const notif of notificationsData) {
    db.prepare(`
      INSERT INTO notifications (owner_id, type, message, scheduled_at, sent, read, sent_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(notif.owner_id, notif.type, notif.message, notif.scheduled_at, notif.sent, notif.read, notif.sent_at);
  }
  console.log(`Insertadas ${notificationsData.length} notificaciones`);
  
  // --- CLIENT DEVICES ---
  const devicesData = [
    { owner_id: ownerIds[0], push_token: 'ExpoPushToken_aaa111', platform: 'android', last_used: '2024-07-01 12:00:00', is_active: 1 },
    { owner_id: ownerIds[1], push_token: 'ExpoPushToken_bbb222', platform: 'ios', last_used: '2024-06-28 18:30:00', is_active: 1 },
    { owner_id: ownerIds[2], push_token: 'ExpoPushToken_ccc333', platform: 'web', last_used: '2024-07-10 09:15:00', is_active: 1 },
  ];
  for (const dev of devicesData) {
    db.prepare(`
      INSERT INTO client_devices (owner_id, push_token, platform, last_used, is_active)
      VALUES (?, ?, ?, ?, ?)
    `).run(dev.owner_id, dev.push_token, dev.platform, dev.last_used, dev.is_active);
  }
  console.log(`Insertados ${devicesData.length} dispositivos de clientes`);
  
  // --- ATTACHMENTS ---
  const attachmentsData = [
    { entity_type: 'maintenance', entity_id: maintenanceIds[0], file_path: '/uploads/order_cb190r.pdf', file_type: 'application/pdf', original_name: 'orden_trabajo_cb190.pdf', size_kb: 245, uploaded_by_user_id: workshopUserIds[2] },
    { entity_type: 'motorcycle', entity_id: motorcycleIds[1], file_path: '/uploads/foto_moto_xyz789.jpg', file_type: 'image/jpeg', original_name: 'foto_moto.jpg', size_kb: 1024, uploaded_by_user_id: workshopUserIds[3] },
    { entity_type: 'invoice', entity_id: invoiceIds[0], file_path: '/uploads/factura_123.pdf', file_type: 'application/pdf', original_name: 'factura_123.pdf', size_kb: 530, uploaded_by_user_id: workshopUserIds[0] },
  ];
  for (const att of attachmentsData) {
    db.prepare(`
      INSERT INTO attachments (entity_type, entity_id, file_path, file_type, original_name, size_kb, uploaded_by_user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(att.entity_type, att.entity_id, att.file_path, att.file_type, att.original_name, att.size_kb, att.uploaded_by_user_id);
  }
  console.log(`Insertados ${attachmentsData.length} archivos adjuntos`);
  
  // --- PENDING SYNC (opcional) ---
  const pendingSyncData = [
    { table_name: 'maintenance', record_id: maintenanceIds[0], operation: 'insert', payload_json: JSON.stringify({ id: maintenanceIds[0], notes: 'Cambio de aceite' }), attempts: 0, synced: 0 },
    { table_name: 'invoices', record_id: invoiceIds[2], operation: 'update', payload_json: JSON.stringify({ id: invoiceIds[2], status: 'pending' }), attempts: 1, synced: 0 },
  ];
  for (const ps of pendingSyncData) {
    db.prepare(`
      INSERT INTO pending_sync (table_name, record_id, operation, payload_json, attempts, synced)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(ps.table_name, ps.record_id, ps.operation, ps.payload_json, ps.attempts, ps.synced);
  }
  console.log(`Insertados ${pendingSyncData.length} registros de sincronización pendiente`);
  
  console.log('\n ¡Seeder completado exitosamente!\n');
}

// -----------------------------
// 3. Ejecutar el seeder dentro de una transacción
// -----------------------------
try {
  const seedTransaction = db.transaction(() => {
    clearTables();
    insertSeedData();
  });
  seedTransaction();
  console.log('Base de datos poblada con datos de prueba.');
} catch (error) {
  console.error('Error durante el seeding:', error.message);
  process.exit(1);
}
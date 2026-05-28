PRAGMA foreign_keys = ON;

-- ============================================
-- OWNERS (CUSTOMERS)
-- ============================================

CREATE TABLE owners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    identification TEXT,
    identification_type TEXT,
    address TEXT,
    phone TEXT,
    email TEXT UNIQUE,
    birth_date DATE,
    is_active BOOLEAN DEFAULT 1,
    deactivated_at DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BRANDS (SEPARATED BY DOMAIN)
-- ============================================

CREATE TABLE motorcycle_brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

CREATE TABLE oil_brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

CREATE TABLE part_brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

-- ============================================
-- MODELS
-- ============================================

CREATE TABLE motorcycle_models (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER,
    name TEXT,
    engine_capacity TEXT,
    FOREIGN KEY (brand_id) REFERENCES motorcycle_brands(id)
);

-- ============================================
-- OILS
-- ============================================

CREATE TABLE oils (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER,
    viscosity TEXT,
    type TEXT CHECK(type IN ('mineral','synthetic','semi-synthetic')),
    reference_price REAL,
    FOREIGN KEY (brand_id) REFERENCES oil_brands(id)
);

-- ============================================
-- MOTORCYCLES
-- ============================================

CREATE TABLE motorcycles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate TEXT UNIQUE,
    color TEXT,
    owner_id INTEGER,
    model_id INTEGER,
    preferred_oil_id INTEGER,
    year INTEGER,
    vin TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(id),
    FOREIGN KEY (model_id) REFERENCES motorcycle_models(id),
    FOREIGN KEY (preferred_oil_id) REFERENCES oils(id)
);

-- ============================================
-- WORKSHOP USERS
-- ============================================

CREATE TABLE workshop_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password_hash TEXT,
    role TEXT CHECK(role IN ('admin','manager','mechanic','receptionist')),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

-- ============================================
-- MAINTENANCE
-- ============================================

CREATE TABLE maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motorcycle_id INTEGER,
    date DATE,
    mileage INTEGER,
    next_mileage INTEGER,
    notes TEXT,
    mechanic_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (motorcycle_id) REFERENCES motorcycles(id),
    FOREIGN KEY (mechanic_id) REFERENCES workshop_users(id)
);

-- ============================================
-- MAINTENANCE OILS (N:N)
-- ============================================

CREATE TABLE maintenance_oils (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    maintenance_id INTEGER,
    oil_id INTEGER,
    quantity_liters REAL,
    unit_cost REAL,
    FOREIGN KEY (maintenance_id) REFERENCES maintenance(id),
    FOREIGN KEY (oil_id) REFERENCES oils(id)
);

-- ============================================
-- MOTORCYCLE PARTS
-- ============================================

CREATE TABLE parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    stock INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 0,
    purchase_price REAL,
    sale_price REAL,
    brand_id INTEGER,
    FOREIGN KEY (brand_id) REFERENCES part_brands(id)
);

-- ============================================
-- PROCEDURES (SERVICES)
-- ============================================

CREATE TABLE procedures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    estimated_time_minutes INTEGER,
    labor_cost REAL
);

-- ============================================
-- MAINTENANCE DETAILS
-- ============================================

CREATE TABLE maintenance_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    maintenance_id INTEGER,
    procedure_id INTEGER,
    part_id INTEGER,
    part_quantity INTEGER DEFAULT 1,
    labor_cost REAL,
    part_cost REAL,
    notes TEXT,
    FOREIGN KEY (maintenance_id) REFERENCES maintenance(id),
    FOREIGN KEY (procedure_id) REFERENCES procedures(id),
    FOREIGN KEY (part_id) REFERENCES parts(id)
);

-- ============================================
-- PREDEFINED SERVICES
-- ============================================

CREATE TABLE predefined_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    base_cost REAL,
    estimated_duration INTEGER,
    is_active BOOLEAN DEFAULT 1
);

-- ============================================
-- APPOINTMENTS
-- ============================================

CREATE TABLE appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motorcycle_id INTEGER,
    scheduled_at DATETIME,
    status TEXT CHECK(status IN ('pending','confirmed','in_progress','completed','cancelled')),
    service_type TEXT,
    customer_notes TEXT,
    workshop_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    maintenance_id INTEGER,
    created_by_user_id INTEGER,
    FOREIGN KEY (motorcycle_id) REFERENCES motorcycles(id),
    FOREIGN KEY (maintenance_id) REFERENCES maintenance(id),
    FOREIGN KEY (created_by_user_id) REFERENCES workshop_users(id)
);

-- ============================================
-- INVOICING
-- ============================================

CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER,
    date DATE,
    subtotal REAL,
    tax REAL,
    discount REAL DEFAULT 0,
    total REAL,
    status TEXT CHECK(status IN ('pending','paid','cancelled')),
    payment_method TEXT CHECK(payment_method IN ('cash','card','transfer')),
    payment_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- ============================================
-- INVOICE DETAILS
-- ============================================

CREATE TABLE invoice_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER,
    maintenance_id INTEGER,
    description TEXT,
    item_type TEXT,
    cost REAL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    FOREIGN KEY (maintenance_id) REFERENCES maintenance(id)
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER,
    type TEXT,
    message TEXT,
    scheduled_at DATETIME,
    sent BOOLEAN DEFAULT 0,
    read BOOLEAN DEFAULT 0,
    sent_at DATETIME,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- ============================================
-- CLIENT DEVICES
-- ============================================

CREATE TABLE client_devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER,
    push_token TEXT UNIQUE,
    platform TEXT CHECK(platform IN ('ios','android','web')),
    last_used DATETIME,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- ============================================
-- ATTACHMENTS
-- ============================================

CREATE TABLE attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT,
    entity_id INTEGER,
    file_path TEXT,
    file_type TEXT,
    original_name TEXT,
    size_kb INTEGER,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    uploaded_by_user_id INTEGER,
    FOREIGN KEY (uploaded_by_user_id) REFERENCES workshop_users(id)
);

-- ============================================
-- SYNC SYSTEM
-- ============================================

CREATE TABLE pending_sync (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT,
    record_id INTEGER,
    operation TEXT CHECK(operation IN ('insert','update','delete')),
    payload_json TEXT,
    attempts INTEGER DEFAULT 0,
    synced BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    synced_at DATETIME
);
-- Seed Clients
INSERT INTO clients (name, email, phone, company, status, location, industry, notes, created_at) VALUES
('Arjun Sharma', 'arjun@techcorp.com', '9123456789', 'TechCorp Solutions', 'active', 'Chennai', 'Technology', 'Long-term client', '2024-01-15'),
('Priya Nair', 'priya@designstudio.com', '9234567890', 'DesignStudio Pvt', 'active', 'Bangalore', 'Design', 'Referred by Arjun', '2024-02-20'),
('Ravi Kumar', 'ravi@startupx.com', '9345678901', 'StartupX Labs', 'inactive', 'Hyderabad', 'Startup', 'Project on hold', '2024-03-10'),
('Meera Patel', 'meera@ecommerce.com', '9456789012', 'ShopEasy India', 'active', 'Mumbai', 'E-Commerce', 'New client', '2024-04-05');

-- Seed Projects
INSERT INTO projects (title, description, status, budget, paid, deadline, start_date, priority, tags, client_id) VALUES
('E-Commerce Website Redesign', 'Full redesign with modern React UI', 'in_progress', 85000.00, 42500.00, '2024-12-31', '2024-10-01', 'high', 'web,react', 1),
('Mobile App UI Design', 'UI/UX for Android and iOS app', 'completed', 45000.00, 45000.00, '2024-11-15', '2024-09-01', 'medium', 'mobile,figma', 2),
('Brand Identity Package', 'Logo, colors, typography for brand', 'pending', 30000.00, 0.00, '2025-01-15', '2024-12-01', 'low', 'branding', 4),
('Dashboard Analytics Tool', 'Admin dashboard with charts', 'in_progress', 70000.00, 35000.00, '2024-12-20', '2024-10-15', 'high', 'web,charts', 1);

-- Seed Invoices
INSERT INTO invoices (invoice_number, status, subtotal, tax, total, due_date, issue_date, notes, client_id, project_id) VALUES
('INV-2024-001', 'paid', 42500.00, 7650.00, 50150.00, '2024-11-01', '2024-10-01', 'First milestone payment', 1, 1),
('INV-2024-002', 'sent', 45000.00, 8100.00, 53100.00, '2024-11-30', '2024-11-01', 'Full project payment', 2, 2),
('INV-2024-003', 'draft', 35000.00, 6300.00, 41300.00, '2024-12-15', '2024-11-15', 'Second milestone', 1, 4),
('INV-2024-004', 'overdue', 15000.00, 2700.00, 17700.00, '2024-10-31', '2024-10-01', 'Advance payment', 3, 3);

-- Seed Invoice Items
INSERT INTO invoice_items (description, quantity, rate, amount, invoice_id) VALUES
('UI Design - Homepage', 1, 15000.00, 15000.00, 1),
('UI Design - Product Pages', 1, 12000.00, 12000.00, 1),
('Frontend Development', 1, 15500.00, 15500.00, 1),
('Mobile UI - Android Screens', 20, 1500.00, 30000.00, 2),
('Mobile UI - iOS Screens', 10, 1500.00, 15000.00, 2),
('Dashboard Layout Design', 1, 20000.00, 20000.00, 3),
('Charts Integration', 1, 15000.00, 15000.00, 3),
('Brand Logo Design', 1, 10000.00, 10000.00, 4),
('Brand Guidelines', 1, 5000.00, 5000.00, 4);

-- Seed Payments
INSERT INTO payments (amount, method, transaction_id, paid_date, notes, invoice_id) VALUES
(50150.00, 'UPI', 'UPI202410010001', '2024-10-15', 'Paid via Google Pay', 1),
(53100.00, 'NEFT', 'NEFT202411150001', '2024-11-15', 'Bank transfer completed', 2);

-- Seed Expenses
INSERT INTO expenses (category, amount, description, date, vendor) VALUES
('Software', 2999.00, 'Adobe Creative Cloud Monthly', '2024-11-01', 'Adobe Inc'),
('Equipment', 15000.00, 'External SSD 1TB', '2024-10-20', 'Amazon India'),
('Marketing', 5000.00, 'LinkedIn Premium', '2024-11-01', 'LinkedIn'),
('Internet', 1499.00, 'Broadband Bill November', '2024-11-05', 'JioFiber'),
('Software', 1500.00, 'Figma Professional Plan', '2024-11-01', 'Figma Inc'),
('Travel', 3500.00, 'Client Meeting Bangalore', '2024-10-25', 'Uber / IRCTC');

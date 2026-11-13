export const initialFreelancerProfile = {
  id: 'fl-1',
  name: 'Vimalanathan R.',
  email: 'vimal@freelancer.dev',
  role: 'Freelancer',
  title: 'Full Stack & Mobile App Developer',
  phone: '+91 98765 43210',
  location: 'Chennai, Tamil Nadu, India',
  hourlyRate: 1500,
  currency: '₹',
  bio: 'Specialized in building scalable web apps, intuitive dashboards, and cross-platform mobile solutions for startups and growing enterprises.',
  skills: ['React', 'Node.js', 'Tailwind CSS', 'Next.js', 'PostgreSQL', 'TypeScript', 'Figma'],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  bankDetails: {
    accountName: 'Vimalanathan R',
    accountNumber: '918237465012',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    upiId: 'vimalanathan@okaxis'
  }
};

export const initialClients = [
  {
    id: 'cli-1',
    name: 'TechNova Solutions',
    contactPerson: 'Karthik Subramanian',
    email: 'karthik@technova.io',
    phone: '+91 98401 23456',
    company: 'TechNova Solutions Pvt Ltd',
    address: 'OMR Cyber Park, Chennai, India',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    totalBilled: 145000,
    paidAmount: 110000
  },
  {
    id: 'cli-2',
    name: 'PixelCrafters Studio',
    contactPerson: 'Priya Sundaram',
    email: 'priya@pixelcrafters.design',
    phone: '+91 98200 87654',
    company: 'PixelCrafters Studio',
    address: 'Indiranagar, Bengaluru, India',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    totalBilled: 85000,
    paidAmount: 85000
  },
  {
    id: 'cli-3',
    name: 'Aura Wellness Organics',
    contactPerson: 'Anand Kumar',
    email: 'anand@aurawellness.in',
    phone: '+91 94432 19876',
    company: 'Aura Wellness India',
    address: 'Coimbatore, Tamil Nadu, India',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    totalBilled: 42000,
    paidAmount: 0
  }
];

export const initialProjects = [
  {
    id: 'prj-1',
    clientId: 'cli-1',
    clientName: 'TechNova Solutions',
    title: 'Fintech Dashboard & Analytics Portal',
    description: 'Design and build a responsive React & Tailwind analytics dashboard with transaction logs and real-time graphs.',
    budget: 65000,
    status: 'In Progress', // Requested, In Progress, Completed, Rejected
    progress: 70,
    startDate: '2026-10-15',
    deadline: '2026-11-25',
    category: 'Web Development'
  },
  {
    id: 'prj-2',
    clientId: 'cli-2',
    clientName: 'PixelCrafters Studio',
    title: 'Brand Portfolio & Case Study Website',
    description: 'High-performance headless CMS portfolio website with smooth animations and dark mode support.',
    budget: 85000,
    status: 'Completed',
    progress: 100,
    startDate: '2026-09-01',
    deadline: '2026-10-10',
    category: 'UI/UX & Frontend'
  },
  {
    id: 'prj-3',
    clientId: 'cli-3',
    clientName: 'Aura Wellness Organics',
    title: 'E-commerce Mobile Web Ordering Flow',
    description: 'Custom responsive checkout flow and payment gateway integration for organic health products.',
    budget: 42000,
    status: 'In Progress',
    progress: 40,
    startDate: '2026-10-28',
    deadline: '2026-12-05',
    category: 'E-commerce'
  },
  {
    id: 'prj-4',
    clientId: 'cli-1',
    clientName: 'TechNova Solutions',
    title: 'Customer Onboarding Flow Redesign',
    description: 'Simplify multi-step KYC verification and onboarding experience for new fintech users.',
    budget: 35000,
    status: 'Requested', // New client request awaiting freelancer acceptance
    progress: 0,
    startDate: '2026-11-12',
    deadline: '2026-12-20',
    category: 'Product Design'
  }
];

export const initialInvoices = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-001',
    projectId: 'prj-2',
    projectTitle: 'Brand Portfolio & Case Study Website',
    clientId: 'cli-2',
    clientName: 'PixelCrafters Studio',
    clientEmail: 'priya@pixelcrafters.design',
    clientCompany: 'PixelCrafters Studio',
    clientAddress: 'Indiranagar, Bengaluru, India',
    issueDate: '2026-10-10',
    dueDate: '2026-10-24',
    status: 'Paid', // Draft, Sent, Paid, Overdue
    items: [
      { id: 'item-1', description: 'Wireframing & UI/UX Design (Figma)', quantity: 25, rate: 1200, amount: 30000 },
      { id: 'item-2', description: 'React Frontend Development & Motion Graphics', quantity: 40, rate: 1200, amount: 48000 },
      { id: 'item-3', description: 'SEO Optimization & Domain Deployment', quantity: 1, rate: 7000, amount: 7000 }
    ],
    subtotal: 85000,
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    total: 85000,
    paidAmount: 85000,
    paymentDate: '2026-10-18',
    paymentMethod: 'Bank Transfer (NEFT)',
    notes: 'Thank you for your business! All deliverables handed over.'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-002',
    projectId: 'prj-1',
    projectTitle: 'Fintech Dashboard Milestone 1',
    clientId: 'cli-1',
    clientName: 'TechNova Solutions',
    clientEmail: 'karthik@technova.io',
    clientCompany: 'TechNova Solutions Pvt Ltd',
    clientAddress: 'OMR Cyber Park, Chennai, India',
    issueDate: '2026-10-25',
    dueDate: '2026-11-08',
    status: 'Paid',
    items: [
      { id: 'item-4', description: 'Milestone 1: Authentication & Dashboard Layout Architecture', quantity: 1, rate: 35000, amount: 35000 }
    ],
    subtotal: 35000,
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    total: 35000,
    paidAmount: 35000,
    paymentDate: '2026-11-02',
    paymentMethod: 'UPI',
    notes: 'Milestone 1 approved and signed off.'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-003',
    projectId: 'prj-3',
    projectTitle: 'E-commerce Mobile Web Ordering Flow',
    clientId: 'cli-3',
    clientName: 'Aura Wellness Organics',
    clientEmail: 'anand@aurawellness.in',
    clientCompany: 'Aura Wellness India',
    clientAddress: 'Coimbatore, Tamil Nadu, India',
    issueDate: '2026-11-01',
    dueDate: '2026-11-15',
    status: 'Pending',
    items: [
      { id: 'item-5', description: 'Phase 1: Product Catalog & Cart Checkout Screen UI', quantity: 20, rate: 1500, amount: 30000 },
      { id: 'item-6', description: 'Payment Gateway Integration & Testing', quantity: 8, rate: 1500, amount: 12000 }
    ],
    subtotal: 42000,
    taxRate: 5,
    taxAmount: 2100,
    discount: 2100,
    total: 42000,
    paidAmount: 0,
    notes: 'Please initiate payment before due date to avoid service interruption.'
  },
  {
    id: 'inv-104',
    invoiceNumber: 'INV-2026-004',
    projectId: 'prj-1',
    projectTitle: 'Fintech Dashboard Milestone 2',
    clientId: 'cli-1',
    clientName: 'TechNova Solutions',
    clientEmail: 'karthik@technova.io',
    clientCompany: 'TechNova Solutions Pvt Ltd',
    clientAddress: 'OMR Cyber Park, Chennai, India',
    issueDate: '2026-10-15',
    dueDate: '2026-10-29',
    status: 'Overdue',
    items: [
      { id: 'item-7', description: 'API Integration & Real-time Chart Visualization', quantity: 1, rate: 30000, amount: 30000 }
    ],
    subtotal: 30000,
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    total: 30000,
    paidAmount: 0,
    notes: 'Invoice is overdue. Please process payment at earliest convenience.'
  }
];

export const initialExpenses = [
  {
    id: 'exp-1',
    title: 'Figma Professional Annual Subscription',
    category: 'Software & Tools',
    amount: 14400,
    date: '2026-10-02',
    notes: 'Design tools subscription for client UI mockups'
  },
  {
    id: 'exp-2',
    title: 'AWS & Vercel Cloud Server Hosting',
    category: 'Cloud & Hosting',
    amount: 5200,
    date: '2026-10-14',
    notes: 'Staging servers and preview deployments'
  },
  {
    id: 'exp-3',
    title: 'High-speed Fiber Internet & Backup Dongle',
    category: 'Office & Utilities',
    amount: 1999,
    date: '2026-10-25',
    notes: 'Monthly broadband expense'
  },
  {
    id: 'exp-4',
    title: 'Ergonomic Desk Accessories & Hardware Cables',
    category: 'Hardware',
    amount: 3450,
    date: '2026-11-05',
    notes: 'USB-C hub and display cables'
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    type: 'request', // request, payment, deadline, overdue
    title: 'New Project Request',
    message: 'TechNova Solutions has submitted a new project request: "Customer Onboarding Flow Redesign"',
    date: '10 mins ago',
    read: false,
    link: 'projects'
  },
  {
    id: 'notif-2',
    type: 'overdue',
    title: 'Overdue Invoice Alert',
    message: 'Invoice INV-2026-004 for TechNova Solutions (₹30,000) is 14 days overdue.',
    date: '2 hours ago',
    read: false,
    link: 'invoices'
  },
  {
    id: 'notif-3',
    type: 'deadline',
    title: 'Project Deadline Alert',
    message: 'Fintech Dashboard & Analytics Portal is due in 13 days (25 Nov 2026).',
    date: '1 day ago',
    read: false,
    link: 'projects'
  },
  {
    id: 'notif-4',
    type: 'payment',
    title: 'Payment Received',
    message: 'Received ₹35,000 via UPI for Invoice INV-2026-002 from TechNova Solutions.',
    date: '10 days ago',
    read: true,
    link: 'payments'
  }
];

export const chatbotKnowledge = [
  {
    topic: 'Registration Help',
    title: 'How to register on the platform?',
    content: 'You can register either as a Freelancer or a Client. Click the "Register" button on the top right, select your role tab (Freelancer or Client), fill in your name, email, password, and profile details, and click "Create Account". Once registered, you will be directed to login.'
  },
  {
    topic: 'Project Guide',
    title: 'How does the project workflow function?',
    content: '1. A Client sends a Project Request with scope, budget (₹), and deadline.\n2. The Freelancer reviews the request in their dashboard and can Accept or Reject.\n3. Once accepted, the project enters "Work in Progress".\n4. Freelancer marks it "Completed" when ready, which prompts creating an invoice.'
  },
  {
    topic: 'Invoice Guide',
    title: 'How to create and download invoices?',
    content: 'In the Freelancer Dashboard, navigate to "Invoices" -> click "Create Invoice". Select the client and project, add line items with quantity and rate, add tax or discounts if needed. You can preview the generated invoice anytime and click "Download PDF / Print" for a client-ready document.'
  },
  {
    topic: 'Payment Guide',
    title: 'How are payments handled and recorded?',
    content: 'Clients can view their unpaid invoices and submit manual payment entries (with UPI reference ID, bank transfer receipt, or card details). Freelancers can also directly record offline or online payments under the "Payments" module to immediately update the invoice status to "Paid".'
  },
  {
    topic: 'Other Queries',
    title: 'Can I export reports and track my profit?',
    content: 'Yes! The "Reports & Analytics" module automatically computes your Total Revenue, Total Expenses, and Net Profit Margin with graphical monthly breakdowns. You can also export the report summary as a formatted document.'
  }
];

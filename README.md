# Smart Hostel Complaint & Resource Management System

A comprehensive web-based solution for managing hostel complaints and resource bookings. This system digitizes hostel operations, improving transparency and reducing response time.

## 🎯 Features

### For Students
- ✅ Submit complaints with categories and priority levels
- ✅ Track complaint status in real-time
- ✅ Book shared resources (washing machines, study rooms, etc.)
- ✅ View booking history

### For Worker-Staff
- ✅ View assigned complaints
- ✅ Update complaint status (In Progress, Resolved, Closed)
- ✅ Add resolution notes

### For Warden (Admin)
- ✅ View all complaints
- ✅ Assign complaints to staff members
- ✅ Manage resources (add, view)
- ✅ View comprehensive statistics and analytics
- ✅ Monitor all bookings

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Modern, Responsive Design)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd nutrivedasih
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/smart-hostel
JWT_SECRET=your-secret-key-change-in-production
PORT=3000
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-hostel
JWT_SECRET=your-secret-key-change-in-production
PORT=3000
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

**Or use MongoDB Atlas** (cloud) - no local installation needed.

### 5. Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📱 Usage Guide

### Step 1: Register Users

1. Open the application in your browser
2. Click "Register"
3. Create accounts for different roles:
   - **Student**: Select "Student" role, enter hostel block and room number
   - **Staff**: Select "Staff" role
   - **Warden**: Select "Warden" role (admin)

### Step 2: Login

1. Click "Login"
2. Enter your email and password
3. You'll be redirected to your role-specific dashboard

### Step 3: Workflow Demonstration

#### As a Student:
1. **Submit Complaint:**
   - Go to "Submit Complaint" tab
   - Fill in title, category, priority, and description
   - Click "Submit Complaint"

2. **Track Complaints:**
   - View all your complaints in "My Complaints" tab
   - See real-time status updates

3. **Book Resources:**
   - Go to "Resource Booking" tab
   - Click "Book Now" on any available resource
   - Select date and time slot
   - Confirm booking

#### As a Warden:
1. **View All Complaints:**
   - See all complaints from all students
   - Filter by status

2. **Assign Complaints:**
   - Click "Assign Staff" on pending complaints
   - Select a staff member from the list

3. **Manage Resources:**
   - Go to "Resources" tab
   - Click "Add New Resource"
   - Fill in resource details

4. **View Statistics:**
   - Go to "Statistics" tab
   - See comprehensive analytics

#### As a Staff:
1. **View Assigned Complaints:**
   - See all complaints assigned to you

2. **Update Status:**
   - Click "Mark In Progress" when you start working
   - Click "Mark Resolved" when issue is fixed
   - Add resolution notes
   - Click "Close" to finalize

## 🗂️ Project Structure

```
nutrivedasih/
├── models/
│   ├── User.js          # User model (Student, Staff, Warden)
│   ├── Complaint.js     # Complaint model
│   ├── Resource.js      # Resource model
│   └── Booking.js       # Booking model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── complaints.js    # Complaint management routes
│   ├── resources.js     # Resource & booking routes
│   ├── stats.js         # Statistics routes
│   └── users.js         # User management routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── public/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # Styling
│   └── app.js           # Frontend JavaScript
├── server.js            # Express server setup
├── package.json         # Dependencies
└── README.md           # Documentation
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Complaints
- `GET /api/complaints` - Get complaints (role-based)
- `POST /api/complaints` - Create complaint (Student only)
- `GET /api/complaints/:id` - Get complaint by ID
- `PUT /api/complaints/:id/assign` - Assign complaint (Warden only)
- `PUT /api/complaints/:id/status` - Update status (Staff only)

### Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create resource (Warden only)
- `GET /api/resources/bookings` - Get bookings
- `POST /api/resources/bookings` - Create booking (Student only)
- `GET /api/resources/:id/availability` - Check availability

### Statistics
- `GET /api/stats` - Get dashboard statistics (Warden only)

### Users
- `GET /api/users/staff` - Get all staff (Warden only)
- `GET /api/users/me` - Get current user info

## 🎨 Design Features

- **Modern UI**: Clean, attractive design with gradient backgrounds
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Role-Based Dashboards**: Customized interface for each user role
- **Real-Time Updates**: Status changes reflect immediately
- **User-Friendly**: Intuitive navigation and clear visual feedback

## 🔄 Complete Workflow Example

1. **Student** submits a complaint about WiFi issue
2. **Warden** views the complaint and assigns it to a staff member
3. **Staff** receives the assignment, marks it "In Progress"
4. **Staff** resolves the issue and marks it "Resolved" with notes
5. **Student** sees the updated status on their dashboard

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (local) or check Atlas connection string
- Verify MONGODB_URI in `.env` file

### Port Already in Use
- Change PORT in `.env` file
- Or stop the process using port 3000

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET in `.env` file

## 📝 Notes

- Default JWT secret is for development only. Change it in production.
- Password minimum length is 6 characters.
- All dates are stored in UTC format.
- Complaints are sorted by creation date (newest first).

## 🚀 Deployment

### Deploy to Heroku:
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Connect MongoDB Atlas
4. Deploy: `git push heroku main`

### Deploy to Vercel/Netlify:
- Deploy frontend separately
- Use serverless functions for backend or deploy backend separately

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

For development with auto-reload:
```bash
npm run dev
```

Make sure to install nodemon globally if needed:
```bash
npm install -g nodemon
```

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for Smart Hostel Management**




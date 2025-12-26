# 📊 Data Storage Guide - Where All Data is Stored

## 🎯 What is "Capacity" in Resources?

**Capacity** means **how many people can use the resource at the same time**.

### Examples:

| Resource | Capacity | Meaning |
|----------|----------|---------|
| **Washing Machine** | 1 | Only 1 person can use it at a time |
| **Study Room A** | 10 | Up to 10 students can study together |
| **Study Room B** | 15 | Up to 15 students can study together |
| **Gym** | 20 | Up to 20 people can use the gym simultaneously |
| **Common Room** | 30 | Up to 30 people can use it at once |
| **Kitchen** | 5 | Up to 5 people can cook at the same time |

### Why Capacity Matters:
- **Washing Machine (Capacity: 1)**: Only one booking per time slot
- **Study Room (Capacity: 10)**: Multiple students can book the same time slot (up to 10)
- **Gym (Capacity: 20)**: Many people can use it at the same time

**Note:** Currently, the booking system allows one booking per time slot regardless of capacity. Capacity is displayed for information purposes and can be used for future enhancements.

---

## 🗄️ Where All Data is Stored

All data is stored in **MongoDB Database** in **4 main collections**:

### 1. **Users Collection** (`users`)
Stores all user accounts (Students, Staff, Warden)

**Fields:**
- `_id` - Unique user ID
- `name` - User's full name
- `email` - Email address (unique)
- `password` - Encrypted password (hashed with bcrypt)
- `role` - User role: `student`, `staff`, or `warden`
- `hostelBlock` - Hostel block (for students)
- `roomNumber` - Room number (for students)
- `createdAt` - Account creation date

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "student1@hostel.com",
  "password": "$2a$10$encrypted...",
  "role": "student",
  "hostelBlock": "Block A",
  "roomNumber": "101",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### 2. **Complaints Collection** (`complaints`)
Stores all complaints submitted by students

**Fields:**
- `_id` - Unique complaint ID
- `studentId` - Reference to User who submitted
- `studentName` - Student's name
- `title` - Complaint title
- `description` - Detailed description
- `category` - Category: `water`, `wifi`, `electricity`, `cleanliness`, `maintenance`, `other`
- `priority` - Priority: `low`, `medium`, `high`, `urgent`
- `status` - Status: `pending`, `assigned`, `in-progress`, `resolved`, `closed`
- `assignedTo` - Reference to Staff User (if assigned)
- `assignedStaffName` - Staff member's name
- `resolutionNotes` - Notes added by staff when resolving
- `createdAt` - Complaint creation date
- `updatedAt` - Last update date
- `resolvedAt` - Resolution date (if resolved)

**Example Document:**
```json
{
  "_id": "507f191e810c19729de860ea",
  "studentId": "507f1f77bcf86cd799439011",
  "studentName": "John Doe",
  "title": "WiFi Not Working",
  "description": "WiFi is down in Block A",
  "category": "wifi",
  "priority": "high",
  "status": "assigned",
  "assignedTo": "507f1f77bcf86cd799439012",
  "assignedStaffName": "Sarah Johnson",
  "resolutionNotes": "",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z",
  "resolvedAt": null
}
```

### 3. **Resources Collection** (`resources`)
Stores all available resources (washing machines, study rooms, etc.)

**Fields:**
- `_id` - Unique resource ID
- `name` - Resource name
- `description` - Resource description
- `category` - Category: `washing-machine`, `study-room`, `gym`, `common-room`, `kitchen`, `other`
- `location` - Where the resource is located
- `capacity` - **How many people can use it at the same time** (Number)
- `isAvailable` - Whether resource is currently available (Boolean)
- `createdAt` - When resource was added

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Study Room A",
  "description": "Quiet study room with tables and chairs",
  "category": "study-room",
  "location": "First Floor - Library Wing",
  "capacity": 10,
  "isAvailable": true,
  "createdAt": "2024-01-15T09:00:00Z"
}
```

### 4. **Bookings Collection** (`bookings`)
Stores all resource bookings made by students

**Fields:**
- `_id` - Unique booking ID
- `studentId` - Reference to User who booked
- `studentName` - Student's name
- `resourceId` - Reference to Resource booked
- `resourceName` - Resource name
- `bookingDate` - Date of booking
- `startTime` - Start time (e.g., "10:00")
- `endTime` - End time (e.g., "12:00")
- `status` - Status: `pending`, `confirmed`, `completed`, `cancelled`
- `createdAt` - When booking was created

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "studentId": "507f1f77bcf86cd799439011",
  "studentName": "John Doe",
  "resourceId": "507f1f77bcf86cd799439013",
  "resourceName": "Study Room A",
  "bookingDate": "2024-01-20T00:00:00Z",
  "startTime": "10:00",
  "endTime": "12:00",
  "status": "confirmed",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 👀 How to View Stored Data

### Method 1: MongoDB Compass (GUI Tool - Easiest)

#### Step 1: Download MongoDB Compass
1. Go to: https://www.mongodb.com/try/download/compass
2. Download MongoDB Compass (free)
3. Install it

#### Step 2: Connect to Your Database

**For MongoDB Atlas:**
1. Open MongoDB Compass
2. Get connection string from MongoDB Atlas:
   - Go to Atlas → Database → Connect → Compass
   - Copy connection string
3. Paste connection string in Compass
4. Replace `<password>` with your password
5. Click "Connect"

**For Local MongoDB:**
1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"

#### Step 3: View Collections
1. Select database: `smart-hostel`
2. You'll see 4 collections:
   - `users` - All user accounts
   - `complaints` - All complaints
   - `resources` - All resources
   - `bookings` - All bookings
3. Click on any collection to view documents

#### Step 4: Browse Data
- Click on a collection name
- See all documents in that collection
- Click on any document to see full details
- Use filters to search specific data

---

### Method 2: MongoDB Shell (Command Line)

#### For MongoDB Atlas:
```bash
# Install MongoDB Shell if not installed
# Download from: https://www.mongodb.com/try/download/shell

# Connect to Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/smart-hostel"
```

#### For Local MongoDB:
```bash
# Connect to local MongoDB
mongosh

# Or specify database
mongosh smart-hostel
```

#### View Data Commands:
```javascript
// Switch to database
use smart-hostel

// View all collections
show collections

// View all users
db.users.find().pretty()

// View all complaints
db.complaints.find().pretty()

// View all resources
db.resources.find().pretty()

// View all bookings
db.bookings.find().pretty()

// Count documents
db.users.countDocuments()
db.complaints.countDocuments()
db.resources.countDocuments()
db.bookings.countDocuments()

// Find specific user
db.users.findOne({ email: "student1@hostel.com" })

// Find complaints by status
db.complaints.find({ status: "pending" }).pretty()

// Find resources by category
db.resources.find({ category: "study-room" }).pretty()
```

---

### Method 3: View Through Your Application

#### As Warden (Admin):
1. Login as Warden: `warden@hostel.com` / `warden123`
2. **All Complaints Tab**: See all complaints
3. **Resources Tab**: See all resources
4. **Statistics Tab**: See counts and analytics

#### As Student:
1. Login as Student
2. **My Complaints Tab**: See your complaints
3. **Resource Booking Tab**: See all resources and your bookings

#### As Staff:
1. Login as Staff
2. See assigned complaints

---

### Method 4: MongoDB Atlas Web Interface

#### Step 1: Login to MongoDB Atlas
1. Go to: https://cloud.mongodb.com
2. Login to your account

#### Step 2: Browse Collections
1. Click on your cluster
2. Click "Browse Collections"
3. Select database: `smart-hostel`
4. View collections:
   - `users`
   - `complaints`
   - `resources`
   - `bookings`

#### Step 3: View Documents
- Click on any collection
- See all documents
- Click on document to see details
- Use filters and search

---

## 📊 Database Structure Summary

```
smart-hostel (Database)
├── users (Collection)
│   ├── Student accounts
│   ├── Staff accounts
│   └── Warden accounts
│
├── complaints (Collection)
│   ├── All student complaints
│   ├── Status tracking
│   └── Assignment records
│
├── resources (Collection)
│   ├── Washing machines
│   ├── Study rooms
│   ├── Gym
│   ├── Common rooms
│   └── Other resources
│
└── bookings (Collection)
    ├── Resource bookings
    ├── Time slots
    └── Booking status
```

---

## 🔍 Quick Data Queries

### Find All Students:
```javascript
db.users.find({ role: "student" }).pretty()
```

### Find Pending Complaints:
```javascript
db.complaints.find({ status: "pending" }).pretty()
```

### Find Resources by Category:
```javascript
db.resources.find({ category: "study-room" }).pretty()
```

### Find Today's Bookings:
```javascript
db.bookings.find({ 
  bookingDate: new Date("2024-01-20") 
}).pretty()
```

### Count Total Complaints:
```javascript
db.complaints.countDocuments()
```

---

## 💡 Tips

1. **MongoDB Compass** is the easiest way to view data visually
2. **MongoDB Atlas** web interface is good for quick checks
3. **MongoDB Shell** is powerful for advanced queries
4. **Your Application** shows data in a user-friendly way

---

## 🎯 Summary

- **Capacity** = How many people can use resource simultaneously
- **All data** stored in MongoDB database `smart-hostel`
- **4 collections**: users, complaints, resources, bookings
- **View data** using MongoDB Compass, MongoDB Shell, or Atlas web interface

---

**Now you know where all your data is stored! 🎉**




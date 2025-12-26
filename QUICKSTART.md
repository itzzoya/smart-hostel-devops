# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Use: `mongodb://localhost:27017/smart-hostel`

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Use: `mongodb+srv://username:password@cluster.mongodb.net/smart-hostel`

### Step 3: Create .env File
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/smart-hostel
JWT_SECRET=your-secret-key-here
PORT=3000
```

### Step 4: Seed Initial Data (Optional)
```bash
npm run seed
```
This creates:
- Warden: warden@hostel.com / warden123
- Staff: staff1@hostel.com / staff123
- Students: student1@hostel.com / student123
- Sample resources

### Step 5: Start the Server
```bash
npm start
```
or for development with auto-reload:
```bash
npm run dev
```

### Step 6: Open Browser
Go to: http://localhost:3000

## 🎯 Testing the System

### Complete Workflow Test:

1. **Login as Student** (student1@hostel.com / student123)
   - Submit a complaint
   - Book a resource

2. **Login as Warden** (warden@hostel.com / warden123)
   - View all complaints
   - Assign complaint to staff
   - View statistics

3. **Login as Staff** (staff1@hostel.com / staff123)
   - View assigned complaints
   - Update complaint status

4. **Login back as Student**
   - See updated complaint status

## 📱 Default Test Accounts

After running `npm run seed`:

| Role | Email | Password |
|------|-------|----------|
| Warden | warden@hostel.com | warden123 |
| Staff | staff1@hostel.com | staff123 |
| Staff | staff2@hostel.com | staff123 |
| Student | student1@hostel.com | student123 |
| Student | student2@hostel.com | student123 |

## 🎨 Features to Test

- ✅ User Registration (all roles)
- ✅ User Login
- ✅ Submit Complaint (Student)
- ✅ Assign Complaint (Warden)
- ✅ Update Status (Staff)
- ✅ Book Resource (Student)
- ✅ View Statistics (Warden)
- ✅ Add Resource (Warden)

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas: Check IP whitelist and credentials

**Port Already in Use:**
- Change PORT in .env
- Or kill process: `lsof -ti:3000 | xargs kill` (Mac/Linux)

**Module Not Found:**
- Run `npm install` again
- Delete node_modules and reinstall

## 📚 Next Steps

- Read full README.md for detailed documentation
- Customize colors in styles.css
- Add more features as needed

Happy Coding! 🎉




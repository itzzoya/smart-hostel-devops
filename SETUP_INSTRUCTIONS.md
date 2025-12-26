# 🚀 Complete Setup Instructions

## Step 1: Connect MongoDB (Choose One Option)

### Option A: MongoDB Atlas (Cloud - RECOMMENDED)

**Follow the detailed guide:** [MONGODB_LOCAL_SETUP.md](MONGODB_LOCAL_SETUP.md)

**Quick Steps:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create free cluster
4. Create database user (save password!)
5. Allow network access (0.0.0.0/0)
6. Get connection string
7. Create `.env` file with connection string

### Option B: Local MongoDB

**Follow:** [MONGODB_LOCAL_SETUP.md](MONGODB_LOCAL_SETUP.md) - Option 2

---

## Step 2: Create .env File

In your project root folder (`nutrivedasih`), create a file named `.env`:

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-hostel?retryWrites=true&w=majority
JWT_SECRET=my-super-secret-jwt-key-change-this-12345
PORT=3000
```

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/smart-hostel
JWT_SECRET=my-super-secret-jwt-key-change-this-12345
PORT=3000
```

**⚠️ Important:** Replace `username` and `password` with your actual MongoDB credentials!

---

## Step 3: Install Dependencies

```bash
npm install
```

---

## Step 4: Seed Database (Create Test Accounts)

```bash
npm run seed
```

This creates:
- **Warden:** warden@hostel.com / warden123
- **Staff:** staff1@hostel.com / staff123
- **Students:** student1@hostel.com / student123
- **Sample Resources:** Washing machines, study rooms, etc.

---

## Step 5: Start Server

```bash
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:3000
```

---

## Step 6: Open Browser

Go to: **http://localhost:3000**

---

## Step 7: Test the Application

### Test as Warden (Admin):
1. Login: `warden@hostel.com` / `warden123`
2. Go to "Resources" tab
3. Click "Add New Resource"
4. Add resources like:
   - Washing Machine 1
   - Study Room A
   - Gym
   - Common Room

### Test as Student:
1. Login: `student1@hostel.com` / `student123`
2. Go to "Resource Booking" tab
3. You should see all resources
4. Click "Book Now" on any resource
5. Select date and time
6. Confirm booking
7. Check "My Bookings" section

### Test Booking Flow:
1. **Student** books a resource
2. Go to "My Bookings" - see your booking
3. **Warden** can see all bookings in Statistics

---

## 🔧 Troubleshooting

### Problem: "MongoDB Connection Error"

**Check:**
1. Is MongoDB running? (for local)
2. Is `.env` file created?
3. Is `MONGODB_URI` correct?
4. For Atlas: Is network access configured?

**Solution:**
- Check [MONGODB_LOCAL_SETUP.md](MONGODB_LOCAL_SETUP.md) troubleshooting section

### Problem: "No resources showing"

**Solution:**
1. Login as Warden
2. Go to "Resources" tab
3. Click "Add New Resource"
4. Add at least one resource
5. Login as Student
6. Go to "Resource Booking" tab
7. Resources should appear

### Problem: "No booking button"

**Check:**
1. Are you logged in as Student?
2. Are resources marked as "Available"?
3. Did you add resources as Warden?

**Solution:**
- Resources must be added by Warden first
- Resources must have `isAvailable: true`

### Problem: "Cannot see bookings"

**Solution:**
1. Make sure you booked a resource
2. Check "My Bookings" section
3. Refresh the page

---

## ✅ Success Checklist

- [ ] MongoDB connected (see success message)
- [ ] Server running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can login as warden
- [ ] Can add resources as warden
- [ ] Can login as student
- [ ] Can see resources
- [ ] Can book resources
- [ ] Can see bookings

---

## 📝 Next Steps After Setup

1. **Add More Resources:**
   - Login as Warden
   - Add washing machines, study rooms, gym, etc.

2. **Test Complete Flow:**
   - Student submits complaint
   - Warden assigns to staff
   - Staff updates status
   - Student sees updated status

3. **Customize:**
   - Change colors in `public/styles.css`
   - Add more resource categories
   - Customize dashboard

---

## 🎯 Quick Reference

**Test Accounts (after seeding):**
- Warden: `warden@hostel.com` / `warden123`
- Staff: `staff1@hostel.com` / `staff123`
- Student: `student1@hostel.com` / `student123`

**Important URLs:**
- Local: http://localhost:3000
- MongoDB Atlas: https://cloud.mongodb.com

**Key Files:**
- `.env` - Environment variables (MongoDB connection)
- `server.js` - Main server file
- `public/index.html` - Frontend
- `public/app.js` - Frontend JavaScript

---

**Your app is now ready to use! 🎉**




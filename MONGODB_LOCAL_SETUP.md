# 🗄️ MongoDB Local Setup Guide

## Step-by-Step: Connect MongoDB to Your Smart Hostel App

---

## Option 1: MongoDB Atlas (Cloud - RECOMMENDED - Easiest)

### Why MongoDB Atlas?
- ✅ No installation needed
- ✅ Free forever (512MB storage)
- ✅ Accessible from anywhere
- ✅ Easy to set up

### Step 1: Create MongoDB Atlas Account

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Click:** "Try Free" or "Sign Up"
3. **Sign up** with:
   - Email address
   - Password
   - Or use Google/GitHub

### Step 2: Create Free Cluster

1. After login, click **"Build a Database"**
2. Choose **FREE** tier (M0 Sandbox)
3. Select **Cloud Provider:** AWS (or any)
4. Choose **Region:** Closest to you
   - Example: `N. Virginia (us-east-1)` for US
   - Example: `Mumbai (ap-south-1)` for India
5. **Cluster Name:** Leave default or change to `smart-hostel-cluster`
6. Click **"Create Cluster"**
7. **Wait 3-5 minutes** for cluster to be created

### Step 3: Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `hosteladmin` (or your choice)
5. **Password:** 
   - Click **"Autogenerate Secure Password"** OR
   - Create your own password (save it!)
6. **Database User Privileges:** Select **"Atlas admin"**
7. Click **"Add User"**

**⚠️ IMPORTANT: Save your username and password!**

### Step 4: Configure Network Access

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For local development, click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (all IPs)
   - Click **"Confirm"**
4. **Wait 1-2 minutes** for changes to apply

### Step 5: Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver:** Node.js
5. **Version:** 5.5 or later
6. **Copy the connection string**

It will look like:
```
mongodb+srv://hosteladmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Modify Connection String

Replace `<password>` with your actual password and add database name:

**Before:**
```
mongodb+srv://hosteladmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**After:**
```
mongodb+srv://hosteladmin:YourActualPassword123@cluster0.xxxxx.mongodb.net/smart-hostel?retryWrites=true&w=majority
```

**Changes made:**
- Replaced `<password>` with your password
- Added `/smart-hostel` before `?` (database name)

### Step 7: Create .env File

1. In your project root (`nutrivedasih` folder), create a file named `.env`
2. Add this content:

```env
MONGODB_URI=mongodb+srv://hosteladmin:YourActualPassword123@cluster0.xxxxx.mongodb.net/smart-hostel?retryWrites=true&w=majority
JWT_SECRET=my-super-secret-jwt-key-change-this-in-production-12345
PORT=3000
```

**Replace:**
- `YourActualPassword123` with your MongoDB password
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL

### Step 8: Test Connection

1. **Start your server:**
   ```bash
   npm start
   ```

2. **Look for this message:**
   ```
   ✅ MongoDB Connected Successfully
   ```

3. **If you see error:**
   - Check password is correct
   - Check network access is configured
   - Check connection string format

✅ **MongoDB Atlas is now connected!**

---

## Option 2: Local MongoDB Installation

### Step 1: Install MongoDB

#### Windows:
1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Version: Latest (6.0+)
   - Platform: Windows
   - Package: MSI
   - Click "Download"

2. **Install MongoDB:**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Click "Install"

3. **Verify Installation:**
   ```bash
   mongod --version
   ```

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 2: Start MongoDB Service

#### Windows:
```bash
# MongoDB should start automatically
# If not, start it:
net start MongoDB
```

#### macOS/Linux:
```bash
# Start MongoDB
sudo systemctl start mongod

# Or using brew (macOS)
brew services start mongodb-community
```

### Step 3: Verify MongoDB is Running

```bash
# Check MongoDB status
mongosh

# Or older versions
mongo
```

If you see MongoDB shell, it's working! Type `exit` to leave.

### Step 4: Create .env File

1. In your project root, create `.env` file
2. Add this content:

```env
MONGODB_URI=mongodb://localhost:27017/smart-hostel
JWT_SECRET=my-super-secret-jwt-key-change-this-in-production-12345
PORT=3000
```

### Step 5: Test Connection

```bash
npm start
```

Look for: `✅ MongoDB Connected Successfully`

✅ **Local MongoDB is now connected!**

---

## 🧪 Test Your Setup

### Step 1: Seed Database (Optional but Recommended)

```bash
npm run seed
```

This creates:
- Warden account: `warden@hostel.com` / `warden123`
- Staff accounts: `staff1@hostel.com` / `staff123`
- Student accounts: `student1@hostel.com` / `student123`
- Sample resources

### Step 2: Start Server

```bash
npm start
```

### Step 3: Open Browser

Go to: **http://localhost:3000**

### Step 4: Test Login

1. Click "Login"
2. Use: `warden@hostel.com` / `warden123`
3. You should see the Warden Dashboard

✅ **Everything is working!**

---

## 🔧 Troubleshooting

### Problem: "MongoDB Connection Error"

**For MongoDB Atlas:**
- ✅ Check password is correct (no special characters need encoding)
- ✅ Check network access allows `0.0.0.0/0`
- ✅ Check connection string format
- ✅ Wait 2-3 minutes after creating user/network access

**For Local MongoDB:**
- ✅ Check MongoDB service is running
- ✅ Check MongoDB is installed correctly
- ✅ Try: `mongosh` to test MongoDB directly
- ✅ Check port 27017 is not blocked

### Problem: "Cannot connect to MongoDB"

**Solution:**
1. Check `.env` file exists
2. Check `MONGODB_URI` is correct
3. Restart your server
4. Check MongoDB logs

### Problem: "Authentication failed"

**Solution:**
- For Atlas: Check username and password
- For Local: MongoDB might not need authentication by default

---

## 📝 .env File Template

Copy this and fill in your values:

```env
# MongoDB Connection
# For Atlas (Cloud):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-hostel?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/smart-hostel

# JWT Secret (change this!)
JWT_SECRET=your-secret-key-change-this-in-production-12345

# Server Port
PORT=3000
```

---

## ✅ Success Checklist

- [ ] MongoDB Atlas account created OR Local MongoDB installed
- [ ] Database user created (for Atlas)
- [ ] Network access configured (for Atlas)
- [ ] Connection string obtained
- [ ] `.env` file created with correct `MONGODB_URI`
- [ ] Server starts without errors
- [ ] See "✅ MongoDB Connected Successfully" message
- [ ] Can login and use the app

---

## 🎯 Next Steps

After MongoDB is connected:

1. **Seed database:** `npm run seed`
2. **Test the app:** Login and test all features
3. **Add resources:** Login as warden and add resources
4. **Test booking:** Login as student and book resources

---

**Your MongoDB is now connected! 🎉**


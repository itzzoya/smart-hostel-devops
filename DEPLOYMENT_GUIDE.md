# 🚀 Deployment Guide - Smart Hostel System

## Table of Contents
1. [Local Testing](#local-testing)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Deploy to Heroku](#deploy-to-heroku)
4. [Deploy to Render](#deploy-to-render)
5. [Deploy to Railway](#deploy-to-railway)
6. [Deploy to Vercel](#deploy-to-vercel)
7. [Deploy to DigitalOcean](#deploy-to-digitalocean)
8. [Post-Deployment Checklist](#post-deployment-checklist)

---

## 🏠 Local Testing (Quick Start)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Windows
# Download and install MongoDB from mongodb.com
# Start MongoDB service
net start MongoDB

# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Create a free cluster
- Get connection string (see MongoDB Atlas Setup below)

### Step 3: Create .env File
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/smart-hostel
JWT_SECRET=your-secret-key-change-in-production-12345
PORT=3000
```

### Step 4: Seed Database (Optional)
```bash
npm run seed
```

### Step 5: Start Server
```bash
npm start
```

### Step 6: Open Browser
Go to: **http://localhost:3000**

✅ **Your app is now running locally!**

---

## ☁️ MongoDB Atlas Setup (Cloud Database)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email

### Step 2: Create Cluster
1. Choose **FREE** tier (M0)
2. Select cloud provider (AWS recommended)
3. Choose region closest to you
4. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access" → "Add New Database User"
2. Choose "Password" authentication
3. Username: `hosteladmin` (or your choice)
4. Password: Generate secure password (save it!)
5. Database User Privileges: "Atlas admin"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" → "Add IP Address"
2. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP for production
3. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `smart-hostel`

**Example:**
```
mongodb+srv://hosteladmin:YourPassword123@cluster0.xxxxx.mongodb.net/smart-hostel?retryWrites=true&w=majority
```

### Step 6: Update .env File
```env
MONGODB_URI=mongodb+srv://hosteladmin:YourPassword123@cluster0.xxxxx.mongodb.net/smart-hostel?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-in-production-12345
PORT=3000
```

✅ **MongoDB Atlas is ready!**

---

## 🟣 Deploy to Heroku (Easiest Option)

### Prerequisites
- Heroku account (free): https://signup.heroku.com
- Heroku CLI installed: https://devcenter.heroku.com/articles/heroku-cli
- Git installed

### Step 1: Install Heroku CLI
```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
# Or use npm
npm install -g heroku
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
# Navigate to your project directory
cd nutrivedasih

# Create Heroku app
heroku create smart-hostel-app

# Or create with specific name
heroku create your-app-name
```

### Step 4: Set Environment Variables
```bash
# Set MongoDB URI (use your MongoDB Atlas connection string)
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/smart-hostel"

# Set JWT Secret
heroku config:set JWT_SECRET="your-super-secret-jwt-key-12345"

# Set Port (Heroku sets this automatically, but you can verify)
heroku config:set PORT=3000
```

### Step 5: Update server.js for Heroku
The server.js already handles PORT from environment, so no changes needed!

### Step 6: Deploy to Heroku
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Deploy to Heroku
git push heroku main

# If using master branch
git push heroku master
```

### Step 7: Open Your App
```bash
heroku open
```

### Step 8: Seed Database (Optional)
```bash
heroku run npm run seed
```

### Step 9: View Logs
```bash
heroku logs --tail
```

✅ **Your app is live on Heroku!**

**Your app URL:** `https://your-app-name.herokuapp.com`

---

## 🟢 Deploy to Render (Free Tier Available)

### Step 1: Create Account
1. Go to https://render.com
2. Sign up with GitHub (recommended) or email

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository (or use public repo)
3. Or use "Public Git repository" and paste your repo URL

### Step 3: Configure Service
- **Name:** smart-hostel-app
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

### Step 4: Set Environment Variables
Click "Environment" and add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-hostel
JWT_SECRET=your-secret-key-12345
NODE_ENV=production
```

### Step 5: Deploy
Click "Create Web Service"

✅ **Your app is live on Render!**

**Your app URL:** `https://smart-hostel-app.onrender.com`

---

## 🟡 Deploy to Railway

### Step 1: Create Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Configure Environment Variables
Go to "Variables" tab and add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-hostel
JWT_SECRET=your-secret-key-12345
PORT=3000
```

### Step 4: Deploy
Railway auto-deploys on git push!

✅ **Your app is live on Railway!**

---

## 🔵 Deploy to Vercel (Serverless)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Create vercel.json
Create `vercel.json` in root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### Step 3: Deploy
```bash
vercel
```

### Step 4: Set Environment Variables
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
```

✅ **Your app is live on Vercel!**

---

## 🟠 Deploy to DigitalOcean App Platform

### Step 1: Create Account
1. Go to https://www.digitalocean.com
2. Sign up (get $200 free credit)

### Step 2: Create App
1. Go to "App Platform"
2. Click "Create App"
3. Connect GitHub repository

### Step 3: Configure
- **Name:** smart-hostel-app
- **Region:** Choose closest
- **Plan:** Basic ($5/month) or use free trial

### Step 4: Set Environment Variables
Add in "Environment Variables" section:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-hostel
JWT_SECRET=your-secret-key-12345
```

### Step 5: Deploy
Click "Create Resources"

✅ **Your app is live on DigitalOcean!**

---

## 📋 Post-Deployment Checklist

### ✅ Verify Deployment
- [ ] App loads without errors
- [ ] Can register new users
- [ ] Can login with existing users
- [ ] Database connection works
- [ ] All features functional

### ✅ Security Checklist
- [ ] Changed default JWT_SECRET
- [ ] MongoDB password is strong
- [ ] Environment variables are set correctly
- [ ] HTTPS is enabled (most platforms do this automatically)

### ✅ Test All Features
- [ ] Student can submit complaint
- [ ] Warden can assign complaint
- [ ] Staff can update status
- [ ] Resource booking works
- [ ] Statistics display correctly

### ✅ Performance
- [ ] Page loads quickly
- [ ] API responses are fast
- [ ] No console errors

---

## 🔧 Troubleshooting Common Issues

### Issue: "MongoDB connection failed"
**Solution:**
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Verify connection string in environment variables
- Check username/password are correct

### Issue: "Port already in use"
**Solution:**
- Most cloud platforms set PORT automatically
- Don't hardcode port in code
- Use `process.env.PORT || 3000`

### Issue: "Module not found"
**Solution:**
- Ensure `package.json` has all dependencies
- Run `npm install` before deploying
- Check `node_modules` is in `.gitignore`

### Issue: "Build failed"
**Solution:**
- Check Node.js version (use 14+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Issue: "Environment variables not working"
**Solution:**
- Verify variables are set in platform dashboard
- Restart app after setting variables
- Check variable names match exactly

---

## 🌐 Quick Comparison

| Platform | Free Tier | Ease of Use | Best For |
|----------|-----------|-------------|----------|
| **Heroku** | Limited | ⭐⭐⭐⭐⭐ | Quick deployment |
| **Render** | Yes | ⭐⭐⭐⭐ | Free hosting |
| **Railway** | Limited | ⭐⭐⭐⭐ | GitHub integration |
| **Vercel** | Yes | ⭐⭐⭐ | Serverless |
| **DigitalOcean** | Trial | ⭐⭐⭐ | Production apps |

---

## 🎯 Recommended: Heroku + MongoDB Atlas

**Best combination for beginners:**
1. **MongoDB Atlas** - Free cloud database
2. **Heroku** - Easy deployment, free tier available

**Steps:**
1. Set up MongoDB Atlas (see above)
2. Deploy to Heroku (see above)
3. Set environment variables
4. Deploy!

---

## 📞 Need Help?

1. Check platform-specific documentation
2. View application logs
3. Test locally first
4. Verify environment variables
5. Check MongoDB connection

---

## 🎉 Success!

Once deployed, your app will be accessible at:
- **Heroku:** `https://your-app-name.herokuapp.com`
- **Render:** `https://your-app-name.onrender.com`
- **Railway:** `https://your-app-name.up.railway.app`

**Share your deployed URL and test all features!**

---

**Happy Deploying! 🚀**




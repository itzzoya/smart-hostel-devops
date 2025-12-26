# Deploy to Render - Quick Guide

## Step 1: Create MongoDB Atlas Database
1. Go to https://cloud.mongodb.com/
2. Create free account and cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/smart-hostel`

## Step 2: Deploy to Render
1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Use these settings:
   - **Name**: smart-hostel-system
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## Step 3: Add Environment Variables
In Render dashboard, add:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Any random secure string (32+ characters)
- `NODE_ENV`: production

## Step 4: Deploy
Click "Create Web Service" - Render will automatically deploy!

Your app will be live at: `https://smart-hostel-system.onrender.com`

## Test Accounts to Create:
- **Warden**: admin@hostel.com / password123
- **Staff**: staff@hostel.com / password123  
- **Student**: student@hostel.com / password123
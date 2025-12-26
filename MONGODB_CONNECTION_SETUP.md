# 🔗 MongoDB Connection Setup - Your Database

## ✅ Your MongoDB Connection String

Your MongoDB Atlas connection is configured:

```
mongodb+srv://hosteladmin:Sourav@2710@souravswebsite.izms1jd.mongodb.net/smart-hostel?retryWrites=true&w=majority&appName=Souravswebsite
```

---

## 📝 Setup Instructions

### Step 1: Create .env File

In your project root folder (`nutrivedasih`), create a file named `.env`:

```env
MONGODB_URI=mongodb+srv://hosteladmin:Sourav@2710@souravswebsite.izms1jd.mongodb.net/smart-hostel?retryWrites=true&w=majority&appName=Souravswebsite
JWT_SECRET=my-super-secret-jwt-key-change-this-in-production-12345
PORT=3000
```

**Note:** The `.env` file has been created for you with your connection string.

### Step 2: Verify Connection

1. **Start your server:**
   ```bash
   npm start
   ```

2. **Look for this message:**
   ```
   ✅ MongoDB Connected Successfully
   ```

3. **If you see connection error:**
   - Check MongoDB Atlas network access (should allow 0.0.0.0/0)
   - Verify password is correct
   - Check connection string format

---

## 🎯 Database Details

- **Database Name:** `smart-hostel`
- **Collections:**
  - `users` - User accounts
  - `complaints` - Complaints
  - `resources` - Resources
  - `bookings` - Bookings

---

## 🔐 Security Note

⚠️ **Important:** The `.env` file contains your password. 
- Never commit `.env` to Git (it's already in `.gitignore`)
- Keep your password secure
- Change password if exposed

---

## ✅ Next Steps

1. ✅ `.env` file created with your connection string
2. ✅ Start server: `npm start`
3. ✅ Verify connection success
4. ✅ Seed database: `npm run seed` (optional)

**Your MongoDB is now configured! 🎉**




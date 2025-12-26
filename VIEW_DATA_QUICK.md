# ⚡ Quick Guide: View Your Data

## 🎯 What is Capacity?

**Capacity** = **How many people can use the resource at the same time**

- **Washing Machine**: Capacity 1 = Only 1 person at a time
- **Study Room**: Capacity 10 = Up to 10 students together
- **Gym**: Capacity 20 = Up to 20 people simultaneously

---

## 📍 Where Data is Stored

**Database:** MongoDB  
**Database Name:** `smart-hostel`  
**Collections:** 4 collections

1. **`users`** - All user accounts (students, staff, warden)
2. **`complaints`** - All complaints
3. **`resources`** - All resources (washing machines, study rooms, etc.)
4. **`bookings`** - All resource bookings

---

## 👀 How to View Data (3 Easy Methods)

### Method 1: MongoDB Compass (Easiest - Visual)

1. **Download:** https://www.mongodb.com/try/download/compass
2. **Install** MongoDB Compass
3. **Connect:**
   - **Atlas:** Use connection string from Atlas
   - **Local:** `mongodb://localhost:27017`
4. **Select database:** `smart-hostel`
5. **Click collections** to view data

✅ **Best for visual browsing**

---

### Method 2: MongoDB Atlas Web (Quick Check)

1. **Login:** https://cloud.mongodb.com
2. **Click** your cluster
3. **Click** "Browse Collections"
4. **Select** `smart-hostel` database
5. **View** collections and documents

✅ **Best for quick checks**

---

### Method 3: MongoDB Shell (Command Line)

```bash
# Connect
mongosh "mongodb+srv://username:password@cluster.mongodb.net/smart-hostel"

# Or local
mongosh smart-hostel

# View collections
show collections

# View users
db.users.find().pretty()

# View complaints
db.complaints.find().pretty()

# View resources
db.resources.find().pretty()

# View bookings
db.bookings.find().pretty()
```

✅ **Best for advanced queries**

---

## 📊 View Through Your App

**As Warden:**
- Login → See all complaints, resources, statistics

**As Student:**
- Login → See your complaints and bookings

---

## 🎯 Quick Reference

| Collection | Contains |
|------------|----------|
| `users` | Student, Staff, Warden accounts |
| `complaints` | All complaints with status |
| `resources` | Washing machines, study rooms, etc. |
| `bookings` | Resource booking records |

---

**Choose the method that works best for you! 🚀**




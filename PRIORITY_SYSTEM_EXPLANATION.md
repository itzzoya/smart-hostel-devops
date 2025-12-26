# 🎯 Priority System - How It Works

## 📊 What is Priority?

**Priority** determines how **urgent** a complaint is and helps staff/warden decide which complaints to handle first.

### Priority Levels:

| Priority | Meaning | When to Use | Example |
|----------|---------|-------------|---------|
| **Low** | Not urgent, can wait | Minor issues, non-critical | "Room door squeaks" |
| **Medium** | Normal priority (default) | Standard issues | "WiFi slow in room" |
| **High** | Important, needs attention | Affects daily activities | "No water supply" |
| **Urgent** | Critical, immediate action | Safety issues, emergencies | "Electrical sparking" |

---

## 🔄 How Priority Works in Your System

### 1. **When Student Submits Complaint:**

**Location:** `public/index.html` - Complaint Form

```html
<select id="complaintPriority">
    <option value="low">Low</option>
    <option value="medium" selected>Medium</option>
    <option value="high">High</option>
    <option value="urgent">Urgent</option>
</select>
```

- Student selects priority level
- Default is **"Medium"**
- Priority is saved with complaint

### 2. **Stored in Database:**

**Location:** `models/Complaint.js`

```javascript
priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
}
```

- Priority stored as string
- Must be one of: low, medium, high, urgent
- Default: 'medium' if not specified

### 3. **Displayed in Complaint Cards:**

**Location:** `public/app.js` - createComplaintCard()

```javascript
<div><strong>Priority:</strong> ${complaint.priority}</div>
```

- Shows priority in complaint details
- Visible to all users (Student, Staff, Warden)

---

## 📋 Current Implementation

### ✅ What's Working:

1. **Priority Selection:**
   - Students can choose priority when submitting
   - Dropdown with 4 options (Low, Medium, High, Urgent)
   - Default: Medium

2. **Priority Storage:**
   - Saved in database with complaint
   - Stored as string value

3. **Priority Display:**
   - Shown in complaint cards
   - Visible to all roles

### ⚠️ Current Limitation:

**Complaints are sorted by DATE (newest first), NOT by priority.**

**Current sorting:**
```javascript
complaints = await Complaint.find().sort({ createdAt: -1 })
// Sorts by creation date (newest first)
```

**This means:**
- Urgent complaints might appear below Low priority complaints
- If urgent complaint is older, it shows lower in list

---

## 🎯 How Priority Should Work (Best Practice)

### Ideal Priority-Based System:

1. **Sort by Priority First, Then Date:**
   ```
   Urgent → High → Medium → Low
   (Within same priority: newest first)
   ```

2. **Visual Indicators:**
   - Color-coded badges
   - Urgent = Red
   - High = Orange
   - Medium = Yellow
   - Low = Green

3. **Filter by Priority:**
   - Warden can filter: "Show only Urgent"
   - Staff can see priority-based list

---

## 💡 How Priority Helps

### For Warden:
- **See urgent complaints first** → Assign to staff immediately
- **Identify critical issues** → Prioritize resources
- **Monitor high-priority complaints** → Ensure quick resolution

### For Staff:
- **Handle urgent complaints first** → Better service
- **Plan work schedule** → Urgent → High → Medium → Low
- **Track priority distribution** → Workload management

### For Students:
- **Set appropriate priority** → Get faster response for urgent issues
- **Understand response time** → Urgent = faster, Low = slower

---

## 📊 Priority Examples

### Example 1: Water Issue
- **Priority: Urgent** ✅
- **Reason:** No water = critical daily need
- **Expected Response:** Immediate (within hours)

### Example 2: WiFi Slow
- **Priority: Medium** ✅
- **Reason:** Affects work but not critical
- **Expected Response:** Within 1-2 days

### Example 3: Door Squeak
- **Priority: Low** ✅
- **Reason:** Annoying but not urgent
- **Expected Response:** When convenient

### Example 4: Electrical Sparking
- **Priority: Urgent** ✅
- **Reason:** Safety hazard
- **Expected Response:** Immediate (emergency)

---

## 🔍 Where Priority is Used

### 1. **Complaint Submission Form:**
- File: `public/index.html`
- Line: ~200-207
- Function: Student selects priority

### 2. **Backend Storage:**
- File: `routes/complaints.js`
- Line: ~33, 41
- Function: Saves priority with complaint

### 3. **Database Model:**
- File: `models/Complaint.js`
- Line: ~27-31
- Function: Defines priority field

### 4. **Display:**
- File: `public/app.js`
- Line: ~821
- Function: Shows priority in complaint card

---

## 🎨 Visual Priority Indicators (Current)

Currently, priority is shown as **text**:
```
Priority: urgent
Priority: high
Priority: medium
Priority: low
```

**Could be enhanced with:**
- Color-coded badges
- Icons (⚠️ for urgent)
- Sorting by priority

---

## 📈 Priority Statistics

Warden can see:
- How many urgent complaints
- How many high priority
- Priority distribution in statistics

**Location:** `routes/stats.js` - Statistics endpoint

---

## ✅ Summary

### How Priority Works:

1. **Student selects priority** when submitting complaint
2. **Priority is saved** in database
3. **Priority is displayed** in complaint cards
4. **Helps staff/warden** identify urgent issues

### Current Status:

✅ Priority selection works  
✅ Priority storage works  
✅ Priority display works  
⚠️ **Not sorted by priority** (sorted by date)

### Priority Levels:

- **Urgent** = Critical, immediate action needed
- **High** = Important, needs attention soon
- **Medium** = Normal priority (default)
- **Low** = Not urgent, can wait

---

**Priority system helps identify and handle urgent complaints first! 🎯**




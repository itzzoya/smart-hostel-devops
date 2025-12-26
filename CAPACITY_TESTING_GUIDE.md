# 🧪 Capacity Testing Guide - Verify Capacity Logic

## 🎯 How Capacity Works

**Capacity** = Maximum number of people who can book the **same time slot** simultaneously.

### Example: Resource with Capacity = 2

- ✅ **Person 1** books: 10:00-12:00 → **Allowed** (1/2 slots used)
- ✅ **Person 2** books: 10:00-12:00 → **Allowed** (2/2 slots used - FULL)
- ❌ **Person 3** tries: 10:00-12:00 → **Rejected** (Capacity full!)

---

## ✅ Testing Steps

### Step 1: Create Resource with Capacity = 2

1. **Login as Warden:** `warden@hostel.com` / `warden123`
2. Go to **"Resources"** tab
3. Click **"Add New Resource"**
4. Fill form:
   - **Name:** `Test Study Room`
   - **Category:** `Study Room`
   - **Location:** `Test Location`
   - **Capacity:** `2` ⭐ (Important!)
5. Click **"Add Resource"**

### Step 2: Test Booking Capacity

#### Test 1: First Booking (Should Work)
1. **Login as Student 1:** `student1@hostel.com` / `student123`
2. Go to **"Resource Booking"** tab
3. Find "Test Study Room"
4. Click **"Book Now"**
5. Select:
   - **Date:** Today or future date
   - **Start Time:** `10:00`
   - **End Time:** `12:00`
6. Click **"Confirm Booking"**
7. ✅ **Should succeed:** "Booking confirmed successfully!"

#### Test 2: Second Booking (Should Work)
1. **Login as Student 2:** `student2@hostel.com` / `student123`
   - (Or register a new student)
2. Go to **"Resource Booking"** tab
3. Find "Test Study Room"
4. Click **"Book Now"**
5. Select **same date and time:**
   - **Date:** Same as Test 1
   - **Start Time:** `10:00`
   - **End Time:** `12:00`
6. Click **"Confirm Booking"**
7. ✅ **Should succeed:** "Booking confirmed successfully!"
   - Now 2/2 slots are used (FULL)

#### Test 3: Third Booking (Should FAIL)
1. **Login as Student 3:** `student3@hostel.com` / `student123`
   - (Or register a new student)
2. Go to **"Resource Booking"** tab
3. Find "Test Study Room"
4. Click **"Book Now"**
5. Select **same date and time:**
   - **Date:** Same as Test 1 & 2
   - **Start Time:** `10:00`
   - **End Time:** `12:00`
6. Click **"Confirm Booking"**
7. ❌ **Should FAIL with error:**
   ```
   Sorry! This resource is fully booked for the selected time slot.
   
   Capacity: 2 people
   Already booked: 2 people
   Available slots: 0
   
   Please choose a different time slot.
   ```

---

## 🔍 Testing Different Scenarios

### Scenario 1: Different Time Slots (Should Work)
- **Person 1:** 10:00-12:00 ✅
- **Person 2:** 10:00-12:00 ✅
- **Person 3:** 12:00-14:00 ✅ (Different time - should work!)

### Scenario 2: Overlapping Times
- **Person 1:** 10:00-12:00 ✅
- **Person 2:** 10:00-12:00 ✅
- **Person 3:** 11:00-13:00 ❌ (Overlaps with 10:00-12:00 - counts toward capacity)

### Scenario 3: Adjacent Times (Should Work)
- **Person 1:** 10:00-12:00 ✅
- **Person 2:** 10:00-12:00 ✅
- **Person 3:** 12:00-14:00 ✅ (No overlap - should work!)

---

## 📊 Expected Behavior

| Capacity | Bookings | Result |
|----------|----------|--------|
| 2 | 0 bookings | ✅ Allow (0/2) |
| 2 | 1 booking | ✅ Allow (1/2) |
| 2 | 2 bookings | ✅ Allow (2/2) |
| 2 | 3 bookings | ❌ Reject (3/2 - OVER CAPACITY) |

---

## 🎯 Error Messages

### When Capacity is Full:
```
Sorry! This resource is fully booked for the selected time slot.

Capacity: 2 people
Already booked: 2 people
Available slots: 0

Please choose a different time slot.
```

### When Resource Unavailable:
```
Resource is currently unavailable
```

### When Resource Not Found:
```
Resource not found
```

---

## ✅ Verification Checklist

- [ ] Resource created with capacity = 2
- [ ] First booking succeeds (1/2)
- [ ] Second booking succeeds (2/2)
- [ ] Third booking fails with error message (3/2)
- [ ] Error message shows capacity and current bookings
- [ ] Different time slots work (no overlap)
- [ ] Overlapping time slots count toward capacity

---

## 🔧 Troubleshooting

### Problem: All bookings succeed (no capacity check)
**Solution:** Check server logs, verify capacity logic is running

### Problem: Error message not showing
**Solution:** Check browser console, verify API response

### Problem: Wrong capacity count
**Solution:** Check time overlap logic, verify date comparison

---

## 📝 Quick Test Commands

### Create Test Resource (via API):
```bash
# Login as warden first, get token
POST /api/resources
{
  "name": "Test Room",
  "category": "study-room",
  "location": "Test",
  "capacity": 2
}
```

### Test Booking (via API):
```bash
# Login as student, get token
POST /api/resources/bookings
{
  "resourceId": "...",
  "bookingDate": "2024-01-20",
  "startTime": "10:00",
  "endTime": "12:00"
}
```

---

## 🎉 Success Criteria

✅ **Capacity = 2 means:**
- 2 people can book same time slot ✅
- 3rd person gets error message ✅
- Error shows capacity and current bookings ✅
- Different time slots work independently ✅

**Your capacity logic is working correctly! 🚀**




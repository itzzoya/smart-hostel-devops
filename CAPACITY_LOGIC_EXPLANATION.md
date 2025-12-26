# 📊 Resource Capacity Logic - How It Works

## 🎯 What is Capacity?

**Capacity** = **Maximum number of people who can use the resource at the same time**

### Examples:

| Resource | Capacity | Meaning |
|----------|----------|---------|
| Washing Machine | 1 | Only 1 person can use it at a time |
| Study Room A | 3 | Up to 3 students can book the same time slot |
| Study Room B | 10 | Up to 10 students can book together |
| Gym | 20 | Up to 20 people can use simultaneously |

---

## 🔄 How Capacity Logic Works

### Before (Old Logic):
- ❌ **Only 1 booking allowed** per time slot
- ❌ If someone booked 10:00-12:00, no one else could book that time
- ❌ Capacity was displayed but not enforced

### After (New Logic):
- ✅ **Multiple bookings allowed** up to capacity
- ✅ If capacity = 3, **3 people can book the same time slot**
- ✅ System checks capacity before allowing booking
- ✅ Shows how many slots are available

---

## 📋 Booking Flow with Capacity

### Example: Study Room with Capacity = 3

**Scenario:** Study Room A (Capacity: 3) on Jan 20, 10:00-12:00

1. **Student 1 books** 10:00-12:00
   - ✅ Allowed (1/3 slots used)
   - Remaining: 2 slots

2. **Student 2 books** 10:00-12:00
   - ✅ Allowed (2/3 slots used)
   - Remaining: 1 slot

3. **Student 3 books** 10:00-12:00
   - ✅ Allowed (3/3 slots used)
   - Remaining: 0 slots

4. **Student 4 tries to book** 10:00-12:00
   - ❌ **Rejected** - Capacity full
   - Message: "Resource is fully booked for this time slot. Capacity: 3, Current bookings: 3"

---

## 🔍 How Time Overlap is Checked

The system checks if time slots overlap:

### Overlapping Examples:

| Requested Time | Existing Booking | Overlap? |
|----------------|------------------|----------|
| 10:00-12:00 | 10:00-12:00 | ✅ Yes (same time) |
| 10:00-12:00 | 11:00-13:00 | ✅ Yes (overlaps) |
| 10:00-12:00 | 09:00-11:00 | ✅ Yes (overlaps) |
| 10:00-12:00 | 12:00-14:00 | ❌ No (adjacent) |
| 10:00-12:00 | 08:00-10:00 | ❌ No (adjacent) |

**Rule:** If requested time overlaps with existing booking, it counts toward capacity.

---

## 💻 Technical Implementation

### Booking Check Process:

1. **Get Resource:**
   ```javascript
   const resource = await Resource.findById(resourceId);
   // resource.capacity = 3
   ```

2. **Find Overlapping Bookings:**
   ```javascript
   // Find all bookings for same date and resource
   const existingBookings = await Booking.find({
     resourceId,
     bookingDate: sameDate,
     status: 'confirmed'
   });
   ```

3. **Count Overlaps:**
   ```javascript
   // Check each booking for time overlap
   let overlappingCount = 0;
   existingBookings.forEach(booking => {
     if (timeSlotsOverlap(requestedTime, booking.time)) {
       overlappingCount++;
     }
   });
   ```

4. **Check Capacity:**
   ```javascript
   if (overlappingCount >= resource.capacity) {
     // Reject booking - capacity full
   } else {
     // Allow booking
   }
   ```

---

## 🎯 Real-World Examples

### Example 1: Washing Machine (Capacity: 1)
- **Student A** books: 10:00-11:00 ✅
- **Student B** tries: 10:00-11:00 ❌ (Capacity full)
- **Student B** books: 11:00-12:00 ✅ (Different time)

### Example 2: Study Room (Capacity: 3)
- **Student A** books: 10:00-12:00 ✅ (1/3)
- **Student B** books: 10:00-12:00 ✅ (2/3)
- **Student C** books: 10:00-12:00 ✅ (3/3)
- **Student D** tries: 10:00-12:00 ❌ (Capacity full)
- **Student D** books: 12:00-14:00 ✅ (Different time)

### Example 3: Gym (Capacity: 20)
- **20 students** can book: 10:00-12:00 ✅
- **21st student** tries: 10:00-12:00 ❌ (Capacity full)

---

## 📊 Capacity Display

### In Resource Cards:
- Shows: **"Capacity: 3"**
- Shows: **"Available"** or **"Unavailable"**

### When Booking:
- Shows error if capacity full
- Message: "Resource is fully booked for this time slot. Capacity: 3, Current bookings: 3"

---

## ✅ Summary

- ✅ **Capacity = Maximum simultaneous users**
- ✅ **Multiple bookings allowed** up to capacity
- ✅ **Time overlap detection** works correctly
- ✅ **Capacity enforcement** prevents overbooking
- ✅ **Clear error messages** when capacity full

---

## 🔧 Testing Capacity

1. **Add Resource with Capacity 3:**
   - Login as Warden
   - Add "Study Room A" with Capacity: 3

2. **Test Multiple Bookings:**
   - Login as Student 1 → Book 10:00-12:00 ✅
   - Login as Student 2 → Book 10:00-12:00 ✅
   - Login as Student 3 → Book 10:00-12:00 ✅
   - Login as Student 4 → Book 10:00-12:00 ❌ (Should fail)

**Capacity logic is now working correctly! 🎉**




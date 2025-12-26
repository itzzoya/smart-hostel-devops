const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Resource = require('../models/Resource');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-hostel';

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB');
        
        // Clear existing data (optional - comment out if you want to keep existing data)
        // await User.deleteMany({});
        // await Resource.deleteMany({});
        
        // Create Warden
        const wardenExists = await User.findOne({ role: 'warden' });
        if (!wardenExists) {
            const warden = new User({
                name: 'Admin Warden',
                email: 'warden@hostel.com',
                password: await bcrypt.hash('warden123', 10),
                role: 'warden'
            });
            await warden.save();
            console.log('✅ Created Warden account: warden@hostel.com / warden123');
        }
        
        // Create Staff Members
        const staffMembers = [
            { name: 'John Smith', email: 'staff1@hostel.com' },
            { name: 'Sarah Johnson', email: 'staff2@hostel.com' },
            { name: 'Mike Davis', email: 'staff3@hostel.com' }
        ];
        
        for (const staff of staffMembers) {
            const exists = await User.findOne({ email: staff.email });
            if (!exists) {
                const staffUser = new User({
                    name: staff.name,
                    email: staff.email,
                    password: await bcrypt.hash('staff123', 10),
                    role: 'staff'
                });
                await staffUser.save();
                console.log(`✅ Created Staff: ${staff.email} / staff123`);
            }
        }
        
        // Create Sample Students
        const students = [
            { name: 'Alice Brown', email: 'student1@hostel.com', hostelBlock: 'Block A', roomNumber: '101' },
            { name: 'Bob Wilson', email: 'student2@hostel.com', hostelBlock: 'Block B', roomNumber: '205' },
            { name: 'Charlie Miller', email: 'student3@hostel.com', hostelBlock: 'Block A', roomNumber: '102' }
        ];
        
        for (const student of students) {
            const exists = await User.findOne({ email: student.email });
            if (!exists) {
                const studentUser = new User({
                    name: student.name,
                    email: student.email,
                    password: await bcrypt.hash('student123', 10),
                    role: 'student',
                    hostelBlock: student.hostelBlock,
                    roomNumber: student.roomNumber
                });
                await studentUser.save();
                console.log(`✅ Created Student: ${student.email} / student123`);
            }
        }
        
        // Create Sample Resources
        const resources = [
            {
                name: 'Washing Machine 1',
                description: 'Front-loading washing machine',
                category: 'washing-machine',
                location: 'Ground Floor - Laundry Room',
                capacity: 1,
                isAvailable: true
            },
            {
                name: 'Washing Machine 2',
                description: 'Top-loading washing machine',
                category: 'washing-machine',
                location: 'Ground Floor - Laundry Room',
                capacity: 1,
                isAvailable: true
            },
            {
                name: 'Study Room A',
                description: 'Quiet study room with tables and chairs',
                category: 'study-room',
                location: 'First Floor - Library Wing',
                capacity: 10,
                isAvailable: true
            },
            {
                name: 'Study Room B',
                description: 'Group study room with projector',
                category: 'study-room',
                location: 'First Floor - Library Wing',
                capacity: 15,
                isAvailable: true
            },
            {
                name: 'Gym',
                description: 'Fully equipped gym with weights and cardio machines',
                category: 'gym',
                location: 'Basement',
                capacity: 20,
                isAvailable: true
            },
            {
                name: 'Common Room',
                description: 'Recreation room with TV and games',
                category: 'common-room',
                location: 'Ground Floor',
                capacity: 30,
                isAvailable: true
            }
        ];
        
        for (const resource of resources) {
            const exists = await Resource.findOne({ name: resource.name });
            if (!exists) {
                const newResource = new Resource(resource);
                await newResource.save();
                console.log(`✅ Created Resource: ${resource.name}`);
            }
        }
        
        console.log('\n🎉 Seeding completed successfully!');
        console.log('\n📝 Test Accounts:');
        console.log('Warden: warden@hostel.com / warden123');
        console.log('Staff: staff1@hostel.com / staff123');
        console.log('Student: student1@hostel.com / student123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

seed();




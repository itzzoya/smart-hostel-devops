// Global variables
let currentUser = null;
let authToken = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setMinDate();
});

// Check authentication status
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        authToken = token;
        currentUser = JSON.parse(user);
        showDashboard();
    } else {
        showPage('home');
    }
}

// Show page
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(pageId + 'Page');
    if (page) {
        page.classList.add('active');
    }
    
    // Update navigation
    updateNavigation();
}

// Update navigation based on auth status
function updateNavigation() {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    
    if (currentUser) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }
}

// Show dashboard based on user role
function showDashboard() {
    if (!currentUser) return;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the correct dashboard
    const dashboardElement = document.getElementById(currentUser.role + 'Dashboard');
    if (dashboardElement) {
        dashboardElement.classList.add('active');
    }
    
    // Update navigation
    updateNavigation();
    
    // Set user name in dashboard
    const nameElement = document.getElementById(currentUser.role + 'Name');
    if (nameElement) {
        nameElement.textContent = currentUser.name;
    }
    
    // Load dashboard data
    loadDashboardData();
}

// Load dashboard data based on role
function loadDashboardData() {
    if (!currentUser) return;
    
    switch (currentUser.role) {
        case 'student':
            loadStudentData();
            break;
        case 'staff':
            loadStaffData();
            break;
        case 'warden':
            loadWardenData();
            break;
    }
}

// Toggle role-specific fields in registration
function toggleRoleFields() {
    const role = document.getElementById('registerRole').value;
    const hostelBlockGroup = document.getElementById('hostelBlockGroup');
    const roomNumberGroup = document.getElementById('roomNumberGroup');
    
    if (role === 'student') {
        hostelBlockGroup.style.display = 'block';
        roomNumberGroup.style.display = 'block';
        document.getElementById('registerHostelBlock').required = true;
        document.getElementById('registerRoomNumber').required = true;
    } else {
        hostelBlockGroup.style.display = 'none';
        roomNumberGroup.style.display = 'none';
        document.getElementById('registerHostelBlock').required = false;
        document.getElementById('registerRoomNumber').required = false;
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        role: document.getElementById('registerRole').value,
        hostelBlock: document.getElementById('registerHostelBlock').value,
        roomNumber: document.getElementById('registerRoomNumber').value
    };
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            authToken = data.token;
            currentUser = data.user;
            showDashboard();
            showMessage('Registration successful!', 'success');
        } else {
            showError('registerError', data.message);
        }
    } catch (error) {
        showError('registerError', 'Network error. Please try again.');
    }
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            authToken = data.token;
            currentUser = data.user;
            showDashboard();
            showMessage('Login successful!', 'success');
        } else {
            showError('loginError', data.message);
        }
    } catch (error) {
        showError('loginError', 'Network error. Please try again.');
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authToken = null;
    currentUser = null;
    showPage('home');
    showMessage('Logged out successfully!', 'info');
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 5000);
    }
}

// Show success/info message
function showMessage(message, type = 'success') {
    // Create message element if it doesn't exist
    let messageElement = document.getElementById('globalMessage');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'globalMessage';
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(messageElement);
    }
    
    // Set message and style based on type
    messageElement.textContent = message;
    messageElement.className = `message-${type}`;
    
    if (type === 'success') {
        messageElement.style.background = '#10b981';
    } else if (type === 'error') {
        messageElement.style.background = '#ef4444';
    } else {
        messageElement.style.background = '#3b82f6';
    }
    
    // Show and hide message
    messageElement.style.opacity = '1';
    setTimeout(() => {
        messageElement.style.opacity = '0';
    }, 3000);
}

// API helper function
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    if (finalOptions.body && typeof finalOptions.body === 'object') {
        finalOptions.body = JSON.stringify(finalOptions.body);
    }
    
    try {
        const response = await fetch(endpoint, finalOptions);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API call failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Student Dashboard Functions
async function loadStudentData() {
    try {
        await Promise.all([
            loadStudentComplaints(),
            loadResources(),
            loadMyBookings()
        ]);
    } catch (error) {
        console.error('Error loading student data:', error);
        showMessage('Error loading dashboard data', 'error');
    }
}

async function loadStudentComplaints() {
    try {
        const data = await apiCall('/api/complaints');
        const complaintsContainer = document.getElementById('studentComplaintsList');
        
        if (data && data.length > 0) {
            complaintsContainer.innerHTML = data.map(complaint => `
                <div class="complaint-card">
                    <div class="complaint-header">
                        <h4 class="complaint-title">${complaint.title}</h4>
                        <span class="complaint-status status-${complaint.status}">${complaint.status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <div class="complaint-info">
                        <div><strong>Category:</strong> ${complaint.category}</div>
                        <div><strong>Priority:</strong> ${complaint.priority}</div>
                        <div><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</div>
                        ${complaint.assignedStaffName ? `<div><strong>Assigned to:</strong> ${complaint.assignedStaffName}</div>` : ''}
                    </div>
                    <div class="complaint-description">${complaint.description}</div>
                    ${complaint.resolutionNotes ? `<div class="resolution-notes"><strong>Resolution:</strong> ${complaint.resolutionNotes}</div>` : ''}
                </div>
            `).join('');
        } else {
            complaintsContainer.innerHTML = '<p>No complaints found. Submit your first complaint!</p>';
        }
    } catch (error) {
        console.error('Error loading complaints:', error);
    }
}

async function submitComplaint(event) {
    event.preventDefault();
    
    const complaintData = {
        title: document.getElementById('complaintTitle').value,
        category: document.getElementById('complaintCategory').value,
        priority: document.getElementById('complaintPriority').value,
        description: document.getElementById('complaintDescription').value
    };
    
    try {
        await apiCall('/api/complaints', {
            method: 'POST',
            body: complaintData
        });
        
        showMessage('Complaint submitted successfully!', 'success');
        document.getElementById('complaintForm').reset();
        loadStudentComplaints();
        showStudentTab('complaints');
    } catch (error) {
        showMessage('Error submitting complaint: ' + error.message, 'error');
    }
}

async function loadResources() {
    try {
        const data = await apiCall('/api/resources');
        const resourcesContainer = document.getElementById('resourcesList');
        
        if (data && data.length > 0) {
            // Get today's bookings for availability check
            const today = new Date().toISOString().split('T')[0];
            
            resourcesContainer.innerHTML = await Promise.all(data.map(async resource => {
                let availabilityInfo = '';
                try {
                    const availability = await apiCall(`/api/resources/${resource._id}/availability?date=${today}`);
                    const activeBookings = availability.bookings?.length || 0;
                    const availableSlots = resource.capacity - activeBookings;
                    
                    if (availableSlots > 0) {
                        availabilityInfo = `<span class="resource-available">Available (${availableSlots}/${resource.capacity})</span>`;
                    } else {
                        availabilityInfo = `<span class="resource-unavailable">Fully Booked Today</span>`;
                    }
                } catch (error) {
                    availabilityInfo = `<span class="resource-available">Available</span>`;
                }
                
                return `
                    <div class="resource-card">
                        <div class="resource-header">
                            <h4 class="resource-name">${resource.name}</h4>
                            <span class="resource-category">${resource.category}</span>
                        </div>
                        <div class="resource-info">
                            <div><strong>Location:</strong> ${resource.location}</div>
                            <div><strong>Capacity:</strong> ${resource.capacity} users</div>
                            ${resource.description ? `<div><strong>Description:</strong> ${resource.description}</div>` : ''}
                        </div>
                        ${availabilityInfo}
                        <div class="resource-actions">
                            <button class="btn btn-primary" onclick="openBookingModal('${resource._id}', '${resource.name}')">Book Now</button>
                            <button class="btn btn-secondary" onclick="checkAvailability('${resource._id}', '${resource.name}')">Check Availability</button>
                        </div>
                    </div>
                `;
            }));
            
            resourcesContainer.innerHTML = (await Promise.all(resourcesContainer.innerHTML)).join('');
        } else {
            resourcesContainer.innerHTML = '<p>No resources available for booking.</p>';
        }
    } catch (error) {
        console.error('Error loading resources:', error);
        document.getElementById('resourcesList').innerHTML = '<p>Error loading resources. Please try again.</p>';
    }
}

async function loadMyBookings() {
    try {
        const data = await apiCall('/api/resources/bookings');
        const bookingsContainer = document.getElementById('myBookings');
        
        if (data && data.length > 0) {
            bookingsContainer.innerHTML = data.map(booking => {
                const bookingDate = new Date(booking.bookingDate);
                const now = new Date();
                const isPast = bookingDate < now;
                const canCancel = !isPast && booking.status === 'confirmed';
                
                return `
                    <div class="booking-card ${isPast ? 'booking-past' : ''}">
                        <div class="booking-header">
                            <h5>${booking.resourceName}</h5>
                            <span class="booking-status status-${booking.status}">${booking.status.toUpperCase()}</span>
                        </div>
                        <div class="booking-info">
                            <div><strong>Date:</strong> ${bookingDate.toLocaleDateString()}</div>
                            <div><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</div>
                            <div><strong>Status:</strong> ${booking.status}</div>
                            ${isPast ? '<div class="booking-past-label">Past Booking</div>' : ''}
                        </div>
                        ${canCancel ? `<button class="btn btn-danger btn-sm" onclick="cancelBooking('${booking._id}', '${booking.resourceName}')">Cancel Booking</button>` : ''}
                    </div>
                `;
            }).join('');
        } else {
            bookingsContainer.innerHTML = '<p>No bookings found.</p>';
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

// Cancel Booking
async function cancelBooking(bookingId, resourceName) {
    if (!confirm(`Cancel booking for "${resourceName}"?`)) return;
    
    try {
        await apiCall(`/api/resources/bookings/${bookingId}`, {
            method: 'DELETE'
        });
        
        showMessage('Booking cancelled successfully!', 'success');
        loadMyBookings();
        loadResources();
    } catch (error) {
        showMessage('Error cancelling booking: ' + error.message, 'error');
    }
}

// Staff Dashboard Functions
async function loadStaffData() {
    try {
        await loadStaffComplaints();
    } catch (error) {
        console.error('Error loading staff data:', error);
        showMessage('Error loading dashboard data', 'error');
    }
}

async function loadStaffComplaints() {
    try {
        const data = await apiCall('/api/complaints');
        const complaintsContainer = document.getElementById('staffComplaintsList');
        
        if (data && data.length > 0) {
            complaintsContainer.innerHTML = data.map(complaint => {
                const createdDate = new Date(complaint.createdAt).toLocaleDateString();
                const resolvedDate = complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleDateString() : null;
                
                return `
                <div class="complaint-card">
                    <div class="complaint-header">
                        <h4 class="complaint-title">${complaint.title}</h4>
                        <span class="complaint-status status-${complaint.status}">${complaint.status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <div class="complaint-info">
                        <div><strong>Student:</strong> ${complaint.studentName}</div>
                        <div><strong>Category:</strong> ${complaint.category}</div>
                        <div><strong>Priority:</strong> ${complaint.priority}</div>
                        <div><strong>Created:</strong> ${createdDate}</div>
                        ${resolvedDate ? `<div><strong>Completed:</strong> ${resolvedDate}</div>` : ''}
                    </div>
                    <div class="complaint-description">${complaint.description}</div>
                    ${complaint.resolutionNotes ? `<div class="resolution-notes"><strong>Resolution:</strong> ${complaint.resolutionNotes}</div>` : ''}
                    <div class="complaint-actions">
                        ${complaint.status !== 'in-progress' ? `<button class="btn btn-primary" onclick="updateComplaintStatus('${complaint._id}', 'in-progress')">In Progress</button>` : ''}
                        ${complaint.status !== 'resolved' ? `<button class="btn btn-success" onclick="showResolutionModal('${complaint._id}')">Resolved</button>` : ''}
                        ${complaint.status !== 'closed' ? `<button class="btn btn-secondary" onclick="updateComplaintStatus('${complaint._id}', 'closed')">Completed</button>` : ''}
                    </div>
                </div>
            `;
            }).join('');
        } else {
            complaintsContainer.innerHTML = '<p>No complaints assigned to you.</p>';
        }
    } catch (error) {
        console.error('Error loading staff complaints:', error);
    }
}

async function updateComplaintStatus(complaintId, status, resolutionNotes = '') {
    try {
        const updateData = { status };
        if (resolutionNotes) {
            updateData.resolutionNotes = resolutionNotes;
        }
        
        await apiCall(`/api/complaints/${complaintId}/status`, {
            method: 'PUT',
            body: updateData
        });
        
        const statusMessages = {
            'in-progress': 'Complaint marked as In Progress',
            'resolved': 'Complaint marked as Resolved', 
            'closed': 'Complaint marked as Completed'
        };
        
        showMessage(statusMessages[status] || 'Status updated successfully!', 'success');
        loadStaffComplaints();
    } catch (error) {
        showMessage('Error updating complaint: ' + error.message, 'error');
    }
}

// Warden Dashboard Functions
async function loadWardenData() {
    try {
        await Promise.all([
            loadWardenComplaints(),
            loadWardenResources(),
            loadStats()
        ]);
        await loadStaffList();
    } catch (error) {
        console.error('Error loading warden data:', error);
        showMessage('Error loading dashboard data', 'error');
    }
}

async function loadWardenComplaints() {
    try {
        const data = await apiCall('/api/complaints');
        const complaintsContainer = document.getElementById('wardenComplaintsList');
        
        if (data && data.length > 0) {
            complaintsContainer.innerHTML = data.map(complaint => `
                <div class="complaint-card">
                    <div class="complaint-header">
                        <h4 class="complaint-title">${complaint.title}</h4>
                        <span class="complaint-status status-${complaint.status}">${complaint.status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <div class="complaint-info">
                        <div><strong>Student:</strong> ${complaint.studentName}</div>
                        <div><strong>Category:</strong> ${complaint.category}</div>
                        <div><strong>Priority:</strong> ${complaint.priority}</div>
                        <div><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</div>
                        ${complaint.assignedStaffName ? `<div><strong>Assigned to:</strong> ${complaint.assignedStaffName}</div>` : ''}
                        ${complaint.resolvedAt ? `<div><strong>Completed:</strong> ${new Date(complaint.resolvedAt).toLocaleDateString()}</div>` : ''}
                    </div>
                    <div class="complaint-description">${complaint.description}</div>
                    ${complaint.resolutionNotes ? `<div class="resolution-notes"><strong>Resolution:</strong> ${complaint.resolutionNotes}</div>` : ''}
                    <div class="complaint-actions">
                        ${complaint.status === 'pending' ? `<button class="btn btn-primary" onclick="openAssignStaffModal('${complaint._id}')">Assign Staff</button>` : ''}
                        ${complaint.status === 'closed' ? `<button class="btn btn-danger" onclick="deleteComplaint('${complaint._id}', '${complaint.title}')">Delete</button>` : ''}
                    </div>
                </div>
            `).join('');
        } else {
            complaintsContainer.innerHTML = '<p>No complaints found.</p>';
        }
    } catch (error) {
        console.error('Error loading warden complaints:', error);
    }
}

async function loadWardenResources() {
    try {
        const data = await apiCall('/api/resources');
        const resourcesContainer = document.getElementById('wardenResourcesList');
        
        if (data && data.length > 0) {
            resourcesContainer.innerHTML = data.map(resource => `
                <div class="resource-card">
                    <div class="resource-header">
                        <h4 class="resource-name">${resource.name}</h4>
                        <span class="resource-category">${resource.category}</span>
                    </div>
                    <div class="resource-info">
                        <div><strong>Location:</strong> ${resource.location}</div>
                        <div><strong>Capacity:</strong> ${resource.capacity}</div>
                        ${resource.description ? `<div><strong>Description:</strong> ${resource.description}</div>` : ''}
                        <div><strong>Created:</strong> ${new Date(resource.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div class="resource-actions" style="margin-top: 15px;">
                        <button class="btn btn-danger" onclick="deleteResource('${resource._id}', '${resource.name}')">Delete Resource</button>
                    </div>
                </div>
            `).join('');
        } else {
            resourcesContainer.innerHTML = '<p>No resources found. Add your first resource!</p>';
        }
    } catch (error) {
        console.error('Error loading warden resources:', error);
    }
}

async function loadStats() {
    try {
        const data = await apiCall('/api/stats');
        const statsContainer = document.getElementById('statsContent');
        
        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${data.complaints?.total || 0}</div>
                <div class="stat-label">Total Complaints</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.complaints?.pending || 0}</div>
                <div class="stat-label">Pending Complaints</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.complaints?.resolved || 0}</div>
                <div class="stat-label">Resolved Complaints</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.resources?.total || 0}</div>
                <div class="stat-label">Total Resources</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.bookings?.total || 0}</div>
                <div class="stat-label">Total Bookings</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${(data.users?.students || 0) + (data.users?.staff || 0)}</div>
                <div class="stat-label">Total Users</div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadStaffList() {
    try {
        const data = await apiCall('/api/users/staff');
        const staffSelect = document.getElementById('assignStaffSelect');
        
        if (data && data.length > 0) {
            staffSelect.innerHTML = '<option value="">Select Staff Member</option>' +
                data.map(staff => `<option value="${staff._id}">${staff.name}</option>`).join('');
        } else {
            staffSelect.innerHTML = '<option value="">No staff members found</option>';
        }
    } catch (error) {
        console.error('Error loading staff list:', error);
    }
}

// Tab Functions
function showStudentTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('#studentDashboard .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#studentDashboard .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById('student' + tabName.charAt(0).toUpperCase() + tabName.slice(1) + 'Tab').classList.add('active');
    
    // Find and activate the clicked button
    const buttons = document.querySelectorAll('#studentDashboard .tab-btn');
    buttons.forEach((btn, index) => {
        if ((tabName === 'complaints' && index === 0) || 
            (tabName === 'submit' && index === 1) || 
            (tabName === 'bookings' && index === 2)) {
            btn.classList.add('active');
        }
    });
}

function showWardenTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('#wardenDashboard .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#wardenDashboard .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById('warden' + tabName.charAt(0).toUpperCase() + tabName.slice(1) + 'Tab').classList.add('active');
    
    // Find and activate the clicked button
    const buttons = document.querySelectorAll('#wardenDashboard .tab-btn');
    buttons.forEach((btn, index) => {
        if ((tabName === 'complaints' && index === 0) || 
            (tabName === 'resources' && index === 1) || 
            (tabName === 'stats' && index === 2)) {
            btn.classList.add('active');
        }
    });
}

// Modal Functions
function showAddResourceModal() {
    document.getElementById('addResourceModal').classList.add('active');
}

function closeAddResourceModal() {
    document.getElementById('addResourceModal').classList.remove('active');
    document.getElementById('resourceForm').reset();
}

function openBookingModal(resourceId, resourceName) {
    document.getElementById('bookingResourceId').value = resourceId;
    document.getElementById('bookingResourceName').value = resourceName;
    document.getElementById('bookingModal').classList.add('active');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('active');
    document.getElementById('bookingForm').reset();
}

function openAssignStaffModal(complaintId) {
    document.getElementById('assignComplaintId').value = complaintId;
    document.getElementById('assignStaffModal').classList.add('active');
}

function closeAssignStaffModal() {
    document.getElementById('assignStaffModal').classList.remove('active');
    document.getElementById('assignStaffForm').reset();
}

function showResolutionModal(complaintId) {
    const notes = prompt('Enter resolution notes:');
    if (notes) {
        updateComplaintStatus(complaintId, 'resolved', notes);
    }
}

// Resource Management
async function addResource(event) {
    event.preventDefault();
    
    const resourceData = {
        name: document.getElementById('resourceName').value,
        description: document.getElementById('resourceDescription').value,
        category: document.getElementById('resourceCategory').value,
        location: document.getElementById('resourceLocation').value,
        capacity: parseInt(document.getElementById('resourceCapacity').value)
    };
    
    try {
        await apiCall('/api/resources', {
            method: 'POST',
            body: resourceData
        });
        
        showMessage('Resource added successfully!', 'success');
        closeAddResourceModal();
        loadWardenResources();
    } catch (error) {
        showMessage('Error adding resource: ' + error.message, 'error');
    }
}

// Delete Resource
async function deleteResource(resourceId, resourceName) {
    if (!confirm(`Are you sure you want to delete "${resourceName}"? This action cannot be undone.`)) {
        return;
    }
    
    try {
        await apiCall(`/api/resources/${resourceId}`, {
            method: 'DELETE'
        });
        
        showMessage('Resource deleted successfully!', 'success');
        loadWardenResources();
    } catch (error) {
        if (error.message.includes('active bookings')) {
            showMessage('Cannot delete resource: It has active bookings', 'error');
        } else {
            showMessage('Error deleting resource: ' + error.message, 'error');
        }
    }
}

// Booking Management
async function createBooking(event) {
    event.preventDefault();
    
    const resourceId = document.getElementById('bookingResourceId').value;
    const date = document.getElementById('bookingDate').value;
    const startTime = document.getElementById('bookingStartTime').value;
    const endTime = document.getElementById('bookingEndTime').value;
    
    // Validation
    if (!resourceId || !date || !startTime || !endTime) {
        showMessage('All fields are required', 'error');
        return;
    }
    
    // Time validation
    if (startTime >= endTime) {
        showMessage('End time must be after start time', 'error');
        return;
    }
    
    // Date validation
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
        showMessage('Cannot book for past dates', 'error');
        return;
    }
    
    // Same day booking time validation
    if (bookingDate.toDateString() === new Date().toDateString()) {
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        if (startTime <= currentTime) {
            showMessage('Cannot book for past time today', 'error');
            return;
        }
    }
    
    const bookingData = {
        resourceId,
        bookingDate: date,
        startTime,
        endTime
    };
    
    try {
        await apiCall('/api/resources/bookings', {
            method: 'POST',
            body: bookingData
        });
        
        showMessage('Booking created successfully!', 'success');
        closeBookingModal();
        loadMyBookings();
        loadResources(); // Refresh to show updated availability
    } catch (error) {
        if (error.message.includes('already booked')) {
            showMessage('Time slot already booked. Please choose different time.', 'error');
        } else {
            showMessage('Error creating booking: ' + error.message, 'error');
        }
    }
}

// Staff Assignment
async function confirmAssignStaff(event) {
    event.preventDefault();
    
    const complaintId = document.getElementById('assignComplaintId').value;
    const staffId = document.getElementById('assignStaffSelect').value;
    
    if (!staffId) {
        showMessage('Please select a staff member', 'error');
        return;
    }
    
    try {
        await apiCall(`/api/complaints/${complaintId}/assign`, {
            method: 'PUT',
            body: { staffId }
        });
        
        showMessage('Staff assigned successfully!', 'success');
        closeAssignStaffModal();
        loadWardenComplaints();
    } catch (error) {
        showMessage('Error assigning staff: ' + error.message, 'error');
    }
}

// Delete Complaint
async function deleteComplaint(complaintId, complaintTitle) {
    if (!confirm(`Are you sure you want to delete complaint "${complaintTitle}"? This action cannot be undone.`)) {
        return;
    }
    
    try {
        await apiCall(`/api/complaints/${complaintId}`, {
            method: 'DELETE'
        });
        
        showMessage('Complaint deleted successfully!', 'success');
        
        // Reload appropriate complaints based on user role
        if (currentUser.role === 'staff') {
            loadStaffComplaints();
        } else if (currentUser.role === 'warden') {
            loadWardenComplaints();
        }
    } catch (error) {
        showMessage('Error deleting complaint: ' + error.message, 'error');
    }
}

// Utility Functions
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        dateInput.min = today;
        dateInput.value = today; // Default to today
    }
}

// Check Availability
async function checkAvailability(resourceId, resourceName) {
    const date = prompt(`Check availability for "${resourceName}" on date (YYYY-MM-DD):`, new Date().toISOString().split('T')[0]);
    if (!date) return;
    
    try {
        const data = await apiCall(`/api/resources/${resourceId}/availability?date=${date}`);
        const bookings = data.bookings || [];
        
        let message = `📅 Availability for "${resourceName}" on ${date}:\n\n`;
        
        if (bookings.length === 0) {
            message += '✅ Fully available all day!\n';
            message += `Capacity: ${data.resource.capacity} users can book simultaneously`;
        } else {
            message += `📋 Current bookings (${bookings.length}):\n`;
            bookings.forEach((booking, index) => {
                message += `${index + 1}. ${booking.startTime} - ${booking.endTime}\n`;
            });
            
            const capacity = data.resource.capacity;
            message += `\n📊 Capacity: ${capacity} users can book at same time`;
            message += `\n🔢 Current peak usage: ${bookings.length}/${capacity}`;
            
            if (bookings.length < capacity) {
                message += `\n\n✅ Still available! You can book overlapping times.`;
            } else {
                message += `\n\n❌ Fully booked during these times.`;
            }
        }
        
        alert(message);
    } catch (error) {
        showMessage('Error checking availability: ' + error.message, 'error');
    }
}

// Auto-refresh data every 30 seconds for real-time updates
setInterval(() => {
    if (currentUser && document.visibilityState === 'visible') {
        loadDashboardData();
    }
}, 30000);

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#005f73"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#005f73",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                preloader.style.display = 'none';
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.style.right = '0';
    });

    closeMenuBtn.addEventListener('click', function() {
        mobileMenu.style.right = '-100%';
    });

    // Modal Toggle
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    loginBtn.addEventListener('click', function() {
        openModal(loginModal);
    });

    registerBtn.addEventListener('click', function() {
        openModal(registerModal);
    });

    mobileLoginBtn.addEventListener('click', function() {
        openModal(loginModal);
        mobileMenu.style.right = '-100%';
    });

    mobileRegisterBtn.addEventListener('click', function() {
        openModal(registerModal);
        mobileMenu.style.right = '-100%';
    });

    closeLoginModal.addEventListener('click', function() {
        closeModal(loginModal);
    });

    closeRegisterModal.addEventListener('click', function() {
        closeModal(registerModal);
    });

    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModal(loginModal);
        }
        if (e.target === registerModal) {
            closeModal(registerModal);
        }
    });

    // Form Submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate login
        simulateLogin();
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate registration
        simulateRegistration();
    });

    function simulateLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Simple validation
        if (!username || !password) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';

        // Simulate API call
        setTimeout(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';

            // Check for admin login
            if (username.toLowerCase() === 'admin' && password === 'admin123') {
                closeModal(loginModal);
                showAdminDashboard();
                showToast('Admin login successful', 'success');
            } 
            // Check for customer login
            else if (username.toLowerCase() === 'customer' && password === 'customer123') {
                closeModal(loginModal);
                showCustomerDashboard();
                showToast('Login successful', 'success');
            } else {
                showToast('Invalid credentials', 'error');
            }
        }, 1500);
    }

    function simulateRegistration() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        // Simple validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (!terms) {
            showToast('Please agree to the terms and conditions', 'error');
            return;
        }

        // Show loading state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

        // Simulate API call
        setTimeout(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
            closeModal(registerModal);
            showToast('Account created successfully!', 'success');
            // Auto login after registration
            setTimeout(function() {
                openModal(loginModal);
                document.getElementById('username').value = email;
                document.getElementById('password').value = password;
            }, 1000);
        }, 2000);
    }

    // Show Dashboard Functions
    function showCustomerDashboard() {
        const customerDashboard = document.getElementById('customerDashboard');
        customerDashboard.style.display = 'flex';
        document.querySelector('.main-container').style.display = 'none';
        initializeCustomerDashboard();
    }

    function showAdminDashboard() {
        const adminDashboard = document.getElementById('adminDashboard');
        adminDashboard.style.display = 'flex';
        document.querySelector('.main-container').style.display = 'none';
        initializeAdminDashboard();
    }

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    logoutBtn.addEventListener('click', function() {
        document.getElementById('customerDashboard').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
        showToast('Logged out successfully', 'success');
    });

    adminLogoutBtn.addEventListener('click', function() {
        document.getElementById('adminDashboard').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
        showToast('Logged out successfully', 'success');
    });

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminSidebarToggle = document.getElementById('adminSidebarToggle');
    const dashboardMain = document.querySelector('.dashboard-main');
    const adminMain = document.querySelector('.admin-main');

    sidebarToggle.addEventListener('click', function() {
        document.querySelector('.dashboard-sidebar').classList.toggle('collapsed');
        dashboardMain.classList.toggle('expanded');
        sidebarToggle.classList.toggle('collapsed');
    });

    adminSidebarToggle.addEventListener('click', function() {
        document.querySelector('.admin-sidebar').classList.toggle('collapsed');
        adminMain.classList.toggle('expanded');
        adminSidebarToggle.classList.toggle('collapsed');
    });

    // Initialize Customer Dashboard
    function initializeCustomerDashboard() {
        // Generate sample accounts
        const accountsGrid = document.querySelector('.dashboard-content');
        accountsGrid.innerHTML = `
            <div class="dashboard-widgets">
                <div class="widget welcome-widget">
                    <div class="widget-header">
                        <h3>Welcome back, John!</h3>
                        <p>Here's your financial overview</p>
                    </div>
                    <div class="widget-body">
                        <div class="welcome-stats">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>Total Balance</h4>
                                    <p class="stat-value">$24,568.90</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-arrow-up"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>Income</h4>
                                    <p class="stat-value">$5,200.00</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-arrow-down"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>Expenses</h4>
                                    <p class="stat-value">$3,450.75</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="widget accounts-widget">
                    <div class="widget-header">
                        <h3>Your Accounts</h3>
                        <button class="btn small-btn">View All</button>
                    </div>
                    <div class="widget-body">
                        <div class="accounts-list">
                            <div class="account-item">
                                <div class="account-icon">
                                    <i class="fas fa-university"></i>
                                </div>
                                <div class="account-details">
                                    <h4>Checking Account</h4>
                                    <p class="account-number">•••• 3456</p>
                                </div>
                                <div class="account-balance">
                                    <p>$8,245.67</p>
                                </div>
                            </div>
                            <div class="account-item">
                                <div class="account-icon">
                                    <i class="fas fa-piggy-bank"></i>
                                </div>
                                <div class="account-details">
                                    <h4>Savings Account</h4>
                                    <p class="account-number">•••• 7890</p>
                                </div>
                                <div class="account-balance">
                                    <p>$12,456.89</p>
                                </div>
                            </div>
                            <div class="account-item">
                                <div class="account-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="account-details">
                                    <h4>Investment Account</h4>
                                    <p class="account-number">•••• 1234</p>
                                </div>
                                <div class="account-balance">
                                    <p>$3,866.34</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="widget quick-actions-widget">
                    <div class="widget-header">
                        <h3>Quick Actions</h3>
                    </div>
                    <div class="widget-body">
                        <div class="quick-actions-grid">
                            <button class="quick-action">
                                <div class="action-icon">
                                    <i class="fas fa-paper-plane"></i>
                                </div>
                                <span>Transfer</span>
                            </button>
                            <button class="quick-action">
                                <div class="action-icon">
                                    <i class="fas fa-money-bill-wave"></i>
                                </div>
                                <span>Pay Bills</span>
                            </button>
                            <button class="quick-action">
                                <div class="action-icon">
                                    <i class="fas fa-exchange-alt"></i>
                                </div>
                                <span>Exchange</span>
                            </button>
                            <button class="quick-action">
                                <div class="action-icon">
                                    <i class="fas fa-qrcode"></i>
                                </div>
                                <span>Scan & Pay</span>
                            </button>
                            <button class="quick-action">
                                <div class="action-icon">
                                    <i class="fas fa-credit-card"></i>
                                </div>
                                <span>Cards</span>
                            </button>
                            <button class="quick-action">
                                <div class="action-icon">
                                    <i class="fas fa-hand-holding-usd"></i>
                                </div>
                                <span>Loans</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="widget transactions-widget">
                    <div class="widget-header">
                        <h3>Recent Transactions</h3>
                        <button class="btn small-btn">View All</button>
                    </div>
                    <div class="widget-body">
                        <div class="transactions-list">
                            <div class="transaction-item">
                                <div class="transaction-icon">
                                    <i class="fas fa-shopping-bag"></i>
                                </div>
                                <div class="transaction-details">
                                    <h4>Amazon Purchase</h4>
                                    <p class="transaction-date">Today, 10:45 AM</p>
                                </div>
                                <div class="transaction-amount negative">
                                    <p>-$125.99</p>
                                </div>
                            </div>
                            <div class="transaction-item">
                                <div class="transaction-icon">
                                    <i class="fas fa-arrow-down"></i>
                                </div>
                                <div class="transaction-details">
                                    <h4>Salary Deposit</h4>
                                    <p class="transaction-date">May 1, 2023</p>
                                </div>
                                <div class="transaction-amount positive">
                                    <p>+$5,200.00</p>
                                </div>
                            </div>
                            <div class="transaction-item">
                                <div class="transaction-icon">
                                    <i class="fas fa-utensils"></i>
                                </div>
                                <div class="transaction-details">
                                    <h4>Restaurant Payment</h4>
                                    <p class="transaction-date">Apr 29, 2023</p>
                                </div>
                                <div class="transaction-amount negative">
                                    <p>-$78.50</p>
                                </div>
                            </div>
                            <div class="transaction-item">
                                <div class="transaction-icon">
                                    <i class="fas fa-exchange-alt"></i>
                                </div>
                                <div class="transaction-details">
                                    <h4>Transfer to Savings</h4>
                                    <p class="transaction-date">Apr 28, 2023</p>
                                </div>
                                <div class="transaction-amount negative">
                                    <p>-$1,000.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="widget cards-widget">
                    <div class="widget-header">
                        <h3>Your Cards</h3>
                        <button class="btn small-btn">View All</button>
                    </div>
                    <div class="widget-body">
                        <div class="cards-slider">
                            <div class="card-slide">
                                <div class="card-preview platinum">
                                    <div class="card-top">
                                        <span class="card-name">Platinum Card</span>
                                        <div class="card-chip">
                                            <i class="fas fa-microchip"></i>
                                        </div>
                                    </div>
                                    <div class="card-number">
                                        <span>•••• •••• •••• 4242</span>
                                    </div>
                                    <div class="card-bottom">
                                        <div class="card-holder">
                                            <span>Card Holder</span>
                                            <p>JOHN DOE</p>
                                        </div>
                                        <div class="card-expiry">
                                            <span>Expires</span>
                                            <p>12/25</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-slide">
                                <div class="card-preview black">
                                    <div class="card-top">
                                        <span class="card-name">Black Card</span>
                                        <div class="card-chip">
                                            <i class="fas fa-microchip"></i>
                                        </div>
                                    </div>
                                    <div class="card-number">
                                        <span>•••• •••• •••• 5678</span>
                                    </div>
                                    <div class="card-bottom">
                                        <div class="card-holder">
                                            <span>Card Holder</span>
                                            <p>JOHN DOE</p>
                                        </div>
                                        <div class="card-expiry">
                                            <span>Expires</span>
                                            <p>09/24</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Animate widgets on load
        gsap.from('.widget', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    // Initialize Admin Dashboard
    function initializeAdminDashboard() {
        // Generate admin dashboard content
        const adminContent = document.querySelector('.admin-content');
        adminContent.innerHTML = `
            <div class="admin-widgets">
                <div class="admin-widget stats-widget">
                    <div class="widget-header">
                        <h3>Bank Overview</h3>
                    </div>
                    <div class="widget-body">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>Total Customers</h4>
                                    <p class="stat-value">24,568</p>
                                    <p class="stat-change positive"><i class="fas fa-arrow-up"></i> 12% from last month</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>Total Deposits</h4>
                                    <p class="stat-value">$245.6M</p>
                                    <p class="stat-change positive"><i class="fas fa-arrow-up"></i> 8% from last month</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-hand-holding-usd"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>Total Loans</h4>
                                    <p class="stat-value">$98.3M</p>
                                    <p class="stat-change negative"><i class="fas fa-arrow-down"></i> 3% from last month</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>Profit</h4>
                                    <p class="stat-value">$12.7M</p>
                                    <p class="stat-change positive"><i class="fas fa-arrow-up"></i> 15% from last month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="admin-widget recent-activity-widget">
                    <div class="widget-header">
                        <h3>Recent Activity</h3>
                        <button class="btn small-btn">View All</button>
                    </div>
                    <div class="widget-body">
                        <div class="activity-list">
                            <div class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-user-plus"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>New Customer Registered</h4>
                                    <p class="activity-time">2 minutes ago</p>
                                </div>
                                <div class="activity-action">
                                    <button class="btn small-btn">View</button>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-exchange-alt"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>Large Transfer Processed</h4>
                                    <p class="activity-time">15 minutes ago</p>
                                </div>
                                <div class="activity-action">
                                    <button class="btn small-btn">Details</button>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-credit-card"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>New Card Issued</h4>
                                    <p class="activity-time">1 hour ago</p>
                                </div>
                                <div class="activity-action">
                                    <button class="btn small-btn">View</button>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-hand-holding-usd"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>Loan Application Approved</h4>
                                    <p class="activity-time">3 hours ago</p>
                                </div>
                                <div class="activity-action">
                                    <button class="btn small-btn">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="admin-widget customers-widget">
                    <div class="widget-header">
                        <h3>Recent Customers</h3>
                        <button class="btn small-btn">View All</button>
                    </div>
                    <div class="widget-body">
                        <div class="customers-list">
                            <div class="customer-item">
                                <div class="customer-avatar">
                                    <img src="https://via.placeholder.com/40" alt="Customer Avatar">
                                </div>
                                <div class="customer-details">
                                    <h4>Sarah Johnson</h4>
                                    <p class="customer-email">sarah.johnson@example.com</p>
                                </div>
                                <div class="customer-actions">
                                    <button class="btn small-btn">Profile</button>
                                </div>
                            </div>
                            <div class="customer-item">
                                <div class="customer-avatar">
                                    <img src="https://via.placeholder.com/40" alt="Customer Avatar">
                                </div>
                                <div class="customer-details">
                                    <h4>Michael Brown</h4>
                                    <p class="customer-email">michael.brown@example.com</p>
                                </div>
                                <div class="customer-actions">
                                    <button class="btn small-btn">Profile</button>
                                </div>
                            </div>
                            <div class="customer-item">
                                <div class="customer-avatar">
                                    <img src="https://via.placeholder.com/40" alt="Customer Avatar">
                                </div>
                                <div class="customer-details">
                                    <h4>Emily Davis</h4>
                                    <p class="customer-email">emily.davis@example.com</p>
                                </div>
                                <div class="customer-actions">
                                    <button class="btn small-btn">Profile</button>
                                </div>
                            </div>
                            <div class="customer-item">
                                <div class="customer-avatar">
                                    <img src="https://via.placeholder.com/40" alt="Customer Avatar">
                                </div>
                                <div class="customer-details">
                                    <h4>Robert Wilson</h4>
                                    <p class="customer-email">robert.wilson@example.com</p>
                                </div>
                                <div class="customer-actions">
                                    <button class="btn small-btn">Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="admin-widget transactions-widget">
                    <div class="widget-header">
                        <h3>Recent Transactions</h3>
                        <button class="btn small-btn">View All</button>
                    </div>
                    <div class="widget-body">
                        <div class="transactions-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#TRX-78945</td>
                                        <td>John Doe</td>
                                        <td>Transfer</td>
                                        <td>$1,250.00</td>
                                        <td>May 3, 2023</td>
                                        <td><span class="status-badge completed">Completed</span></td>
                                    </tr>
                                    <tr>
                                        <td>#TRX-78944</td>
                                        <td>Sarah Johnson</td>
                                        <td>Deposit</td>
                                        <td>$5,000.00</td>
                                        <td>May 3, 2023</td>
                                        <td><span class="status-badge completed">Completed</span></td>
                                    </tr>
                                    <tr>
                                        <td>#TRX-78943</td>
                                        <td>Michael Brown</td>
                                        <td>Withdrawal</td>
                                        <td>$800.00</td>
                                        <td>May 2, 2023</td>
                                        <td><span class="status-badge completed">Completed</span></td>
                                    </tr>
                                    <tr>
                                        <td>#TRX-78942</td>
                                        <td>Emily Davis</td>
                                        <td>Payment</td>
                                        <td>$350.50</td>
                                        <td>May 2, 2023</td>
                                        <td><span class="status-badge pending">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td>#TRX-78941</td>
                                        <td>Robert Wilson</td>
                                        <td>Transfer</td>
                                        <td>$2,000.00</td>
                                        <td>May 1, 2023</td>
                                        <td><span class="status-badge failed">Failed</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Animate widgets on load
        gsap.from('.admin-widget', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    // Navigation between sections
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${sectionId}-section`).classList.add('active');
            
            // Close mobile menu if open
            mobileMenu.style.right = '-100%';
            
            // Scroll to section
            document.getElementById(`${sectionId}-section`).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Generate sample accounts for main page
    const accountsGrid = document.querySelector('.accounts-grid');
    if (accountsGrid) {
        accountsGrid.innerHTML = `
            <div class="account-card">
                <div class="account-header">
                    <span class="account-type">Checking Account</span>
                    <i class="fas fa-university"></i>
                </div>
                <div class="account-balance">$8,245.67</div>
                <div class="account-number">•••• •••• •••• 3456</div>
                <div class="account-actions">
                    <button class="account-btn transfer-btn">Transfer</button>
                    <button class="account-btn details-btn">Details</button>
                </div>
            </div>
            <div class="account-card">
                <div class="account-header">
                    <span class="account-type">Savings Account</span>
                    <i class="fas fa-piggy-bank"></i>
                </div>
                <div class="account-balance">$12,456.89</div>
                <div class="account-number">•••• •••• •••• 7890</div>
                <div class="account-actions">
                    <button class="account-btn transfer-btn">Transfer</button>
                    <button class="account-btn details-btn">Details</button>
                </div>
            </div>
            <div class="account-card">
                <div class="account-header">
                    <span class="account-type">Investment Account</span>
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="account-balance">$3,866.34</div>
                <div class="account-number">•••• •••• •••• 1234</div>
                <div class="account-actions">
                    <button class="account-btn transfer-btn">Transfer</button>
                    <button class="account-btn details-btn">Details</button>
                </div>
            </div>
        `;
    }

    // Generate sample cards for main page
    const cardsCarousel = document.querySelector('.cards-carousel');
    if (cardsCarousel) {
        cardsCarousel.innerHTML = `
            <div class="card-item">
                <div class="card-top">
                    <span class="card-name">Platinum Card</span>
                    <div class="card-chip">
                        <i class="fas fa-microchip"></i>
                    </div>
                </div>
                <div class="card-number">
                    <span>•••• •••• •••• 4242</span>
                </div>
                <div class="card-bottom">
                    <div class="card-holder">
                        <span>Card Holder</span>
                        <p>JOHN DOE</p>
                    </div>
                    <div class="card-expiry">
                        <span>Expires</span>
                        <p>12/25</p>
                    </div>
                </div>
            </div>
            <div class="card-item gold">
                <div class="card-top">
                    <span class="card-name">Gold Card</span>
                    <div class="card-chip">
                        <i class="fas fa-microchip"></i>
                    </div>
                </div>
                <div class="card-number">
                    <span>•••• •••• •••• 5678</span>
                </div>
                <div class="card-bottom">
                    <div class="card-holder">
                        <span>Card Holder</span>
                        <p>JOHN DOE</p>
                    </div>
                    <div class="card-expiry">
                        <span>Expires</span>
                        <p>09/24</p>
                    </div>
                </div>
            </div>
            <div class="card-item black">
                <div class="card-top">
                    <span class="card-name">Black Card</span>
                    <div class="card-chip">
                        <i class="fas fa-microchip"></i>
                    </div>
                </div>
                <div class="card-number">
                    <span>•••• •••• •••• 9012</span>
                </div>
                <div class="card-bottom">
                    <div class="card-holder">
                        <span>Card Holder</span>
                        <p>JOHN DOE</p>
                    </div>
                    <div class="card-expiry">
                        <span>Expires</span>
                        <p>03/26</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate sample investments for main page
    const investmentDashboard = document.querySelector('.investment-dashboard');
    if (investmentDashboard) {
        investmentDashboard.innerHTML = `
            <div class="portfolio-summary">
                <div class="portfolio-header">
                    <div>
                        <h3>Investment Portfolio</h3>
                        <p>Total Value</p>
                    </div>
                    <div class="portfolio-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+5.2%</span>
                    </div>
                </div>
                <div class="portfolio-value">$24,568.90</div>
                <div class="portfolio-chart">
                    <div class="chart-placeholder">
                        <p>Investment Performance Chart</p>
                    </div>
                </div>
                <div class="portfolio-assets">
                    <div class="asset-card">
                        <div class="asset-header">
                            <div class="asset-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="asset-name">Stocks</div>
                        </div>
                        <div class="asset-value">$12,456.89</div>
                        <div class="asset-change positive">+3.2%</div>
                    </div>
                    <div class="asset-card">
                        <div class="asset-header">
                            <div class="asset-icon">
                                <i class="fas fa-coins"></i>
                            </div>
                            <div class="asset-name">Bonds</div>
                        </div>
                        <div class="asset-value">$5,678.34</div>
                        <div class="asset-change positive">+1.5%</div>
                    </div>
                    <div class="asset-card">
                        <div class="asset-header">
                            <div class="asset-icon">
                                <i class="fas fa-gem"></i>
                            </div>
                            <div class="asset-name">Commodities</div>
                        </div>
                        <div class="asset-value">$3,245.67</div>
                        <div class="asset-change negative">-0.8%</div>
                    </div>
                    <div class="asset-card">
                        <div class="asset-header">
                            <div class="asset-icon">
                                <i class="fab fa-bitcoin"></i>
                            </div>
                            <div class="asset-name">Crypto</div>
                        </div>
                        <div class="asset-value">$3,188.00</div>
                        <div class="asset-change positive">+7.3%</div>
                    </div>
                </div>
            </div>
            <div class="investment-sidebar">
                <div class="investment-news">
                    <div class="news-header">
                        <h3>Market News</h3>
                        <button class="btn small-btn">View All</button>
                    </div>
                    <div class="news-item">
                        <h4 class="news-title">Tech Stocks Rally After Earnings Reports</h4>
                        <p class="news-date">May 3, 2023</p>
                    </div>
                    <div class="news-item">
                        <h4 class="news-title">Federal Reserve Announces Rate Decision</h4>
                        <p class="news-date">May 2, 2023</p>
                    </div>
                    <div class="news-item">
                        <h4 class="news-title">Cryptocurrency Market Shows Volatility</h4>
                        <p class="news-date">May 1, 2023</p>
                    </div>
                </div>
                <div class="investment-actions">
                    <h3>Quick Actions</h3>
                    <button class="btn primary-btn action-btn">Buy Investments</button>
                    <button class="btn secondary-btn action-btn">Sell Investments</button>
                    <button class="btn secondary-btn action-btn">Transfer Funds</button>
                </div>
            </div>
        `;
    }

    // Generate sample loans for main page
    const loanOptions = document.querySelector('.loan-options');
    if (loanOptions) {
        loanOptions.innerHTML = `
            <div class="loan-card">
                <div class="loan-icon">
                    <i class="fas fa-home"></i>
                </div>
                <h3 class="loan-title">Mortgage Loan</h3>
                <div class="loan-rate">3.25%</div>
                <p class="loan-desc">Fixed rate mortgage with terms up to 30 years</p>
                <button class="btn primary-btn">Apply Now</button>
            </div>
            <div class="loan-card">
                <div class="loan-icon">
                    <i class="fas fa-car"></i>
                </div>
                <h3 class="loan-title">Auto Loan</h3>
                <div class="loan-rate">4.75%</div>
                <p class="loan-desc">Finance your new or used vehicle with competitive rates</p>
                <button class="btn primary-btn">Apply Now</button>
            </div>
            <div class="loan-card">
                <div class="loan-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h3 class="loan-title">Student Loan</h3>
                <div class="loan-rate">5.25%</div>
                <p class="loan-desc">Invest in your education with flexible repayment options</p>
                <button class="btn primary-btn">Apply Now</button>
            </div>
            <div class="loan-card">
                <div class="loan-icon">
                    <i class="fas fa-credit-card"></i>
                </div>
                <h3 class="loan-title">Personal Loan</h3>
                <div class="loan-rate">7.99%</div>
                <p class="loan-desc">Get funds for any purpose with quick approval</p>
                <button class="btn primary-btn">Apply Now</button>
            </div>
        `;
    }

    // Generate sample support options for main page
    const supportOptions = document.querySelector('.support-options');
    if (supportOptions) {
        supportOptions.innerHTML = `
            <div class="support-card">
                <div class="support-icon">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <h3 class="support-title">24/7 Customer Support</h3>
                <p class="support-desc">Our dedicated team is available round the clock to assist you with any queries.</p>
                <button class="btn primary-btn">Call Now</button>
            </div>
            <div class="support-card">
                <div class="support-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <h3 class="support-title">Live Chat</h3>
                <p class="support-desc">Chat instantly with our support agents for quick assistance.</p>
                <button class="btn primary-btn">Start Chat</button>
            </div>
            <div class="support-card">
                <div class="support-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3 class="support-title">Email Support</h3>
                <p class="support-desc">Send us an email and we'll get back to you within 24 hours.</p>
                <button class="btn primary-btn">Email Us</button>
            </div>
            <div class="support-card">
                <div class="support-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3 class="support-title">Branch Locator</h3>
                <p class="support-desc">Find our nearest branch for in-person assistance.</p>
                <button class="btn primary-btn">Find Branch</button>
            </div>
        `;
    }

    // Toast notification function
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <div class="toast-close">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        gsap.from(toast, {
            y: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            gsap.to(toast, {
                y: 50,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: function() {
                    toast.remove();
                }
            });
        }, 5000);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', function() {
            gsap.to(toast, {
                y: 50,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: function() {
                    toast.remove();
                }
            });
        });
    }

    // Add toast styles dynamically
    const toastStyles = document.createElement('style');
    toastStyles.innerHTML = `
        .toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            transform: translateY(50px);
            opacity: 0;
        }
        .toast.success {
            border-left: 4px solid var(--success-color);
        }
        .toast.error {
            border-left: 4px solid var(--danger-color);
        }
        .toast-icon {
            font-size: 1.5rem;
        }
        .toast.success .toast-icon {
            color: var(--success-color);
        }
        .toast.error .toast-icon {
            color: var(--danger-color);
        }
        .toast-message {
            font-weight: 500;
        }
        .toast-close {
            margin-left: 1rem;
            cursor: pointer;
            opacity: 0.7;
            transition: var(--transition);
        }
        .toast-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(toastStyles);

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Holographic card animation
    const holographicCard = document.querySelector('.holographic-card');
    if (holographicCard) {
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            holographicCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset card position when mouse leaves
        document.addEventListener('mouseleave', function() {
            holographicCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    // Animate sections on scroll
    const animateOnScroll = function() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            // Check if section is in view
            if (sectionBottom >= windowTop && sectionTop <= windowBottom) {
                gsap.to(section.querySelectorAll('.section-header h2, .section-header p'), {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                });

                gsap.to(section.querySelectorAll('.account-card, .card-item, .loan-card, .support-card'), {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.3
                });
            }
        });
    };

    // Set initial state for animations
    gsap.set(sections, { autoAlpha: 1 });
    gsap.set(sections.map(section => section.querySelectorAll('.section-header h2, .section-header p')), { y: 50, opacity: 0 });
    gsap.set(sections.map(section => section.querySelectorAll('.account-card, .card-item, .loan-card, .support-card')), { y: 50, opacity: 0 });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#005f73"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#005f73",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                preloader.style.display = 'none';
                // Show dashboard after preloader hides
                document.getElementById('customerDashboard').style.display = 'flex';
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.style.right = '0';
        });

        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.style.right = '-100%';
        });
    }

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashboardMain = document.querySelector('.dashboard-main');

    if (sidebarToggle && dashboardMain) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.dashboard-sidebar').classList.toggle('collapsed');
            dashboardMain.classList.toggle('expanded');
            sidebarToggle.classList.toggle('collapsed');
        });
    }

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Simulate logout
            window.location.href = 'index.html';
        });
    }

    // Transfer Form Functionality
    const transferForm = document.getElementById('transferForm');
    if (transferForm) {
        // Update summary when form changes
        const fromAccount = document.getElementById('fromAccount');
        const toAccount = document.getElementById('toAccount');
        const amount = document.getElementById('amount');
        const schedule = document.getElementById('schedule');
        const scheduleDetails = document.getElementById('scheduleDetails');

        // Update summary
        function updateSummary() {
            document.getElementById('summaryFrom').textContent = 
                fromAccount.options[fromAccount.selectedIndex].text.split(' - ')[0];
            document.getElementById('summaryTo').textContent = toAccount.value || '-';
            document.getElementById('summaryAmount').textContent = 
                amount.value ? '$' + parseFloat(amount.value).toFixed(2) : '-';
            document.getElementById('summaryTotal').textContent = 
                amount.value ? '$' + parseFloat(amount.value).toFixed(2) : '-';
        }

        // Show/hide schedule details
        schedule.addEventListener('change', function() {
            if (this.value === 'later' || this.value === 'recurring') {
                scheduleDetails.style.display = 'block';
            } else {
                scheduleDetails.style.display = 'none';
            }
        });

        // Update summary on input changes
        fromAccount.addEventListener('change', updateSummary);
        toAccount.addEventListener('input', updateSummary);
        amount.addEventListener('input', updateSummary);

        // Form submission
        transferForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate transfer processing
            const submitBtn = transferForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            setTimeout(function() {
                alert('Transfer completed successfully!');
                transferForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Continue';
                // Reset summary
                document.getElementById('summaryFrom').textContent = '-';
                document.getElementById('summaryTo').textContent = '-';
                document.getElementById('summaryAmount').textContent = '-';
                document.getElementById('summaryTotal').textContent = '-';
            }, 2000);
        });
    }

    // Settings Page Functionality
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordForm = document.getElementById('changePasswordForm');

    if (changePasswordBtn && changePasswordForm) {
        changePasswordBtn.addEventListener('click', function() {
            changePasswordForm.style.display = changePasswordForm.style.display === 'block' ? 'none' : 'block';
        });

        document.querySelector('.cancel-password-btn').addEventListener('click', function() {
            changePasswordForm.style.display = 'none';
        });
    }

    // Settings Menu Navigation
    const settingsMenuLinks = document.querySelectorAll('.settings-menu-link');
    settingsMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            document.querySelectorAll('.settings-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            document.getElementById(targetId + '-section').classList.add('active');
            
            // Update active menu item
            settingsMenuLinks.forEach(menuLink => {
                menuLink.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });

    // Transactions Filter Toggle
    const dateFilter = document.getElementById('dateFilter');
    const customDateRange = document.getElementById('customDateRange');

    if (dateFilter && customDateRange) {
        dateFilter.addEventListener('change', function() {
            customDateRange.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }

    // Initialize dashboard widgets animation
    const animateDashboardWidgets = function() {
        gsap.from('.widget', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    };

    // Run animations when dashboard is shown
    if (document.getElementById('customerDashboard')) {
        animateDashboardWidgets();
    }
});
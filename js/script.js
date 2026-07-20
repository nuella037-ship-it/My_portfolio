// ============================================
// THEME TOGGLE
// ============================================
const toggle = document.getElementById('themeToggle');
if (toggle) {
    let theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    toggle.innerHTML = `<i class="fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>`;
    toggle.addEventListener('click', () => {
        const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        toggle.innerHTML = `<i class="fas ${t === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>`;
    });
}

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ============================================
// BLOG DATA
// ============================================
const blogData = [
    {
        id: 1,
        title: 'City Council Approves New Park Renovation',
        excerpt: 'The local government has greenlit a $2M project to revamp downtown park facilities.',
        category: 'local',
        date: 'May 20, 2026',
        icon: 'fas fa-tree',
        tag: 'Local News'
    },
    {
        id: 2,
        title: 'Global Climate Summit Reaches Historic Agreement',
        excerpt: 'Nations pledge to cut carbon emissions by 50% by 2030 in a landmark deal.',
        category: 'international',
        date: 'May 18, 2026',
        icon: 'fas fa-globe-americas',
        tag: 'International'
    },
    {
        id: 3,
        title: 'AI Model Achieves Human-Level Performance in Coding',
        excerpt: 'A new language model surpasses average developer scores on competitive programming tasks.',
        category: 'tech',
        date: 'May 15, 2026',
        icon: 'fas fa-microchip',
        tag: 'Tech'
    },
    {
        id: 4,
        title: 'Breakthrough in Cancer Research Shows Promise',
        excerpt: 'A novel immunotherapy approach eliminates tumours in 80% of trial patients.',
        category: 'health',
        date: 'May 12, 2026',
        icon: 'fas fa-heartbeat',
        tag: 'Health'
    },
    {
        id: 5,
        title: 'Local Team Wins National Championship',
        excerpt: 'The city’s basketball team clinched the title in a thrilling overtime victory.',
        category: 'sports',
        date: 'May 10, 2026',
        icon: 'fas fa-trophy',
        tag: 'Sports'
    },
    {
        id: 6,
        title: 'New Trade Deal Signed Between Major Economies',
        excerpt: 'The agreement aims to reduce tariffs and boost global trade by 15%.',
        category: 'international',
        date: 'May 8, 2026',
        icon: 'fas fa-handshake',
        tag: 'International'
    },
    {
        id: 7,
        title: 'Local School Introduces Renewable Energy Curriculum',
        excerpt: 'Students will learn about solar and wind energy through hands-on projects.',
        category: 'local',
        date: 'May 5, 2026',
        icon: 'fas fa-school',
        tag: 'Local News'
    },
    {
        id: 8,
        title: 'New Study Links Sleep Quality to Heart Health',
        excerpt: 'Researchers find a strong correlation between deep sleep and reduced cardiovascular risk.',
        category: 'health',
        date: 'May 3, 2026',
        icon: 'fas fa-bed',
        tag: 'Health'
    },
];

// ============================================
// RENDER BLOG POSTS
// ============================================
function renderBlogPosts(container, posts, filter = 'all') {
    if (!container) return;
    container.innerHTML = '';
    const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter);
    filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <div class="thumb"><i class="${p.icon}"></i></div>
            <div class="body">
                <span class="tag">${p.tag}</span>
                <h3>${p.title}</h3>
                <p>${p.excerpt}</p>
                <div style="margin-top:12px;color:var(--text-muted);font-size:0.8rem;">
                    <i class="far fa-calendar-alt"></i> ${p.date}
                </div>
                <a href="#" style="display:inline-block;margin-top:12px;color:var(--primary);font-weight:600;">Read More →</a>
            </div>
        `;
        container.appendChild(div);
    });
}

// ============================================
// HOME PAGE – render first 4 posts
// ============================================
const homeGrid = document.getElementById('homeGrid');
if (homeGrid) {
    renderBlogPosts(homeGrid, blogData.slice(0, 4));
}

// ============================================
// BLOG PAGE – render all with filters
// ============================================
const blogGrid = document.getElementById('blogGrid');
if (blogGrid) {
    renderBlogPosts(blogGrid, blogData, 'all');

    const filters = document.getElementById('blogFilters');
    if (filters) {
        filters.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            const filter = link.dataset.filter;
            if (!filter) return;
            filters.querySelectorAll('a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            renderBlogPosts(blogGrid, blogData, filter);
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim();
        const email = document.getElementById('contactEmail')?.value.trim();
        const message = document.getElementById('contactMessage')?.value.trim();
        const feedback = document.getElementById('contactFeedback');

        if (!name || !email || !message) {
            feedback.textContent = 'Please fill in all required fields.';
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
            return;
        }

        feedback.textContent = 'Sending message...';
        feedback.className = 'form-feedback';
        feedback.style.display = 'block';

        setTimeout(() => {
            feedback.textContent = '✅ Message sent successfully! We\'ll get back to you soon.';
            feedback.className = 'form-feedback success';
            contactForm.reset();
            setTimeout(() => { feedback.style.display = 'none'; }, 5000);
        }, 1200);
    });
}

console.log('✅ The Raptor loaded successfully!');

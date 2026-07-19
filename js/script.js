// ===== DATA =====
        const skillsData = [
            { name: 'HTML5', icon: 'fab fa-html5', level: 95 },
            { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90 },
            { name: 'JavaScript', icon: 'fab fa-js', level: 88 },
            { name: 'React', icon: 'fab fa-react', level: 82 },
            { name: 'Vue.js', icon: 'fab fa-vuejs', level: 75 },
            { name: 'Node.js', icon: 'fab fa-node-js', level: 80 },
            { name: 'Python', icon: 'fab fa-python', level: 78 },
            { name: 'PHP', icon: 'fab fa-php', level: 72 },
            { name: 'Git', icon: 'fab fa-git-alt', level: 85 },
            { name: 'Figma', icon: 'fab fa-figma', level: 70 },
            { name: 'AWS', icon: 'fab fa-aws', level: 65 },
            { name: 'Docker', icon: 'fab fa-docker', level: 60 },
        ];

        const projectsData = [
            { id: 1, title: 'E-Commerce Platform', desc: 'Full-featured online store with payment integration.', category: 'web', icon: 'fas fa-shopping-cart', tag: 'Web App' },
            { id: 2, title: 'AI Chat Assistant', desc: 'Intelligent chatbot powered by NLP.', category: 'ai', icon: 'fas fa-robot', tag: 'AI/ML' },
            { id: 3, title: 'Fitness Tracker Mobile App', desc: 'Cross-platform app for tracking workouts.', category: 'mobile', icon: 'fas fa-heartbeat', tag: 'Mobile' },
            { id: 4, title: 'Brand Identity Suite', desc: 'Complete branding package including logo.', category: 'design', icon: 'fas fa-paint-brush', tag: 'Design' },
            { id: 5, title: 'Real Estate Dashboard', desc: 'Interactive dashboard for property management.', category: 'web', icon: 'fas fa-building', tag: 'Web App' },
            { id: 6, title: 'Smart Home IoT Hub', desc: 'Centralized control system for smart devices.', category: 'ai', icon: 'fas fa-microchip', tag: 'AI/ML' },
        ];

        const testimonialsData = [
            { name: 'Sarah Johnson', role: 'CEO, TechStart Inc.', text: 'John delivers high-quality work on time.', initials: 'SJ' },
            { name: 'Michael Chen', role: 'Product Manager, CloudWare', text: 'Working with John was a game-changer.', initials: 'MC' },
            { name: 'Emily Rodriguez', role: 'Founder, DesignLab', text: 'John has a rare combination of design sensibility and technical prowess.', initials: 'ER' },
        ];

        // ===== THEME TOGGLE =====
        (function theme() {
            const toggle = document.getElementById('themeToggle');
            let theme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            toggle.innerHTML = `<i class="fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>`;
            toggle.addEventListener('click', () => {
                const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', t);
                localStorage.setItem('theme', t);
                toggle.innerHTML = `<i class="fas ${t === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>`;
            });
        })();

        // ===== TYPING EFFECT =====
        (function typing() {
            const el = document.getElementById('typedText');
            if (!el) return;
            const roles = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Thinker', 'Tech Innovator'];
            let i = 0, j = 0, deleting = false;

            function type() {
                const current = roles[i];
                if (!deleting) {
                    el.textContent = current.slice(0, j + 1);
                    j++;
                    if (j === current.length) { deleting = true; setTimeout(type, 2400); return; }
                    setTimeout(type, 80);
                } else {
                    el.textContent = current.slice(0, j);
                    j--;
                    if (j < 0) { deleting = false; i = (i + 1) % roles.length; setTimeout(type, 400); return; }
                    setTimeout(type, 50);
                }
            }
            type();
        })();

        // ===== RENDER SKILLS =====
        (function renderSkills() {
            const grid = document.getElementById('skillsGrid');
            if (!grid) return;
            skillsData.forEach(s => {
                const div = document.createElement('div');
                div.className = 'skill-item';
                div.innerHTML = `
                    <span class="icon"><i class="${s.icon}"></i></span>
                    <div class="name">${s.name}</div>
                    <div class="level"><div class="bar" data-width="${s.level}"></div></div>
                `;
                grid.appendChild(div);
            });
            // animate bars
            const bars = document.querySelectorAll('.skill-item .bar');
            const anim = () => {
                bars.forEach(bar => {
                    const rect = bar.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 60) {
                        bar.style.width = bar.dataset.width + '%';
                    }
                });
            };
            window.addEventListener('scroll', anim);
            setTimeout(anim, 400);
        })();

        // ===== RENDER PROJECTS =====
        function renderProjects(container, projects, filter = 'all') {
            if (!container) return;
            container.innerHTML = '';
            const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
            filtered.forEach(p => {
                const div = document.createElement('div');
                div.className = 'project-card';
                div.innerHTML = `
                    <div class="thumb"><i class="${p.icon}"></i></div>
                    <div class="body">
                        <span class="tag">${p.tag}</span>
                        <h3>${p.title}</h3>
                        <p>${p.desc}</p>
                    </div>
                `;
                container.appendChild(div);
            });
        }

        (function initProjects() {
            const featured = document.getElementById('featuredGrid');
            if (featured) renderProjects(featured, projectsData.slice(0, 3));

            const full = document.getElementById('projectsGrid');
            if (full) {
                renderProjects(full, projectsData, 'all');
                const filters = document.getElementById('projectFilters');
                if (filters) {
                    filters.addEventListener('click', (e) => {
                        const btn = e.target.closest('.filter-btn');
                        if (!btn) return;
                        filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        renderProjects(full, projectsData, btn.dataset.filter);
                    });
                }
            }
        })();

        // ===== RENDER TESTIMONIALS =====
        (function renderTestimonials() {
            const grid = document.getElementById('testimonialsGrid');
            if (!grid) return;
            testimonialsData.forEach(t => {
                const div = document.createElement('div');
                div.className = 'testimonial-card';
                div.innerHTML = `
                    <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <blockquote>"${t.text}"</blockquote>
                    <div class="author">
                        <div class="avatar-sm">${t.initials}</div>
                        <div class="info">
                            <div class="name">${t.name}</div>
                            <div class="role">${t.role}</div>
                        </div>
                    </div>
                `;
                grid.appendChild(div);
            });
        })();

        // ===== CONTACT FORM =====
        (function contactForm() {
            const form = document.getElementById('contactForm');
            if (!form) return;
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('contactName').value.trim();
                const email = document.getElementById('contactEmail').value.trim();
                const message = document.getElementById('contactMessage').value.trim();
                const feedback = document.getElementById('contactFeedback');
                if (!name || !email || !message) {
                    feedback.textContent = 'Please fill in all required fields.';
                    feedback.className = 'form-feedback error';
                    feedback.style.display = 'block';
                    return;
                }
                feedback.textContent = 'Sending...';
                feedback.className = 'form-feedback';
                feedback.style.display = 'block';
                setTimeout(() => {
                    feedback.textContent = '✅ Message sent successfully!';
                    feedback.className = 'form-feedback success';
                    form.reset();
                    setTimeout(() => { feedback.style.display = 'none'; }, 5000);
                }, 1200);
            });
        })();

        // ===== PAGE NAVIGATION =====
        (function navigation() {
            const links = document.querySelectorAll('.nav-link, [data-page]');
            const sections = {
                home: document.getElementById('page-home'),
                about: document.getElementById('page-about'),
                projects: document.getElementById('page-projects'),
                contact: document.getElementById('page-contact'),
            };

            function showPage(page) {
                Object.keys(sections).forEach(key => {
                    sections[key].classList.toggle('active', key === page);
                });
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.dataset.page === page);
                });
                // close mobile menu
                document.getElementById('navLinks').classList.remove('open');
                document.getElementById('hamburger').classList.remove('active');
            }

            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const page = link.dataset.page;
                    if (page && sections[page]) {
                        e.preventDefault();
                        showPage(page);
                    }
                });
            });

            // Set default
            showPage('home');
        })();

        // ===== HAMBURGER =====
        (function hamburger() {
            const btn = document.getElementById('hamburger');
            const nav = document.getElementById('navLinks');
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                nav.classList.toggle('open');
            });
        })();

        console.log('✅ Single-file portfolio loaded successfully!');

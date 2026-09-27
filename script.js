const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');
const form = document.getElementById('registerForm');
const formStatus = document.querySelector('.form-status');
const socialLinks = {
  instagram: 'https://www.instagram.com/brightmindsofcalgary/',
  facebook: 'https://www.facebook.com/profile.php?id=61594931276536&sk=about',
};

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Use the official BrightMinds logo consistently in the header and footer.
document.querySelectorAll('.brand').forEach((brand) => {
  brand.innerHTML = `
    <img class="brand-logo" src="assets/logo.svg" alt="BrightMinds Studio logo" />
    <span class="brand-text">
      <strong>BrightMinds</strong>
      <small>Studio</small>
    </span>
  `;
});

// Add social links to the main navigation and footer without duplicating them.
if (siteNav && !siteNav.querySelector('.social-nav-links')) {
  const socialNav = document.createElement('span');
  socialNav.className = 'social-nav-links';
  socialNav.innerHTML = `
    <a href="${socialLinks.instagram}" target="_blank" rel="noopener noreferrer" aria-label="BrightMinds Studio on Instagram">Instagram</a>
    <a href="${socialLinks.facebook}" target="_blank" rel="noopener noreferrer" aria-label="BrightMinds Studio on Facebook">Facebook</a>
  `;
  siteNav.appendChild(socialNav);
}

const footerWrap = document.querySelector('.footer-wrap');
if (footerWrap && !footerWrap.querySelector('.social-links')) {
  const socialFooter = document.createElement('div');
  socialFooter.className = 'social-links';
  socialFooter.innerHTML = `
    <strong>Follow along</strong>
    <a href="${socialLinks.instagram}" target="_blank" rel="noopener noreferrer" aria-label="BrightMinds Studio on Instagram">Instagram</a>
    <a href="${socialLinks.facebook}" target="_blank" rel="noopener noreferrer" aria-label="BrightMinds Studio on Facebook">Facebook</a>
  `;
  footerWrap.appendChild(socialFooter);
}

// Add styling for the logo and social links while keeping the existing stylesheet intact.
const brandStyle = document.createElement('style');
brandStyle.textContent = `
  .brand-logo {
    width: 58px;
    height: 58px;
    object-fit: contain;
    flex: 0 0 auto;
  }

  .footer-brand .brand-logo {
    width: 70px;
    height: 70px;
  }

  .social-nav-links,
  .social-links {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
  }

  .social-nav-links {
    margin-left: 0.25rem;
    padding-left: 1rem;
    border-left: 1px solid rgba(31, 42, 68, 0.14);
    font-size: 0.82rem;
  }

  .social-links {
    display: grid;
    justify-items: start;
    gap: 0.45rem;
  }

  .social-links strong {
    color: #fff;
  }

  .social-links a,
  .social-nav-links a {
    font-weight: 800;
  }

  .social-links a:hover,
  .social-links a:focus-visible,
  .social-nav-links a:hover,
  .social-nav-links a:focus-visible {
    color: #ffd65a;
  }

  @media (max-width: 900px) {
    .social-nav-links {
      width: 100%;
      margin: 0.25rem 0 0;
      padding: 0.8rem 0 0;
      border-left: 0;
      border-top: 1px solid rgba(31, 42, 68, 0.14);
    }
  }

  @media (max-width: 640px) {
    .brand-logo,
    .footer-brand .brand-logo {
      width: 52px;
      height: 52px;
    }
  }
`;
document.head.appendChild(brandStyle);

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name') || 'Parent';
    const email = formData.get('email');
    const age = formData.get('age');
    const classType = formData.get('classType');
    const message = formData.get('message');

    // Show processing message
    formStatus.textContent = 'Sending your interest...';
    formStatus.style.color = '#56afd9';

    // Prepare data for FormSubmit
    const submitData = new FormData();
    submitData.append('name', name);
    submitData.append('email', email);
    submitData.append('age', age);
    submitData.append('classType', classType);
    submitData.append('message', message);
    submitData.append('_captcha', 'false');
    submitData.append('_next', window.location.href);

    // Submit to FormSubmit.co
    fetch('https://formsubmit.co/brightmindsofcalgary@gmail.com', {
      method: 'POST',
      body: submitData,
    })
      .then((response) => {
        if (response.ok) {
          formStatus.textContent = `Thanks, ${name}! Your interest has been received. We'll be in touch soon.`;
          formStatus.style.color = '#56afd9';
          form.reset();
        } else {
          formStatus.textContent = 'Error sending form. Please try again or email us directly.';
          formStatus.style.color = '#ff7ea8';
        }
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        formStatus.textContent = 'Error sending form. Please email us at brightmindsofcalgary@gmail.com';
        formStatus.style.color = '#ff7ea8';
      });
  });
}

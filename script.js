const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');
const form = document.getElementById('registerForm');
const formStatus = document.querySelector('.form-status');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

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
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name') || 'Parent';
    const email = formData.get('email');
    const age = formData.get('age');
    const classType = formData.get('classType');
    const message = formData.get('message');

    try {
      // Send to FormSubmit.co (free service, no backend needed)
      const response = await fetch('https://formsubmit.co/brighmindsofcalgary@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          age,
          classType,
          message,
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        formStatus.textContent = `Thanks, ${name}! Your interest has been received. We'll be in touch soon.`;
        formStatus.style.color = '#56afd9';
        form.reset();
      } else {
        formStatus.textContent = 'Error sending form. Please try again or email us directly.';
        formStatus.style.color = '#ff7ea8';
      }
    } catch (error) {
      formStatus.textContent = 'Error sending form. Please email us at brighmindsofcalgary@gmail.com';
      formStatus.style.color = '#ff7ea8';
    }
  });
}

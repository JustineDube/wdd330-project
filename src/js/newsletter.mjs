// newsletter.mjs — Newsletter sign-up feature
// Stores subscriber emails in localStorage under 'so-newsletter'.

export function initNewsletterSignup() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('#newsletter-email');
        const email = emailInput ? emailInput.value.trim() : '';
        if (!email) return;

        const subscribers = JSON.parse(localStorage.getItem('so-newsletter') || '[]');
        if (subscribers.includes(email)) {
            showNewsletterMessage(form, 'You\'re already signed up — thanks!', false);
        } else {
            subscribers.push(email);
            localStorage.setItem('so-newsletter', JSON.stringify(subscribers));
            showNewsletterMessage(form, '🎉 You\'re signed up! Check your inbox for deals.', true);
            emailInput.value = '';
        }
    });
}

function showNewsletterMessage(form, message, success) {
    let msg = form.querySelector('.newsletter-feedback');
    if (!msg) {
        msg = document.createElement('p');
        msg.classList.add('newsletter-feedback');
        form.appendChild(msg);
    }
    msg.textContent = message;
    msg.style.color = success ? '#525b0f' : '#c0392b';
    msg.style.fontWeight = 'bold';
    msg.style.padding = '0.5rem 0 0';
}

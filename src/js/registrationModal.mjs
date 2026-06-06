// registrationModal.mjs — First-visit registration modal / CTA
// Shows a modal to first-time visitors encouraging them to register
// for a giveaway. Dismissed state persisted in localStorage.

const MODAL_KEY = 'so-registration-seen';

export function initRegistrationModal() {
    // Only show once per browser
    if (localStorage.getItem(MODAL_KEY)) return;

    // Build modal
    const overlay = document.createElement('div');
    overlay.id = 'reg-modal-overlay';
    overlay.innerHTML = `
    <div class="reg-modal" role="dialog" aria-modal="true" aria-labelledby="reg-modal-title">
      <button class="reg-modal__close" aria-label="Close">&times;</button>
      <div class="reg-modal__icon">🏕️</div>
      <h2 id="reg-modal-title">Welcome to Sleep<span class="highlight">Outside</span>!</h2>
      <p class="reg-modal__lead">Register today for a chance to <strong>WIN a $500 gear bundle</strong> — including a tent, sleeping bag, and backpack!</p>
      <ul class="reg-modal__perks">
        <li>✅ Exclusive member-only discounts</li>
        <li>✅ Early access to new arrivals</li>
        <li>✅ Monthly giveaway entry — this month's prize: $500 gear bundle</li>
      </ul>
      <form id="reg-modal-form" novalidate>
        <input type="text"  id="reg-name"  placeholder="Your name"  required autocomplete="name" />
        <input type="email" id="reg-email" placeholder="Email address" required autocomplete="email" />
        <button type="submit" class="reg-modal__submit">Register &amp; Enter Giveaway</button>
      </form>
      <button class="reg-modal__skip">No thanks, I'll skip the giveaway</button>
    </div>`;
    document.body.appendChild(overlay);

    // Dismiss helpers
    const dismiss = () => {
        localStorage.setItem(MODAL_KEY, '1');
        overlay.classList.add('reg-modal--hidden');
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('.reg-modal__close').addEventListener('click', dismiss);
    overlay.querySelector('.reg-modal__skip').addEventListener('click', dismiss);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) dismiss();
    });

    // Form submit
    overlay.querySelector('#reg-modal-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        if (!name || !email) return;

        // Save registration (localStorage stand-in for a real API)
        const registrations = JSON.parse(localStorage.getItem('so-registrations') || '[]');
        registrations.push({ name, email, date: new Date().toISOString() });
        localStorage.setItem('so-registrations', JSON.stringify(registrations));

        // Show thank-you state
        const modal = overlay.querySelector('.reg-modal');
        modal.innerHTML = `
      <div class="reg-modal__icon">🎉</div>
      <h2>You're entered!</h2>
      <p>Thanks <strong>${name}</strong> — you're now in the running for our <strong>$500 gear bundle</strong>. We'll email you at <em>${email}</em> if you win.</p>
      <p>Happy exploring!</p>
      <button class="reg-modal__done">Start Shopping</button>`;
        modal.querySelector('.reg-modal__done').addEventListener('click', dismiss);
    });

    // Small delay so it doesn't fire before the page paints
    setTimeout(() => overlay.classList.add('reg-modal--visible'), 600);
}

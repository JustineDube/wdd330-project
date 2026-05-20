// Alert.js
export default class Alert {
    async init() {
        try {
            const response = await fetch('/json/alerts.json');
            if (!response.ok) return;
            const alerts = await response.json();
            if (!alerts || alerts.length === 0) return;

            // Build the alert section
            const section = document.createElement('section');
            section.classList.add('alert-list');

            alerts.forEach((alert) => {
                const p = document.createElement('p');
                p.textContent = alert.message;
                p.style.backgroundColor = alert.background;
                p.style.color = alert.color;
                section.appendChild(p);
            });

            // Prepend to <main>
            const main = document.querySelector('main');
            main.prepend(section);
        } catch (err) {
            // Silently fail if alerts.json is missing or malformed
            console.warn('Alert: could not load alerts.json', err);
        }
    }
}
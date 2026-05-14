const form = document.getElementById('predictionForm');
const predictBtn = document.getElementById('predictBtn');
const resultSection = document.getElementById('resultSection');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        predictBtn.disabled = true;
        predictBtn.classList.add('loading');
        predictBtn.querySelector('.button-text').textContent = 'Predicting...';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'text/html',
                },
            });

            if (!response.ok) {
                throw new Error('Unable to submit form. Please try again.');
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newResultSection = doc.getElementById('resultSection');

            if (newResultSection && resultSection) {
                resultSection.className = newResultSection.className;
                resultSection.innerHTML = newResultSection.innerHTML;
                scrollToResult();
            } else {
                console.warn('Result section not found in response.');
            }
        } catch (error) {
            if (resultSection) {
                resultSection.className = 'result-panel error';
                resultSection.innerHTML = `
                    <div class="result-card" id="resultCard">
                        <div class="result-badge">⚠</div>
                        <div>
                            <p class="result-label">Prediction Error</p>
                            <h3>Unable to get result</h3>
                            <p class="result-message">${error.message}</p>
                        </div>
                    </div>
                `;
                scrollToResult();
            }
        } finally {
            predictBtn.disabled = false;
            predictBtn.classList.remove('loading');
            predictBtn.querySelector('.button-text').textContent = 'Predict Rainfall';
        }
    });
}

function scrollToResult() {
    const target = document.getElementById('resultSection');
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

window.addEventListener('load', () => {
    const hasResult = resultSection && !resultSection.classList.contains('empty');
    if (hasResult) {
        setTimeout(scrollToResult, 140);
    }
});

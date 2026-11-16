(function () {
  var THANKS = 'https://www.blackhillsspeechsolutions.com/contact/thank-you/';
  var FALLBACK = 'Sorry, something went wrong. Please try again or call (605) 549-5552.';

  document.querySelectorAll('form.form[action*="formspree.io"]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      var status = form.querySelector('.form-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'form-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        form.appendChild(status);
      }

      if (button) button.disabled = true;
      status.textContent = 'Sending…';

      fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          window.location.assign(THANKS);
          return;
        }
        if (response.status === 429) {
          throw new Error('Please wait a moment and try again.');
        }
        return response.json().then(function (data) {
          var message = FALLBACK;
          if (data && Array.isArray(data.errors)) {
            message = data.errors.map(function (err) { return err.message; }).join(' ');
          }
          throw new Error(message);
        }, function () {
          throw new Error(FALLBACK);
        });
      }).catch(function (err) {
        status.textContent = (err && err.message) ? err.message : FALLBACK;
        if (button) button.disabled = false;
      });
    });
  });
})();

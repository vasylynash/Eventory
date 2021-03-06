const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#login-typeEmail').value.trim();
  const password = document.querySelector('#login-typePassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      let loginFailed = document.querySelector('#login-failed');
      loginFailed.className = 'fail';
    }
  }
  else {
    let loginFailed = document.querySelector('#login-failed');
      loginFailed.className = 'fail';
      loginFailed.textContent = 'Please fill out the form';
  }
};

document
  .querySelector('#login-modal-login-btn')
  .addEventListener('click', loginFormHandler);

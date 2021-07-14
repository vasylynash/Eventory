const signupForm = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#registerEmail').value.trim();
  const username = document.querySelector('#regUsername').value.trim();
  const password = document.querySelector('#registerPassword').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  if (email && password && username) {
    if (password === confirmPassword) {
      if (password.length >= 8) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.querySelector('#registerEmail').value = '';
          document.querySelector('#regUsername').value = '';
          document.querySelector('#registerPassword').value = '';
          document.location.replace('/');
        } else {
          let regFailed = document.querySelector('#register-failed');
          regFailed.className = 'fail'
          
        }
      } else {
        let regFailed = document.querySelector('#register-failed');
        regFailed.className = 'fail'
        regFailed.textContent = 'Passwords must be 8 characters or more.';
        document.querySelector('#registerPassword').value = '';
        document.querySelector('#confirmPassword').value = '';
      }
    } else {
      let regFailed = document.querySelector('#register-failed');
      regFailed.className = 'fail'
      regFailed.textContent = 'Passwords do not match.';
      document.querySelector('#registerPassword').value = '';
      document.querySelector('#confirmPassword').value = '';
    }
  } else {
    let regFailed = document.querySelector('#register-failed');
    regFailed.className = 'fail'
    regFailed.textContent = 'Please fill in all the fields.';
  }
};

document
  .querySelector('#register-Modal')
  .addEventListener('submit', signupForm);

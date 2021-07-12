const signupForm = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#typeEmail').value.trim(); // modal input for email must have id email
  const username = document.querySelector('#typeUsername').value.trim(); // modal input for username must have id username
  const password = document.querySelector('#typePassword').value.trim(); // modal input for password must have id password

  if (email && password && username) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      let regFailed = document.querySelector('#register-failed');
      regFailed.className = 'fail'
    }
  } else alert('Please fill the form');
};

document.querySelector('#signup-form').addEventListener('submit', signupForm);

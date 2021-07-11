const signupForm = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#registerEmail').value.trim();
  const username = document.querySelector('#regUsername').value.trim();
  const password = document.querySelector('#registerPassword').value.trim();
  if (email && password && username) {
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
      alert('Failed to sign up!');
    }
  } else alert('Please fill the form');
};

document
  .querySelector('#register-Modal')
  .addEventListener('submit', signupForm);

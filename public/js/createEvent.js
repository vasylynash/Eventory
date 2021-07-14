const createEvent = async (event) => {
  event.preventDefault();
  const eventDateTime =
    document.querySelector('#event-date').value.trim() +
    ' ' +
    document.querySelector('#event-time').value.trim();
  const eventTitle = document.querySelector('#event-title').value.trim();
  const eventAddress = document.querySelector('#event-address').value.trim();
  const eventCategory = document.querySelector('#dropdown-input-create').value;

  const eventDescription = document
    .querySelector('#event-description')
    .value.trim();
  if (
    eventDateTime &&
    eventTitle &&
    eventAddress &&
    eventCategory &&
    eventDescription
  ) {
    const response = await fetch('/api/events/', {
      method: 'POST',
      body: JSON.stringify({
        eventTitle,
        eventDescription,
        eventAddress,
        eventCategory,
        eventDateTime,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      let createFailed = document.querySelector('#create-failed');
      createFailed.className = 'fail';
      createFailed.textContent = 'Failed to create event';
    }
  } else {
    let createFailed = document.querySelector('#create-failed');
    createFailed.className = 'fail';
    createFailed.textContent = 'Please fill out all fields.';
  }
};

document
  .querySelector('#modal-create-event-btn')
  .addEventListener('click', createEvent);

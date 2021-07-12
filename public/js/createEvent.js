const createEvent = async (event) => {
  event.preventDefault();
  const eventDateTime =
    document.querySelector('#event-date').value.trim() +
    ' ' +
    document.querySelector('#event-time').value.trim();
  const eventTitle = document.querySelector('#event-title').value.trim(); //edit ids
  const eventAddress = document.querySelector('#event-address').value.trim();
  const eventCategory = document.querySelector('#event-category').value.trim();
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
      document.location.replace('/');
    } else {
      alert('Failed to create event');
    }
  }
};

document
  .querySelector('#modal-create-event-btn')
  .addEventListener('click', createEvent);

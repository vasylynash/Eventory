const createEvent = async (event) => {
  event.preventDefault();
  const eventDateTime =
    document.querySelector('#form4').value.trim() +
    ' ' +
    document.querySelector('#form5').value.trim();
  const eventTitle = document.querySelector('#form6').value.trim();
  const eventAddress = document.querySelector('#form7').value.trim();
  const eventCategory = document.querySelector('#form8').value.trim();
  const eventDescription = document.querySelector('#form9').value.trim();
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

const allEditBtns = document.querySelectorAll('.edit-post-btn');

const editEvent = async (event) => {
  event.preventDefault();
  const eventid = event.target.getAttribute('data-value');
  const eventDateTime =
    document.querySelector(`#edit-date-${eventid}`).value.trim() +
    ' ' +
    document.querySelector(`#edit-time-${eventid}`).value.trim();
  const eventTitle = document
    .querySelector(`#edit-title-${eventid}`)
    .value.trim();
  const eventAddress = document
    .querySelector(`#edit-title-${eventid}`)
    .value.trim();
  const eventCategory = document.querySelector('#edit-dropdown-input').value;

  console.log(eventCategory)
  const eventDescription = document
    .querySelector(`#edit-description-${eventid}`)
    .value.trim();
  if (
    eventDateTime &&
    eventTitle &&
    eventAddress &&
    eventCategory &&
    eventDescription
  ) {
    const response = await fetch(`/api/events/${eventid}`, {
      method: 'PUT',
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
   //  document.location.replace('/dashboard');
    } else {
      alert('Failed to edit event');
    }
  }
};


allEditBtns.forEach(function (editBtn) {
    editBtn.addEventListener('click', editEvent);
  });



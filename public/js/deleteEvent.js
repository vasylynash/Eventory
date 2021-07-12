const deleteEvent = async (event) => {
  event.preventDefault();

  console.log(hbs.eventid);
  const response = await fetch(`/api/events/${eventid}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to delete event');
  }
};

document.querySelector('#delete-post').addEventListener('click', deleteEvent);

const deleteEvent = async (event) => {
  event.preventDefault();
  const cardid = document.querySelector('#card-id-holder').innerHTML;
  console.log(cardid);
  const response = await fetch(`/api/events/${cardid}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to delete event');
  }
};

document.querySelector('#delete-post').addEventListener('click', deleteEvent);

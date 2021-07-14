const allRemoveBtns = document.querySelectorAll('.remove-my-card');

const deleteEvent = async (event) => {
  event.preventDefault();
  cardid = event.target.getAttribute('data-value');
  console.log(cardid);
  const response = await fetch(`/api/events/${cardid}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    console.log('Failed to delete event');
  }
};

allRemoveBtns.forEach(function (removeBtn) {
  removeBtn.addEventListener('click', deleteEvent);
});

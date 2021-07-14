const allRemoveEventBtns = document.querySelectorAll('.remove-my-event');


const removeMyEvent = async (event) => {
  event.preventDefault();
  const userId = event.target.getAttribute('data-user');
  eventid = event.target.getAttribute('data-value');
  console.log(eventid);
  console.log(userId);

  const response = await fetch(`/api/events/unjoin/${eventid}`, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to remove event');
  }
};

allRemoveEventBtns.forEach(function (removeEventBtn) {
    removeEventBtn.addEventListener('click', removeMyEvent);
});

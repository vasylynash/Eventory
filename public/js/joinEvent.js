const allJoinBtns = document.querySelectorAll('.join-event-btn');

const joinEvent = async (event) => {
    event.preventDefault();
    const currentuserid = event.target.getAttribute('data-currentuserid');
    const eventid = event.target.getAttribute('data-eventid');
    console.log(currentuserid,eventid)
      const response = await fetch(`/api/events/join`, {
        method: 'POST',
        body: JSON.stringify({
            eventid,
            currentuserid
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to join event');
      }
  };
  
  allJoinBtns.forEach(function (joinBtn) {
    joinBtn.addEventListener('click', joinEvent);
  });



  


const allJoinBtns = document.querySelectorAll('.join-event-btn');

const joinEvent = async (event) => {
    event.preventDefault();
    const currentuserid = event.target.getAttribute('data-currentuserid');
    const eventid = event.target.getAttribute('data-eventid');
      const response = await fetch(`/api/events/join`, {
        method: 'POST',
        body: JSON.stringify({
            eventid,
            currentuserid
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const userData = await response.json();

      if (response.ok) {
          if (!userData.userExists === true){
            document.location.replace('/');
          } else {
              event.target.innerHTML = 'Joined'
            }
        }
      else {
        console.log('Failed to join event');
      }
  };
  
  allJoinBtns.forEach(function (joinBtn) {
    joinBtn.addEventListener('click', joinEvent);
  });



  
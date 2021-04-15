const timer = document.querySelector('.timer');

axios
  .get('/time?id=' + timer.id)
  .then((res) => {
    const expireDate = res.data.expireDate;

    const x = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = expireDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      timer.innerText =
        days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        timer.innerText = 'EXPIRED';
      }
    }, 1000);
    // Update the count down every 1 second
  })
  .catch((e) => {
    caonsole.log(e);
  });

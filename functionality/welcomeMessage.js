const welcomeMessage = () => {
  currentDate = new Date();
  currentHour = currentDate.getHours();
  let message;
    if (currentHour >= 5 && currentHour < 12) {
        message = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 19) {
        message = 'Good evening';
    } else {
        message = 'Good night';
    }
    return message;
}

export default welcomeMessage
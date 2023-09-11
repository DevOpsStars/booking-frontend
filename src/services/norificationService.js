const NotificationService = {
  
    getNotificationsByReceiverId: (receiverId, setState) => {
      fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/notifications/" + receiverId)
        .then((response) => response.json())
        .then((responseJson) => {
          setState(responseJson)
        })
        .catch((error) => {console.log(error.message)});
    },

  }
  export default NotificationService;
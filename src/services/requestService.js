const BookingService = {
    
  getRequests: (setState) => {
    fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/requests")
      .then((response) => response.json())
      .then((responseJson) => {
        setState(responseJson);
      })
      .catch((error) => alert(error.message));
  },

  getCancelCount: (id, setState) => {
    fetch(
      process.env.REACT_APP_BOOKING_SERVICE_PATH +
        "/api/reservations/" +
        id +
        "/cancel-count"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setState(responseJson);
      })
      .catch((error) => alert(error.message));
  },

  newRequest: (requestOptions) => {
    fetch(
      process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/requests/send-request",
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJson) => {
        alert("from service method: " + JSON.stringify(responseJson));
      })
      .catch((error) => alert(error.message));
  },

  accept: (id) => {
    fetch(
      process.env.REACT_APP_BOOKING_SERVICE_PATH +
        "/api/requests/" +
        id +
        "/accept"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson: ", responseJson);
      })
      .catch((error) => alert(error.message));
  },

  decline: (id) => {
    fetch(
      process.env.REACT_APP_BOOKING_SERVICE_PATH +
        "/api/requests/" +
        id +
        "/decline"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson: ", responseJson);
      })
      .catch((error) => alert(error.message));
  },

  cancel: (id) => {
    fetch(
      process.env.REACT_APP_BOOKING_SERVICE_PATH +
      "/api/reservations/" +
      id +
      "/cancel"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson: ", responseJson);
      })
      .catch((error) => alert(error.message));
  },

  getBookings: (id, setBookings) => {
    fetch(
        process.env.REACT_APP_BOOKING_SERVICE_PATH +
        "/api/reservations/" +
        id + "/all-reservations"
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("responseJson: ", responseJson);
          setBookings(responseJson);
        })
        .catch((error) => alert(error.message));
  },
};

export default BookingService;

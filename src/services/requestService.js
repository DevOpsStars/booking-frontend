const BookingService = {
    
  getRequests: (setState) => {
    fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/requests")
      .then((response) => response.json())
      .then((responseJson) => {
        setState(responseJson);
      })
      .catch((error) => {console.log(error.message)});
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
      .catch((error) => {console.log(error.message)});
  },

  newRequest: (requestOptions) => {
    fetch(
      process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/requests/send-request/1",
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJson) => {
        alert("from service method: " + JSON.stringify(responseJson));
      })
      .catch((error) => {console.log(error.message)});
  },

  newRequestAuto: (requestOptions) => {
    fetch(
      process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/requests/send-request/automatic-accept",
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJson) => {
        alert("from service method: " + JSON.stringify(responseJson));
      })
      .catch((error) => {console.log(error.message)});
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
      .catch((error) => {console.log(error.message)});
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
      .catch((error) => {console.log(error.message)});
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
      .catch((error) => {console.log(error.message)});
  },
  
  getActive : (id, setCallback) => {
        fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH+'/api/reservations/'+id+'/active')
        .then((response) => response.json())
        .then((responseJson) => {
            if(setCallback) setCallback(responseJson);
        })
        .catch(error => {console.log(error.message)});
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
        .catch((error) => {console.log(error.message)});
  },
    
  getReservationsCount: async (lodgeId, start, end, setCount) => {
    fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/reservations/lodge/" + lodgeId + "/period/count?start=" + start + "&end=" + end)
    .then((response) => response.json())
    .then((responseJson) => {
      setCount(responseJson);
    })
  }
}

export default BookingService;
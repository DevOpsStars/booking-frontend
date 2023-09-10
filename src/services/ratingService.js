const RatingService = {
    
    getRatings: (setState, type, forId) => {
      fetch(process.env.REACT_APP_RATING_SERVICE_PATH + "/api/"+type+"-ratings/all/"+forId)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setState(responseJson);
        })
        .catch((error) => {
          // setState([]);
          console.log(error)
        });
    },

    getAverage: (setState, type, forId) => {
      fetch(process.env.REACT_APP_RATING_SERVICE_PATH + "/api/"+type+"-ratings/average/"+forId)
        .then((response) => {
          // console.log(response)
          console.log(response)

          return response.json()
        })
        .then((responseJson) => {
          console.log(responseJson);
          setState(responseJson);
        })
        .catch((error) => {
          // setState(0);
          console.log(error);
        });
    },
    
    createNew: (guestId, type, forId, rate) => {
      fetch(process.env.REACT_APP_RATING_SERVICE_PATH + "/api/"+type+"-ratings/new-rating/"+guestId+"/"+forId+"/"+rate)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {console.log(error.message)});
    },

    update: (id, type, rate) => {
      fetch(process.env.REACT_APP_RATING_SERVICE_PATH + "/api/"+type+"-ratings/update/"+id+"/"+rate)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {console.log(error.message)});
    },

    getAllByGuest: (guestId, type, setState) => {
      fetch(process.env.REACT_APP_RATING_SERVICE_PATH + "/api/"+type+"-ratings/all-by/"+guestId)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson) setState(responseJson);
        })
        .catch((error) => alert(error.message, error.status));
    },

    delete: (id, type) => {
      fetch(process.env.REACT_APP_RATING_SERVICE_PATH + "/api/"+type+"-ratings/delete/"+id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {console.log(error.message)});
    },
}

export default RatingService;

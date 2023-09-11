const LodgeDatesService = {

  newAvailability: async (requestOptions) => {
    fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/availability", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        alert("from service availability method: " + JSON.stringify(responseJson));
        console.log(responseJson);
      })
      .catch(error => {console.log(error.message)})
  },

  getAvailabilitiesByLodge: (lodgeId, setAvailabilities) => {
    fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/availability/lodge/" + lodgeId)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setAvailabilities(responseJson);
      })
      .catch(error => {console.log(error.message)})
  },

  deleteAvailability: (requestOptions, lodgeId, availabilityId, start, end) => {
    fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/reservations/lodge/" + lodgeId + "/period/count?start=" + start + "&end=" + end)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === 0) {
          // con
          fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/availability/" + availabilityId, requestOptions)
            .then((response) => {
              console.log(response)
              alert("Delted availability")
            })
            .catch(error => {console.log(error.message)})
        } else {
          alert("could not delete, because of existing reservations")
        }
      })
      .catch(error => {console.log(error.message)})
  },

  newPriceModification: async (requestOptions) => {
    fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/price", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        alert("from service price method: " + JSON.stringify(responseJson));
        console.log(responseJson);
      })
      .catch(error => {console.log(error.message)})
  },

  getPriceModificationsByLodge: (lodgeId, setPriceMods) => {
    fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/price/lodge/" + lodgeId)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setPriceMods(responseJson);
      })
      .catch(error => {console.log(error.message)})
  },

  deletePriceMod: (requestOptions, lodgeId, modificationId, start, end) => {
    fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/api/reservations/lodge/" + lodgeId + "/period/count?start=" + start + "&end=" + end)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson === 0) {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/price/" + modificationId, requestOptions)
          .then((response) => {
            console.log(response)
          })
          .catch(error => {console.log(error.message)})
      } else {
        alert("could not delete, because of existing reservations")
      }
    })
    .catch(error => {console.log(error.message)})
  }
}
export default LodgeDatesService;
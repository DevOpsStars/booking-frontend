const LodgeDatesService = {

    newAvailability: async (requestOptions) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/availability", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            alert("from service availability method: " + JSON.stringify(responseJson));
            console.log(responseJson);
        })
        .catch(error => alert(error.message))
    },

    getAvailabilitiesByLodge: (lodgeId, setAvailabilities) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/availability/lodge/" + lodgeId)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setAvailabilities(responseJson);
        })
        .catch(error => alert(error.message))
    },

    deleteAvailability: (requestOptions, id) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/availability/" + id, requestOptions)
        .then((response) => {
            console.log(response)
        })
        .catch(error => alert(error.message))
    }
}
export default LodgeDatesService;
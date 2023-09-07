const LodgingService = {

    getLodges: (setState) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/lodge")
            .then((response) => response.json())
            .then((responseJson) => {
                setState(responseJson)
            })
            .catch((error) => alert(error.message));
    },

    newLodge: (requestOptions) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/lodge", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            alert("from service method: " + JSON.stringify(responseJson));
        })
        .catch(error => alert(error.message))
    }
}
export default LodgingService;
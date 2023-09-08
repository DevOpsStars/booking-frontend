const LodgingService = {

    getLodges: (setState) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/lodge")
            .then((response) => response.json())
            .then((responseJson) => {
                setState(responseJson)
            })
            .catch((error) => alert(error.message));
    },

    newLodge: (requestOptions, setLodge) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/lodge", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            alert("from service method: " + JSON.stringify(responseJson));
            setLodge(responseJson);
            console.log(responseJson);
        })
        .catch(error => alert(error.message))
    },

    uploadPhoto: (requestOptions, lodgeId, title) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/photo/" + lodgeId + "/" + title, requestOptions)
        .then((response) => {
            console.log(response)
        })
        .catch(error => alert(error.message))
    },

    getPhotosByLodge: (lodgeId, setLodgePhotos) => {
        fetch(process.env.REACT_APP_LODGING_SERVICE_PATH + "/api/photo/lodge/" + lodgeId)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setLodgePhotos(responseJson);
        })
        .catch(error => alert(error.message))
    }
}
export default LodgingService;
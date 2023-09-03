const RequestService = {

    getRequests : (setState) => {
        fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH+'/api/requests')
        .then((response) => response.json())
        .then((responseJson) => {  
            // console.log("responseJson: ", responseJson);
            setState(responseJson);
        })
        .catch(error => alert(error.message));
    },

    newRequest : (requestOptions) => {
        fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH+'/api/requests', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);  
        })
        .catch(error => alert(error.message));
    },

    accept : (id) => {
        fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH+'/api/requests/'+id+'/accept')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson: ", responseJson);
        })
        .catch(error => alert(error.message));
    },

    decline : (id) => {
        fetch(process.env.REACT_APP_BOOKING_SERVICE_PATH+'/api/requests/'+id+'/decline')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson: ", responseJson);
        })
        .catch(error => alert(error.message));
    },
}

export default RequestService
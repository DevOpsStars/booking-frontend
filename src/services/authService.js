const AuthService = {

    login : (requestOptions) => {
        fetch(process.env.REACT_APP_USER_SERVICE_PATH+'/api/auth/login', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {  
            localStorage.setItem("currentUser", JSON.stringify(responseJson.user))  
            localStorage.setItem("token", responseJson.jwt)  
            
        })
        .catch(error => alert(error.message));
    },

    register : (requestOptions, password) => {
        fetch(process.env.REACT_APP_USER_SERVICE_PATH+'/api/auth/register?password='+password, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {    
        })
        .catch(error => alert(error.message));
    },
}

export default AuthService
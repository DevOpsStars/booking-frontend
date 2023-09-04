const UserService = {

    getUsers : (setUsers) => {
        fetch(process.env.REACT_APP_USER_SERVICE_PATH+'/api/users')
        .then((response) => response.json())
        .then((responseJson) => {  
            setUsers(responseJson);
        })
        .catch(error => alert(error.message));
    },

    getUser : (id, setUser, requestOptions) => {
        fetch(process.env.REACT_APP_USER_SERVICE_PATH+'/api/users', requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            let user = responseJson.filter(function (el) {
                return el.id === id
              })[0];
            setUser(user);
        })
        .catch(error => console.log(error.message));
    },

    updateUser : (requestOptions, hashedPassword) => {
        fetch(process.env.REACT_APP_USER_SERVICE_PATH+'/api/users/update?password='+hashedPassword, requestOptions)
        .then(() => { 
            let reqOptionsFetch = {
                method : 'GET',
                headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem("token")}
            }
            fetch(process.env.REACT_APP_USER_SERVICE_PATH+'/api/users/'+JSON.parse(requestOptions.body).userData.username, reqOptionsFetch)
            .then((response) =>  response.json())
            .then((responseJson) => {
                localStorage.setItem("currentUser", JSON.stringify(responseJson))
            })
            .catch(error => alert(error.message));
        })
        .catch(error => alert(error.message));
    },

    logout : () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
    },

    deleteUser : (requestOptions, username) => {
        fetch(process.env.REACT_APP_USER_SERVICE_PATH+'/api/users/delete?username='+username, requestOptions)
        .then(() => {
            UserService.logout();
            window.location.reload();
        })
    },
}

export default UserService
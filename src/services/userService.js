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
                return el.id == id
              })[0];
            setUser(user);
        })
        .catch(error => console.log(error.message));
    } 
}

export default UserService
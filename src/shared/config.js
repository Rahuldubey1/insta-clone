const sign = (values) => {
    console.log(values)
    return fetch('https://instaclone222.herokuapp.com/api/v1/auth/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(values)
        }).then(response => response.json())
};

export default sign
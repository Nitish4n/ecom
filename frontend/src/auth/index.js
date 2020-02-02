import { API } from '../config'

export const signupApi = async user => {

    try {
        const data = await fetch(`${API}/auth/signup`, {
                method:"POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(user)
            })

            return await data.json();
    } catch (err) {
        console.log(err)
    }
}

export const signInAPI = (user) => {
    return fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {return response.json()})
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }else{
        console.log('window is undefined')
    }
}


export const signOutApi = (next) => {
    if(typeof window !== undefined){
        localStorage.removeItem('jwt');
        next()
        return fetch(`${API}/auth/signout`,  {
            method:"GET"
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
}


export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false;
    }

    if(localStorage.getItem('jwt')){
        const jwt=  localStorage.getItem('jwt');
        return JSON.parse(jwt)
    }else{
        return false
    }
}
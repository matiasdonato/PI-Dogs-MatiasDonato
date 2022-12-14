export function getApiDogs() {
    return function(dispatch) {
        return fetch("https://api.thedogapi.com/v1/breeds?api_key=live_qJ4geMUe7XLJIdOTOzYE3SXypdeNQaOUjJnfaU11zHCLGMS93J0gKX7AeIl8YkQX")
            .then(r => r.json())
            .then(dogs => dispatch({ type: "GET_API_DOGS", payload: dogs }))
            .catch(() => dispatch({ type: "GET_API_DOGS", payload: "error" }))
    }
};

export function getDbDogs() {
    return function(dispatch) {
        return fetch("http://localhost:3001/dogs")
            .then(r => r.json())
            .then(dogs => dispatch({ type: "GET_DB_DOGS", payload: dogs }))
            .catch(() => dispatch({ type: "GET_DB_DOGS", payload: "error" }))
    }
};

export function getAllDogs() {
    return { type: "GET_ALL_DOGS" }
}



export function searchApiDogs(breed) {
    return function(dispatch) {
        return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}&api_key=live_qJ4geMUe7XLJIdOTOzYE3SXypdeNQaOUjJnfaU11zHCLGMS93J0gKX7AeIl8YkQX`)
            .then(r => r.json())
            .then(dogs => dogs.filter(d => d.reference_image_id))
            .then(dogs => dispatch({ type: "SEARCH_API_DOGS", payload: dogs }))
            .catch()
    }
}

export function searchDbDogs(breed) {
    if (breed === undefined || breed === "" || breed === " ") {
        return { type: "SEARCH_DB_DOGS", payload: [] }
    }
    return function(dispatch) {
        return fetch(`http://localhost:3001/dogs?name=${breed}`)
            .then(r => r.json())
            .then(dogs => dispatch({ type: "SEARCH_DB_DOGS", payload: dogs }))
            .catch()
    }
}


export function getTemperaments() {
    return function(dispatch) {
        return fetch(`http://localhost:3001/temperaments`)
            .then(r => r.json())
            .then(temps => dispatch({ type: "GET_TEMPERAMENTS", payload: temps }))
            .catch()
    }
}

export function cleanDogs() {
    return { type: "CLEAN_DOGS" }
}

export function getDogDetails(id) {
    if (id > 999) {
        return function(dispatch) {
            return fetch(`http://localhost:3001/dogs/${id}`)
                .then(r => r.json())
                .then(dog => dispatch({ type: "GET_DOG_DETAILS", payload: dog }))
                .catch()
        }
    } else {
        return { type: "GET_DOG_DETAILS", payload: id }
    }

}


export function getDogImage(dog, apiDogs) {
    if (!dog.image) {
        if (!dog.reference_image_id) {
            let img = "https://static.vecteezy.com/system/resources/thumbnails/006/720/668/small/dog-face-logo-free-vector.jpg"
            return img;
        }
        let imgId = dog.reference_image_id;
        let found = apiDogs.find(d => d.reference_image_id === imgId)
        let img = found.image.url
        return img
    } else {
        if (dog.id > 999) {
            let img = `http://localhost:3001/dogs/images/${dog.image}`
            return img
        } else {
            let img = dog.image.url
            return img
        }
    }
}
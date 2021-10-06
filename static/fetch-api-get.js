//Fetch Task from Backend
const fetchGet = function(url, job = 'json') {
    return fetch(`${window.origin}/${url}`, {
        method : 'GET'
    }).then(response =>{
        if (job==='json'){
            return response.json()
        }else{
            return response.status
        }
    });
}
//Fetch API Calls
const fetchPost = function(url, body){
        return fetch(`${window.origin}/${url}`, {
            method : 'POST',
            cache : 'no-cache',
            credentials : 'include',
            headers : new Headers({
                'content-type' : 'application/json'
            }),
            body : JSON.stringify(body)
        });
}
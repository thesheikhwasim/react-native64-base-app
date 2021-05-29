export function getServices(URL) {
    let fetchOptions = {}
    fetchOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };
    return fetch(URL, fetchOptions).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            alert("Something went wrong!");
            return error;
        });
}

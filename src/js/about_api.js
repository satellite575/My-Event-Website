const baseUrL = 'https://api.open-meteo.com/v1/forecast';

const queryParams = {
    latitude:-27.5,
    longitude:153.0,
    current_weather:true,
};

const queryString = new URLSearchParams(queryParams).toString();
const urlwithParams = baseUrL + "?" + queryString;
const requestOptions = {
    method:"Get",
    redirect:"follow",
};
fetch(urlwithParams, requestOptions)
    .then(response => response.json())
    .then(data =>{
        const weather = data.current_weather;
        console.log("Current temperature" + weather.temperature + "C");
        const temperature_element = document.getElementById('current_temperature');
        const windspeed_element = document.getElementById('current_windspeed');
        temperature_element.innerText = weather.temperature + "C";
        windspeed_element.innerText = weather.windspeed + "kph";
    } )
.catch(error => console.log('error',error));

const subscribeForm = document.getElementById('subscribe-form');

const handleInputChange = () => {
    let firstName = document.getElementById('firstName');
    let suburb = document.getElementById('suburb');
    let email = document.getElementById('email');
    let button = document.getElementById('subscribe-submit-button');

    if (firstName.value && suburb.value && email.value && email.validity.valid){
        button.classList.add('enable');
        button.disable = false;
    } else {
        button.classList.remove('enable');
        button.disable = true;       
    };
};

const handleSubmit = (event) => {
    event.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let suburb = document.getElementById('suburb').value;
    let email = document.getElementById('email').value;

    let responseMessage = document.getElementById('responseMessage');

    responseMessage.textContent = 'Sending your request ... Please wait.';

    let payload ={
        subscribe_name: firstName,
        subscribe_suburb: suburb,
        subscribe_email: email
    };

    const url = 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/api/';
    const method = 'POST';
    const headers = {
        'Content-type':'application/json',
    };
    
    fetch(url, {
        method: method,
        headers: headers,
        body:JSON.stringify(payload),
    
    })
        .then((response) => response.text())
        .then((data) =>{
            if (data === 'added'){
                responseMessage.textContent = 'Subscription successful. Thank you for subscribing!';
            } else if (data === 'exist') {
                responseMessage.textContent = 'This email address has already been used to subscribe.';
            } else if (data === 'error') {
                responseMessage.textContent = 'An error occured with the API. Please try again later.';
            }
        } )
    .catch((error) => {
        console.log('error',error);
        responseMessage.textContent = 'An unexpected error occured. Please try again later.';
    });

    
};

subscribeForm.addEventListener('input',handleInputChange);
subscribeForm.addEventListener('submit',handleSubmit);
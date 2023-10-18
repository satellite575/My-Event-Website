const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/musicians/";

document.getElementById('postButton').addEventListener('click', () => {
    const postMusicAudioMethod = "POST"; 

    var formdata = new FormData();
    formdata.append("name", "Frank Fender");
    formdata.append("song_title", "Reach for the stars");
    formdata.append("genre", "Alt Country");
    formdata.append("description", "This was expressing my angst at difficulties with the Brisbane Country Music scene");
    formdata.append("message", "This is for all my fans, especially those who stood by me over the past few months");
    formdata.append("audio_file", fileInput.files[0], "Paragraph 2.m4a");
    formdata.append("website_code", "Pete123");

    var requestOptions = {
        method: postMusicAudioMethod,
        body: formdata,
        redirect: 'follow'
    };

    fetch(baseURL, requestOptions)
        .then(response => response.text())
        .then(result => {
            document.getElementById('resultOutput').textContent = result;
        })
        .catch(error => console.log('error', error));
});

document.getElementById('getButton').addEventListener('click', () => {
    const my_website_code = 'Pete123'
    const queryParams = {
        website_code: my_website_code,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = baseURL + "?" + queryString;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(urlWithParams, requestOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultOutput').textContent = JSON.stringify(data, null, 2);
        });
});

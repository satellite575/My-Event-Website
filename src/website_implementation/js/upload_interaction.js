/*global constant variables*/ 
const AudioFileInputLabel = document.getElementById('Audio-file-input-label');
const AudioFileInput = document.getElementById('Audio-file-input');
const eventForm = document.querySelector('.upload-form')
const my_website_code = "Lisa321";
const baseURLMusicians = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/musicians/";
const postMusicAudioMethod = 'POST';

/*constant functions*/
const triggerFileInput = () =>{
    AudioFileInput.click();
};

const handleFileChange = () => {
    if (fileName.length > 20) {
        fileName = fileName.substring(0, 17) + '...';

        AudioFileInputLabel.textContent = "Great!";
    } else {
        AudioFileInputLabel.textContent = "Please Choose A File";
    }
};

const handleFormSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    formData.append("website_code",my_website_code);

    const requestOptions = {
        method: postMusicAudioMethod,
        body: formData,
        redirect: 'follow'
    };
    fetch(baseURLMusicians, requestOptions)
    .then(response => response.json().then(data =>{
        if (!response.ok) {
            console.log("Server response:", data);
            throw new Error("Network response had some problems");
        }
        return data;
    }))
    .then(data => {
        console.log(data);
        alert(`Your song "${data.song_title}" submitted sucessfully!`);
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
        alert("Error submitting file. Please try again.");
    });
};

/*event listener */
AudioFileInputLabel.addEventListener('click', triggerFileInput);
AudioFileInput.addEventListener('click', handleFileChange);
eventForm.addEventListener('submit',handleFormSubmit);

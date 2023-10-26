/* global constant variables */
const commentForm = document.getElementById('commentForm');
const usernameInput = document.getElementById('username');
const commentTextArea = document.getElementById('comment');
const ratingInput = document.getElementById('rating');
const commentsList = document.getElementById('commentsList');
const my_website_code = "Lisa321";

const baseURLComments = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";
const getCommentsMethod = "GET";
const postCommentsMethod = "POST";

/* constant functions */
const fetchComments = () => {
    const getCommentsURL = `${baseURLComments}?website_code=${my_website_code}`;

    fetch(getCommentsURL, {
        method: getCommentsMethod
    })
        .then(response => response.json())
        .then(data => {
            displayComments(data);
        })
        .catch(error => {
            console.error("There was a problem fetching the comments:", error.message);
        });
};

const displayComments = (comments) => {
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        const _p1 = document.createElement('p');
        _p1.textContent = `username: ${comment.username}`
        const _p2 = document.createElement('p');
        _p2.textContent = `comment: ${comment.comment}`
        const _p3 = document.createElement('p');
        _p3.textContent = `Rating: ${comment.rating || 'No rating'}`
        li.appendChild(_p1)
        li.appendChild(_p2)
        li.appendChild(_p3)
        commentsList.appendChild(li);
    });
};

const postComment = (event) => {
    event.preventDefault();

    const postCommentBody = JSON.stringify({
        username: usernameInput.value,
        comment: commentTextArea.value,
        website_code: my_website_code,
        rating: ratingInput.value || undefined
    });

    fetch(baseURLComments, {
        method: postCommentsMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: postCommentBody
    })
        .then(response => response.json().then(data => {
            if (!response.ok) {
                console.log("Server response:", data);
                throw new Error("Network response had some problems");
            }
            return data;
        }))
        .then(data => {
            usernameInput.value = '';
            commentTextArea.value = '';
            ratingInput.value = '';

            fetchComments();
            alert("Your comment was submitted successfully!");
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error.message);
            alert("Error submitting comment. Please try again.");
        });
};

/* event listener */
commentForm.addEventListener('submit', postComment);
document.addEventListener('DOMContentLoaded', fetchComments);
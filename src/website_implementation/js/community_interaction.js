
// URL

const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";

// 获取评论
const getCommentsURL = `${baseURL}?website_code=example123`;
const getCommentsMethod = "GET";

fetch(getCommentsURL, {
    method: getCommentsMethod,
})
.then(response => response.json())
.then(data => {
    // 处理获取的评论数据
    console.log("Comments:", data);
})
.catch(error => {
    console.error("Error fetching comments:", error);
});

// 提交评论
const postCommentURL = baseURL;
const postCommentMethod = "POST";
const postCommentHeaders = {
    'Content-Type': 'application/json'
};

const postCommentBody = JSON.stringify({
    username: "John",
    comment: "G!",
    website_code: "example123",
    rating: 5
});

fetch(postCommentURL, {
    method: postCommentMethod,
    headers: postCommentHeaders,
    body: postCommentBody
})
.then(response => response.json())
.then(data => {
    // 处理提交评论后的响应
    console.log("Comment posted:", data);
})
.catch(error => {
    console.error("Error posting comment:", error);
});

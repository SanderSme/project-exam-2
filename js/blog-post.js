const title = document.querySelector('title');
const queryString = document.location.search;

const params = new URLSearchParams(queryString);
console.log(params);

const postID = params.get('id');
console.log(postID);

const API_URL = `http://boatthatlifesander.local/wp-json/wp/v2/posts/${postID}`;

const postHeading = document.querySelector('general-heading');
const blogPost = document.querySelector('.blog-post');

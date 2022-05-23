const title = document.querySelector("title");
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const postID = params.get("id");

const API_URL = `http://boatthatlifesander.local/wp-json/wp/v2/posts/${postID}`;

const postHeading = document.querySelector(".general-heading");
const blogPost = document.querySelector(".blog-post");

async function getPostDetails() {
  try {
    const response = await fetch(API_URL);
    const singlePostDetails = await response.json();
    console.log(singlePostDetails);
    for (let i = 0; i < singlePostDetails.length; i++) {
      const postTitle = singlePostDetails[i].acf.hero_title;
      const postImage = singlePostDetails[i]._embedded["wp:featuredmedia"]['0'].source_url;
      const paragraph1 = singlePostDetails[i].acf.paragraph_1;
      const paragraph2 = singlePostDetails[i].acf.paragraph_2;
      const pros1 = singlePostDetails[i].acf.pros-1
    }
  } catch (error) {
    console.log(error);
  }
}
getPostDetails();
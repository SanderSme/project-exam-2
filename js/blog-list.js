const API_URL = 'http://boatthatlifesander.local/wp-json/wp/v2/posts?_embed=true&per_page=100';
const blogList = document.querySelector('.blog-list-container');

async function getPosts() {
    try {
        const response = await fetch(API_URL);
        let postData = await response.json();
        console.log(postData);
        blogList.innerHTML = '';
        for (let i = 0; i < postData.length; i++) {
            const postTitle = postData[i].acf.hero_title;
            const postDate = postData[i].date.split('T')[0];
            const postSummary = postData[i].acf.summary;
            const postImage = postData[i]._embedded["wp:featuredmedia"]['0'].source_url;
            blogList.innerHTML += `<div class="blog-post"><img src="${postImage}" alt="" class="blog-post-img" />
            <div class="blog-info-container">
              <h2 class="post-heading post-info">${postTitle}</h2>
              <h3 class="category post-info">Travel</h3>
              <p class="post-date post-info">Posted on: ${postDate}</p>
              <p class="summary">
                <b>Summary: </b>${postSummary}
              </p>
            </div>
            <a
              href="./blog-post.html?id=${postData[i].id}"
              class="button post-info"
              id="read-more-btn"
              >Read ></a
            ></div>`
        }
    } catch (error) {
        console.log('ERROOOOOR');
    }
}
getPosts()
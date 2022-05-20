const API_URL = 'http://boatthatlifesander.local/wp-json/wp/v2/posts?per_page=100';
const API_URL_MEDIA = 'http://boatthatlifesander.local/wp-json/wp/v2/media';
const blogList = document.querySelector('.blog-list-container');

async function getPosts() {
    try {
        const response = await fetch(API_URL);
        let postData = await response.json();
        const responseMedia = await fetch(API_URL_MEDIA);
        let postMedia = await responseMedia.json();
        console.log(postData);
        console.log(postMedia);
        blogList.innerHTML = '';
        for (let i = 0; i < postData.length; i++) {
          if (i===10) {
            break
          }
            const postTitle = postData[i].acf.hero_title;
            const postDate = postData[i].date.split('T')[0];
            const postSummary = postData[i].acf.summary;
            blogList.innerHTML += `<div class="blog-post"><img src="./img/main-pic-blog3.jpg" alt="" class="blog-post-img" />
            <div class="blog-info-container">
              <h2 class="post-heading post-info">${postTitle}</h2>
              <h3 class="category post-info">Travel</h3>
              <p class="post-date post-info">Posted on: ${postDate}</p>
              <p class="summary">
                <b>Summary: </b><br />${postSummary}
              </p>
            </div>
            <a
              href="./blogpost.html"
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
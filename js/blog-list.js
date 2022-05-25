// const API_URL =
//   "https://boatdatlife.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=10";
// const blogList = document.querySelector(".blog-list-container");

// let counter = 0;

// async function getPosts(offset) {
//   try {
//     const response = await fetch(`${API_URL}&offset=${offset}`);
//     let postData = await response.json();
//     let totalPages = response.headers.get("X-WP-TotalPages");
//     counter += 1;
//     const buttonContainer = document.querySelector(".button-container");
//     if (counter == totalPages) {
//       buttonContainer.style.display = "none";
//     }
//     for (let i = 0; i < postData.length; i++) {
//       const postTitle = postData[i].acf.hero_title;
//       const postDate = postData[i].date.split("T")[0];
//       const postSummary = postData[i].acf.summary;
//       const postImage = postData[i].acf.hero_image.url;
//       const postImageAlt = postData[i].acf.hero_image.alt;
//       const category = postData[i].acf.category;
//       const loading = document.querySelector(".lds-hourglass");
//       loading.style.display = "none";
//       blogList.innerHTML += `<div class="blog-post"><img src="${postImage}" alt="${postImageAlt}" class="blog-post-img" />
//             <div class="blog-info-container">
//               <h2 class="post-heading post-info">${postTitle}</h2>
//               <h3 class="category post-info">${category}</h3>
//               <p class="post-date post-info">Posted on: ${postDate}</p>
//               <p class="summary">
//                 <b>Summary: </b>${postSummary}
//               </p>
//             </div>
//             <a
//               href="./blog-post.html?id=${postData[i].id}"
//               class="button post-info"
//               id="read-more-btn"
//               >Read ></a
//             ></div>`;
//     }
//     return counter;
//   } catch (error) {
//     blogList.innerHTML = `<p class="error-message">Something went wrong :(</p>`;
//   }
// }

// getPosts(0);

// const loadMore = () => {
//   getPosts(counter * 10);
// };

const API_URL =
  "https://boatdatlife.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=10";
const blogList = document.querySelector(".blog-list-container");
const filterPosts = document.getElementById("myFilter");
const buttonContainer = document.querySelector(".button-container");
const loading = document.querySelector(".lds-hourglass");
const blogContainer = document.querySelector(".blog-list-container");
loading.style.display = "block";

let counter = 0;

async function fetchAPI(url, offset) {
  const response = await fetch(`${url}&offset=${offset}`);
  const postData = await response.json();
  const total = response.headers.get("X-WP-TotalPages");
  const buttonContainer = document.querySelector(".button-container");

  counter += 1;

  if (counter >= total) {
    buttonContainer.style.display = "none";
  }

  return postData;
}

fetchAPI(API_URL, counter).then((postData) => {
  hideLoader();
  show(postData);
});

const show = (postData) => {
  for (let i = 0; i < postData.length; i++) {
    const title = postData[i].acf.hero_title;
    const date = postData[i].date.split("T")[0];
    const summary = postData[i].acf.summary;
    const image = postData[i].better_featured_image.source_url;
    const imageAlt = postData[i].better_featured_image.alt_text;
    const category = postData[i].acf.category;
    blogList.innerHTML += `
      <div class="blog-post">
        <img src="${image}" alt="${imageAlt}" class="blog-post-img" />
        <div class="blog-info-container">
          <h2 class="post-heading post-info">${title}</h2>
          <h3 class="category post-info">${category}</h3>
          <p class="post-date post-info">Posted on: ${date}</p>
          <p class="summary">
            <b>Summary: </b>${summary}
          </p>
        </div>
        <a href="./blog-post.html?id=${postData[i].id}" class="button post-info" id="read-more-btn">Read ></a>
      </div>
    `;
  }

  filterPosts.onkeyup = function (event) {
    blogList.innerHTML = "";
    const searchValue = event.target.value.trim().toLowerCase();

    if (searchValue === "") {
      fetchAPI(API_URL, 0).then((postData) => {
        counter = 1;
        show(postData);
        const buttonContainer = document.querySelector(".button-container");
        buttonContainer.style.display = "flex";
      });
    } else {
      fetchAPI(
        `https://boatdatlife.flywheelsites.com/wp-json/wp/v2/posts?search=${searchValue}&offset=`,
        0
      ).then((postData) => {
        show(postData);
      });
    }
  };
};

const hideLoader = () => {
  document.querySelector(".lds-hourglass").style.display = "none";
};

const loadMore = () => {
  fetchAPI(API_URL, counter * 10).then((postData) => {
    show(postData);
  });
};
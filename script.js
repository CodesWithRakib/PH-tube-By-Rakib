function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      document.getElementById("btnAll").classList.add("active");
      displayVideos(data.videos);
    });
}

function removeClass() {
  const removeBtns = document.getElementsByClassName("active");

  for (let btn of removeBtns) {
    btn.classList.remove("active");
  }
}
function loadVideoDetails(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showVideoDetails(data.video));
}
function showVideoDetails(id) {
  console.log(id);
  const videoDetails = document.getElementById("video_details").showModal();
  const modalBox = document.getElementById("modalBox");
  modalBox.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${id.thumbnail}"
      alt="img" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${id.title}</h2>
    <p>${id.description}</p> 
  </div>
</div>
   <div class="modal-action">
    <form method="dialog">
    <button class="btn shadow-md">Close</button>
    </form>
  </div>`;
}
const loadVideosByCategories = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      // console.log(clickedBtn);
      clickedBtn.classList.add("active");
      displayVideos(data.category);
    });
};

function displayCategories(categories) {
  const btnContainer = document.getElementById("btnContainer");

  for (let cat of categories) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
    <button id='btn-${cat.category_id}' class="btn rounded-xl bg-gray-100" onclick ='loadVideosByCategories(${cat.category_id})'>${cat.category}</button>
    `;
    btnContainer.appendChild(btnDiv);
  }
}
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videosContainer");
  videosContainer.innerHTML = "";
  if (videos.length === 0) {
    videosContainer.innerHTML = `  <section
          class="col-span-full flex flex-col items-center justify-center"
        >
          <figure>
            <img src="assets/Group 18.png" alt="img" />
          </figure>
          <p class="text-3xl font-bold">
            Oops!! Sorry, There is no content here
          </p>
        </section>`;
    return;
  }
  videos.forEach((video) => {
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("bg-slate-100", "rounded-xl");
    videoContainer.innerHTML = `
      <figure class=''>
        <img src="${video.thumbnail}" alt="img" class="w-full h-[200px]" />
      </figure>
      <div class="flex gap-4 px-4 py-6">
        <figure class=''>
          <img src="${
            video.authors[0].profile_picture
          }" alt="img" class="w-6 h-6 rounded-full" />
        </figure>
        <div class= 'flex flex-col '>
          <h3 class="font-bold">
           ${video.title}
          </h3>
          <p class="text-sm flex items-center">By <span>${
            video.authors[0].profile_name
          }</span>&nbsp;${
      video.authors[0].verified == true
        ? `<img src="assets/icons8-verified.gif" alt="gif" class='w-4 h-4'>`
        : ""
    }</p>
          <p class="text-sm">${video.others.views}</p>
        </div>
       
      </div>
       <button onclick=loadVideoDetails('${
         video.video_id
       }') class="btn w-full bg-slate-500 text-white" id="${
      video.video_id
    }">Show Details</button>
    `;
    // console.log(video.video_id);
    videosContainer.appendChild(videoContainer);
  });
};
const searchInput = document
  .getElementById("searchInput")
  .addEventListener("input", function (e) {
    const searchText = e.target.value;
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayVideos(data.videos));
  });
loadCategories();
// loadVideos();

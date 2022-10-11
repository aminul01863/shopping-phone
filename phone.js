// API LOADED
const loadUser = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayUser(data.data, dataLimit);
};

// display phon

const displayUser = (data, dataLimit) => {
  const cardContainer = document.getElementById("phone-container");
  cardContainer.textContent = "";

  //   All product button
  const showBtn = document.getElementById("Show-btn");
  if (dataLimit && data.length > 15) {
    data = data.slice(0, 15);
    showBtn.classList.remove("d-none");
  } else {
    showBtn.classList.add("d-none");
  }

  //   node found message
  const notFound = document.getElementById("no-found");
  if (data.length === 0) {
    notFound.classList.remove("d-none");
  } else {
    notFound.classList.add("d-none");
  }
  data.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4 border border-success">
        <img class=" p-4 card-img-top img-fluid " src="${phone.image}"alt=".">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.slug}</p>
            <button onclick="dataDetail('${phone.slug}')" href='#' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"">Details</button>
        </div>

    </div>
    `;

    cardContainer.appendChild(phoneDiv);
  });
  spinnerLoading(false);
};
//

// process search
const processSearch = (dataLimit) => {
  spinnerLoading(true);
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;

  loadUser(searchValue, dataLimit);
};
//search phon
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(15);
});

// Enter key
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(15);
    }
  });
// spinner loading

const spinnerLoading = (spinner) => {
  const loading = document.getElementById("spinner");
  if (spinner) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};

document.getElementById("Show-all").addEventListener("click", function () {
  processSearch();
});
// Data details
const dataDetail = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetail(data.data);
};

const displayDetail = (phoneDetail) => {
  console.log(phoneDetail);
  const phoneModal = document.getElementById("phone-modal");
  phoneModal.innerText = phoneDetail.name;
  const phoneModalSlug = document.getElementById("phone-modal-slug");
  phoneModalSlug.innerHTML = `
  <p>releaseDate :${phoneDetail.releaseDate}</p>
  `;
};
// loadUser();

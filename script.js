var cardContainer = document.getElementById("cardContainer");
var searchInput = document.getElementById("searchInput");

var staffList = [];

// Fetching data from API
function loadStaffData() {
  fetch("https://randomuser.me/api/?results=10")
    .then(res => res.json())
    .then((userData) => {
      const users = userData.results;
      fetch("http://127.0.0.1:5000/staff")
        .then(res => res.json())
        .then((staffData) => {
          combineData(userData.results, staffData);
          renderStaffCards(staffList);
        })
        .catch((error) => {
          console.error("Error loading staff info:", error);
          const fallbackStaff = users.map(user => ({
            name: user.name.first + " " + user.name.last,
            photo: user.picture.large,
            email: "N/A",
            jobTitle: "N/A (Backend fetch failed)",
            researchArea: "N/A"
          }));
          staffList = fallbackStaff;
          renderStaffCards(staffList);
          showWarning("Backend staff info could not be loaded.");
        });
    })
    .catch((error) => {
      console.error("Error loading random users:", error);
      showWarning("Failed to load random user data.");
    });
}

function showWarning(message) {
  const alertBox = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.getElementById("alertPlaceholder").innerHTML = alertBox;
}

// Combine data
function combineData(users, extraInfo) {
  staffList = [];

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var info = extraInfo[i] || {};

    var staff = {
      name: user.name.first + " " + user.name.last,
      photo: user.picture.large,
      email: info.email || "N/A",
      jobTitle: info.jobTitle || "N/A",
      researchArea: info.researchArea || "N/A"
    };

    staffList.push(staff);
  }
}

// Render user card
function renderStaffCards(data) {
  cardContainer.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var person = data[i];

    var col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4 col-xl-3";

    var cardHTML = `
      <div class="card h-100 animate__animated animate__fadeInUp">
        <img src="${person.photo}" class="card-img-top" alt="${person.name}">
        <div class="card-body">
          <h5 class="card-title"><i class="fas fa-user"></i> ${person.name}</h5>
          <p class="card-text">
            <i class="fas fa-briefcase"></i> <strong>Job:</strong> ${person.jobTitle}<br>
            <i class="fas fa-flask"></i> <strong>Area:</strong> ${person.researchArea}
          </p>
          <button class="btn btn-primary" data-index="${i}" data-bs-toggle="modal" data-bs-target="#detailModal">
            <i class="fas fa-circle-info"></i> View Details
          </button>
        </div>
      </div>
    `;

    col.innerHTML = cardHTML;
    cardContainer.appendChild(col);
  }

  bindDetailButtons();
}

// Add click event listener, it will open modal
function bindDetailButtons() {
  var buttons = document.querySelectorAll(".btn.btn-primary");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
      var index = event.target.getAttribute("data-index");
      showDetailModal(index);
    });
  }
}

// Show Modal user information
function showDetailModal(index) {
  var person = staffList[index];

  document.getElementById("modalName").innerText = person.name;

  var modalBody = `
    <p><strong>Email:</strong> ${person.email}</p>
    <p><strong>Job Title:</strong> ${person.jobTitle}</p>
    <p><strong>Research Area:</strong> ${person.researchArea}</p>
  `;

  document.getElementById("modalBody").innerHTML = modalBody;
}

// Search to filter
searchInput.addEventListener("input", () => {
  var keyword = searchInput.value.toLowerCase();
  var filtered = [];

  for (var i = 0; i < staffList.length; i++) {
    var person = staffList[i];
    if (
      person.jobTitle.toLowerCase().indexOf(keyword) !== -1 ||
      person.researchArea.toLowerCase().indexOf(keyword) !== -1
    ) {
      filtered.push(person);
    }
  }

  renderStaffCards(filtered);
});

// Call when page load
loadStaffData();

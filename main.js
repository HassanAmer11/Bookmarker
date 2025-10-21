var bookmarkInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("siteUrl");
var rowData = document.getElementById("data-rows");
var bookmarkList = JSON.parse(localStorage.getItem("bookmarks")) || [];
displayBookmarks(bookmarkList);

function isBookmarkexist() {
  for (let i = 0; i < bookmarkList.length; i++) {
    let bookmarkNameValue = bookmarkInput.value.toLowerCase();
    if (
      bookmarkList[i].Name.toLowerCase().trim() === bookmarkNameValue.trim()
    ) {
      document.getElementById("Bookmarkexist").classList.remove("d-none");
      return true;
    }
  }
  return false;
}

function addNewBookmark() {
  document.getElementById("Bookmarkexist").classList.add("d-none");
  var isValidUrl = validateForm(siteUrlInput);
  var isValidName = validateForm(bookmarkInput);
  if (isValidUrl && isValidName) {
    if (isBookmarkexist()) return false;

    var bookmark = {
      Name: bookmarkInput.value,
      Url: siteUrlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    displayBookmarks(bookmarkList);
    claerForm();
  }
}

function claerForm() {
  siteUrlInput.value = null;
  bookmarkInput.value = null;
  siteUrlInput.classList.remove("is-valid");
  bookmarkInput.classList.remove("is-valid");
}

function deleteBookmark(deletedIndex) {
  bookmarkList.splice(deletedIndex, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks(bookmarkList);
}

function displayBookmarks(bookmarkList) {
  var data = "";
  for (let i = 0; i < bookmarkList.length; i++) {
    const element = bookmarkList[i];

    data += `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card align-items-center">
                        <div class="card-body d-flex">
                            <h2 class="h3">${i + 1}.</h2>
                            <h3 class="h3">${element.Name}</h3>
                        </div>
                        <div class="card-footer w-100 text-center">
                            <a href="${
                              element.Url
                            }" target="_blank" class="btn btn-success">Visit</a>
                            <button type="button" class="btn btn-danger"  onclick="deleteBookmark(${i})">Delete</button>
                        </div>
                    </div>
                </div>

    `;
  }
  rowData.innerHTML = data;
}

function validateForm(src) {
  var regex = {
    bookmarkName: /^[A-Z]\w{2,10}[\s-]\w{0,10}$/,
    siteUrl: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i,
  }; 
  if (regex[src.id].test(src.value)) {
    src.classList.remove("is-invalid");
    src.classList.add("is-valid");
    src.parentElement.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    src.classList.add("is-invalid");
    src.classList.remove("is-valid");
    src.parentElement.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

/*
function validateForm(src) {
  var regex = /^[A-Z]\w{2,10}[\s-]\w{0,10}$/;
  if (regex.test(src.value)) {
    src.classList.remove("is-invalid");
    src.classList.add("is-valid");
    src.parentElement.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    src.classList.add("is-invalid");
    src.classList.remove("is-valid");
    src.parentElement.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

function validateUrl(src) {
  var regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
  if (regex.test(src.value)) {
    src.classList.remove("is-invalid");
    src.classList.add("is-valid");
    src.parentElement.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    src.classList.add("is-invalid");
    src.classList.remove("is-valid");
    src.parentElement.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
*/
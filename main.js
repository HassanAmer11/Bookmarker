var bookmarkName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteUrl");
var rowData = document.getElementById("data-rows");
var bookmarkList = JSON.parse(localStorage.getItem("bookmarks")) || [];
displayBookmarks(bookmarkList);

function addNewBookmark() {
  var isValidUrl = validateUrl(siteUrl);
  var isValidName = validateForm(bookmarkName);
  if (isValidUrl && isValidName) {
    var isExist = false;
    for (let i = 0; i < bookmarkList.length; i++) {
      if (bookmarkList[i].Name == bookmarkName.value) {
        isExist = true;
      }
    }
    if (isExist === false) {
      var bookmark = {
        Name: bookmarkName.value,
        Url: siteUrl.value,
      };
      bookmarkList.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
      displayBookmarks(bookmarkList);
      claerForm();
    }
  }
}

function claerForm() {
  siteUrl.value = null;
  bookmarkName.value = null;
}

function deleteBookmark(deletedIndex) {
  bookmarkList.splice(deletedIndex, 1);
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
  var regex = /^http[s]?:\/\/\w{1,20}.\w{1,20}$/;
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

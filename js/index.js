const elList = document.querySelector(".list");
const elNum = document.querySelector(".countNum");
const elSelect = document.querySelector(".select");
const elForm = document.querySelector(".form");

const filter = (array) => {
  const allCategor = [];

  array.forEach((item) => {
    item.categories.forEach((categor) => {
      if (!allCategor.includes(categor)) {
        allCategor.push(categor);
      }
    });
  });

  allCategor.forEach((element) => {
    const newOption = document.createElement("option");

    newOption.textContent = element;

    elSelect.appendChild(newOption);
  });
};

filter(movies);

function render(array, list) {
  list.textContent = null;
  elNum.innerHTML = array.length;

  array.forEach((movie) => {
    //Create element
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newInfo = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newYear = document.createElement("p");
    const newRate = document.createElement("span");
    const newTime = document.createElement("span");
    const newCategories = document.createElement("ul");
    const seeCat = document.createElement("a");
    const newDuration = document.createElement("div");

    movie.categories.forEach((item) => {
      const newCategor = document.createElement("li");
      newCategor.setAttribute("class", "categor-list");
      newCategor.textContent = item;

      newCategories.appendChild(newCategor);
    });
    //Set atribut
    newLi.setAttribute("class", "list-item");
    newImg.setAttribute("class", "list-img");
    newImg.setAttribute("src", movie.smallThumbnail);
    newInfo.setAttribute("class", "list-info");
    newTitle.setAttribute("class", "info-title");
    newDuration.setAttribute("class", "duration-wrapper");
    newYear.setAttribute("class", "info-year");
    newRate.setAttribute("class", "info-rate");
    newCategories.setAttribute("class", "categories-list");
    seeCat.setAttribute("href", "#");
    seeCat.setAttribute("class", "see-btn");

    //Text-content
    newYear.textContent = `Year: ${movie.year}`;
    newTitle.textContent = movie.title;
    newRate.textContent = `${movie.imdbRating} / 9`;
    seeCat.textContent = `see categories`;
    seeCat.addEventListener("click", (e) => {
      e.preventDefault();
      newCategories.classList.toggle("show-hide");
    });

    const hour = Math.floor(movie.runtime / 60);
    const minut = movie.runtime % 60;

    newTime.textContent = `${hour}h ${minut}m`;

    //Append
    newLi.appendChild(newImg);
    newLi.appendChild(newTitle);
    newLi.appendChild(newInfo);
    newDuration.appendChild(newRate);
    newDuration.appendChild(newTime);
    newInfo.appendChild(newYear);
    newInfo.appendChild(newDuration);
    newInfo.appendChild(newCategories);
    newInfo.appendChild(seeCat);
    list.appendChild(newLi);
  });
}

render(movies, elList);

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const filteredArr = movies.filter((item) => {
    return item.categories.includes(elSelect.value);
  });
  console.log(filteredArr);
  render(filteredArr, elList);
});

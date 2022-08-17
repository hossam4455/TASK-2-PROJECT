let mycourses = document.querySelector(".courses_flex");
let search_icon = document.getElementById("searchIcon");

let all_courses = [];

fetch("courses.json")
  .then((response) => {
    return response.json();
  })
  .then((a) => {
    all_courses = a;
    for (let i = 0; i < a.length; i++) {
      rinder(a[i]);
    }
  });

search_icon.addEventListener("click", function (event) {
  event.preventDefault();
  reseting();
});
function reseting() {
  let text = document.querySelector("[name='search']").value;
  let valid_courses = [];
  mycourses.innerHTML = "";
  valid_courses = finding(text);
  for (let i = 0; i < valid_courses.length; i++) {
    rinder(valid_courses[i]);
  }
}
function finding(text) {
  let arr = [];
  if (text == "") {
    return all_courses;
  }

  for (let i = 0; i < all_courses.length; i++) {
    if (
      all_courses[i]["title"].toLowerCase().indexOf(text.toLowerCase()) !== -1
    ) {
      arr.push(all_courses[i]);
    }
  }
  return arr;
}
function rinder(course) {
  const makeDiv = document.createElement("div");
  makeDiv.classList.add("course");
  const Img = document.createElement("img");
  Img.classList.add("course_imge");
  Img.setAttribute("src", course["image"]);
  const head = document.createElement("h4");
  head.innerText = course["title"];
  const parag = document.createElement("p");
  parag.innerText = course["author"];
  const rate = document.createElement("span");
  rate.classList.add("num");
  rate.innerText = course["rating"];
  const star1 = document.createElement("i");
  const star2 = document.createElement("i");
  const star3 = document.createElement("i");
  const star4 = document.createElement("i");
  const star5 = document.createElement("i");
  star1.classList.add("fa-solid", "fa-star");
  star2.classList.add("fa-solid", "fa-star");
  star3.classList.add("fa-solid", "fa-star");
  star4.classList.add("fa-solid", "fa-star");
  star5.classList.add("fa-solid", "fa-star-half-stroke");
  const price = document.createElement("h4");
  price.innerText = course["price"];
  makeDiv.appendChild(Img);
  makeDiv.appendChild(head);
  makeDiv.appendChild(parag);
  makeDiv.appendChild(rate);
  makeDiv.appendChild(star1);
  makeDiv.appendChild(star2);
  makeDiv.appendChild(star3);
  makeDiv.appendChild(star4);
  makeDiv.appendChild(star5);
  makeDiv.appendChild(price);
  console.log("H");
  mycourses.appendChild(makeDiv);
}

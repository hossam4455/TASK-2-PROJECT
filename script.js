const courses = "https://api.npoint.io/ee25cc00aad9346ebccc/";
let group = "python";
let details = {
  aws: {
    name: "AWS",
    title: "Top courses in AWS Certification",
    header: "Become an expert in cloud computing with AWS Certification",
    description:
      "Prep for your AWS certification with an AWS course on Udemy. Learn the fundamentals of AWS such as working with a serverless platform, the various frameworks, security and more. With these courses, you’ll build the valuable skills you need to implement cloud initiatives — and open up new career opportunities. If you want to become an AWS developer, we’ve got the course for you.",
  },
  data: {
    name: "Data Science",
    title: "Top courses in Data Science",
    header: "Lead data-driven decisions with Data Science",
    description:
      "Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. Get data science training if you’re into research, statistics, and analytics.",
  },
  draw: {
    name: "Drawing",
    title: "Top courses in Drawing",
    header: "Expand your creative skillset with Drawing",
    description:
      "Want to start drawing for fun or take your craft to the next level? Explore our online drawing classes and learn pencil drawing, figure drawing, cartoon drawing, character drawing for cartoons and anime, illustration, sketching, shading and more. Take an overview course on the fundamentals of drawing or zero in on an area you’d like to improve with a specialized course. We’ve got tons of options to get — and keep — you going.",
  },
  js: {
    name: "JavaScript",
    title: "Top courses in JavaScript",
    header: "Grow your software development skills with JavaScript",
    description:
      "JavaScript is a text-based computer programming language used to make dynamic web pages. A must-learn for aspiring web developers or programmers, JavaScript can be used for features like image carousels, displaying countdowns and timers, and playing media on a webpage. With JavaScript online classes, you can learn to build",
  },
  python: {
    name: "Python",
    title: "Top courses in Python",
    header: "Expand your career opportunities with Python",
    description:
      "Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to both beginners and advanced developers alike.",
  },
  web: {
    name: "Web Development",
    title: "Top courses in Web Development",
    header: "Build websites and applications with Web Development",
    description:
      "The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.",
  },
  excel: {
    name: "Excel",
    title: "Top courses in Excel",
    header: "Analyze and visualize data with Excel",
    description:
      "Take a Microsoft Excel course from Udemy, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to turn their raw data into actionable insights.",
  },
};

function makeCourse(course) {
  let rate = "";
  for (let i = 1; i <= 5; i++) {
    if (course.rating >= i) rate += `<span class="fa fa-star checked"></span>`;
    else if (Math.floor(course.rating) + 1 >= i)
      rate += `<span class="fa fa-star-half-stroke"></span>`;
    else rate += `<span class="fa-regular fa-star"></span>`;
  }
  let instructor = "",
    first = 0;
  for (let element of course.instructors) {
    if (first != 0) instructor += ",";
    instructor += element.name;
    first++;
  }
  return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 small-course">
        <div class="card h-100">
            <img class="d-block w-100 h-100 card-img-top" src="${
              course.image
            }" alt="python course">
            <div class="card-body">
               <h4 class="card-title">${course.title}</h4>
               <p class="card-text">${instructor}</p>
               <p  style="color: gold;">
                    <span  >${course.rating.toFixed(1)}</span>
                    ${rate}
                </p>
                <p><b>E£${course.price}</b></p>
            </div>
      </div>
 </div>
  `;
}

async function build(searchValue) {
  let search = `${courses}${group}`;
  let obj = await fetch(search);
  let json = await obj.json();
  console.log(search);
  console.log(searchValue);
  let cur = details[group];
  let content = `
 <div class="desktop">
      <h3>${cur.header}</h3>
      <p>${cur.description}</p>
      <div class="my-4">
          <button><b>Explore ${cur.name}</b></button>
      </div>
  </div>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
  <div class="carousel-item active">
  <div class="row">
  `,
    counter = 0;
  for (let element of json) {
    if (counter == 4) {
      content += `
              </div>
          </div>
          <div class="carousel-item">
          <div class="row">
          `;
      counter = 0;
    }
    if (
      searchValue != "" &&
      element.title.toLowerCase().indexOf(searchValue.toLowerCase()) == -1
    )
      continue;
    content += makeCourse(element);
    counter++;
  }
  content += `
      </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon slider bg-dark" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon slider bg-dark" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
  </a>
</div>
</div>
  `;
  document.querySelector(".courses").innerHTML = content;
}

build("");

let searchButton = document.querySelector("#searchIcon");
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  let searchKey = document.querySelector("#search-input").value;
  build(searchKey);
});

let tab = document.querySelector("#python");
tab.addEventListener("click", (event) => {
  event.preventDefault();
  group = "python";
  build("");
});
tab = document.querySelector("#excel");
tab.addEventListener("click", (event) => {
  event.preventDefault();
  group = "excel";
  console.log(group);
  build("");
});
tab = document.querySelector("#web");
tab.addEventListener("click", (event) => {
  event.preventDefault();
  group = "web";
  build("");
});

tab = document.querySelector("#js");
tab.addEventListener("click", (event) => {
  event.preventDefault();

  group = "js";

  build("");
});

tab = document.querySelector("#data");
tab.addEventListener("click", (event) => {
  event.preventDefault();

  group = "data";

  build("");
});

tab = document.querySelector("#aws");
tab.addEventListener("click", (event) => {
  event.preventDefault();

  group = "aws";

  build("");
});

tab = document.querySelector("#draw");
tab.addEventListener("click", (event) => {
  event.preventDefault();

  group = "draw";

  build("");
});
console.log("HI");

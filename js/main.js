const span = (text, index) => {
  const node = document.createElement("span");

  node.innerText = text;
  node.style.setProperty("--index", index);

  return node;
};

const byLetter = (text) => [...text].map(span);

const splitTargets = document.querySelectorAll("[data-split-letters]");

splitTargets.forEach((node) => {
  let nodes = null;
  nodes = byLetter(node.innerText);

  if (nodes) node.firstChild.replaceWith(...nodes);
});

// sending data to json
let platforms = [];
let areas = [];
let platform = [];
let games_played = [];

window.addEventListener("load", (e) => {
  document.querySelector("button").addEventListener("click", () => {
    console.log(areas);
    console.log(platforms);
    const full_name = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const date_of_birth = document.getElementById("date_of_birth").value;
    document.getElementById("myForm").reset();

    const data = {
      full_name,
      email,
      date_of_birth,
      platform,
      games_played,
      areas,
    };
    post(data);
  });
});

function post(data) {
  const postData = JSON.stringify(data);
  fetch("https://ezone-cd66.restdb.io/rest/ezone", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "6083279e28bf9b609975a5e7",
        "cache-control": "no-cache",
      },
      body: postData,
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
  platform = [];
  areas = [];
  games_played = [];
}

function handleClick(event) {
  const {
    target: {
      name
    },
  } = event;
  switch (name) {
    case "platform":
      arrayReducer(platform);
      break;
    case "areas":
      arrayReducer(areas);
      break;
    case "games_played":
      arrayReducer(games_played);
  }

  function arrayReducer(array) {
    console.log(event.target.checked);
    if (event.target.checked) {
      array.push(event.target.id);
    } else {
      if (name === "platform") {
        platform = array.filter((name) => name !== event.target.id);
      } else if (name === "areas") {
        areas = array.filter((name) => name !== event.target.id);
      } else {
        games_played = array.filter((name) => name !== event.target.id);
      }
    }
  }
}

// message window
let modal = document.getElementById("modal");
let btn = document.getElementById("subBtn");
let span_f = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
  setTimeout(() => {
    modal.style.display = "none";
  }, 6000);
};
span_f.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
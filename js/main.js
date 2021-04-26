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

  console.log(node.firstChild);

  if (nodes) node.firstChild.replaceWith(...nodes);
});

// sending data to json
let platforms = [];
let areas = [];

window.addEventListener("load", (e) => {
  document.querySelector("button").addEventListener("click", () => {
    const full_name = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const date_of_birth = document.getElementById("date_of_birth").value;

    const data = {
      full_name,
      email,
      date_of_birth,
      platforms,
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
}
function handleClick(event) {
  if (event.target.checked) {
    (event.target.name === "areas" ? areas : platforms).push(event.target.id);
  } else {
    if (event.target.name === "areas") {
      areas = areas.filter((area) => area !== event.target.id);
    } else {
      platforms = platforms.filter((platform) => platform !== event.target.id);
    }
  }
}

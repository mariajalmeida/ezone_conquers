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
// const endpoint = "https://ezone-cd66.restdb.io/rest/ezone";
const apiKey = "6083279e28bf9b609975a5e7";

window.addEventListener("load", (e) => {
  document.querySelector("button").addEventListener("click", () => {
    const data = {
      full_name: "Marek Kot",
      email: "email@email.com",
      date_of_birth: "April 2008",
      platforms: "",
      areas: "",
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
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

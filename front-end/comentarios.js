const url = "https://desafio-backend1.herokuapp.com";

const getFormData = () => {
  const formEntries = {};
  const formData = new FormData(document.getElementById("form"));
  for (var pair of formData.entries()) {
    formEntries[pair[0]] = pair[1];
  }
  return formEntries;
};

const getComments = () =>
  fetch(`${url}/comments`)
    .then((res) => res.json())
    .catch((err) => err);

const postComment = (comment) =>
  fetch(`${url}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
    .then((res) => res.json())
    .catch((err) => err);

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = getFormData();
  await postComment(formData);
  renderComments();
});

async function renderComments() {
  const container = document.createElement("div");
  const comments = await getComments();
  comments.forEach((comment) => {
    let commentBox = document.createElement("div");
    let { name, description } = comment;
    let string_of_html = `<h4 class="comment-title">${name}</h4> <p class="comment-paragraph">${description}</p>`;
    commentBox.innerHTML = string_of_html;
    container.append(commentBox);
  });
  document.getElementById("comments").append(container);
}

renderComments();

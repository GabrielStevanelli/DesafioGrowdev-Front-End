const url = "https://desafio-backend1.herokuapp.com";

const getFormData = () => {
  const formEntries = {};
  const formData = new FormData(document.getElementById("form"));
  for (var pair of formData.entries()) {
    formEntries[pair[0]] = pair[1];
  }
  return formEntries;
};

const postContact = (contact) =>
  fetch(`${url}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  })
    .then((res) => alert("Solicitação enviada com sucesso"))
    .catch((err) => alert("Solicitação Falhou Entre em contato"));

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = getFormData();

  return await postContact(formData);
});

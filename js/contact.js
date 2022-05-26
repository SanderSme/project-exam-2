const validateForm = (event) => {
  event.preventDefault();

  let name = document.forms["form-container"]["your-name"].value;
  let email = document.forms["form-container"]["your-email"].value;
  let subject = document.forms["form-container"]["your-subject"].value;
  let message = document.forms["form-container"]["your-message"].value;

  let atPosition = email.indexOf("@");
  let dotPosition = email.lastIndexOf(".");

  let isName = name.length > 5;
  let isEmail =
    atPosition < 1 ||
    dotPosition < atPosition + 2 ||
    dotPosition + 2 >= email.length;
  let isSubject = subject.length > 15;
  let isMessage = message.length > 25;

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");
  const submitted = document.querySelector(".submitted");

  nameError.innerHTML = isName ? "" : "Name must be at least 5 characters";
  emailError.innerHTML = !isEmail
    ? ""
    : "Please fill in a valid e-mail address";
  subjectError.innerHTML = isSubject
    ? ""
    : "Subject must be at least 15 characters";
  messageError.innerHTML = isMessage
    ? ""
    : "Message must be at least 25 characters";

  const isSubmit = isName && !isEmail && isSubject && isMessage;

  if (isSubmit) {
    const formElement = event.target;
    const action = formElement.action;
    const method = formElement.method;

    const body = new FormData(formElement);

    fetch(action, {
      method,
      body,
    })
      .then((response) => response.json())
      .then((response) => {
        submitted.innerHTML = response.message;
      })
      .catch((error) => {
        console.log("There was an error: ");
        console.log(error);
        submitted.innerHTML = "There was an error. Please try again";
      });
  }
};

const formElement = document.querySelector("form");
formElement.addEventListener("submit", validateForm);

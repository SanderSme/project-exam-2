function validateForm() {
  let name = document.forms["form-container"]["name"].value;
  let email = document.forms["form-container"]["email"].value;
  let subject = document.forms["form-container"]["subject"].value;
  let message = document.forms["form-container"]["message"].value;

  let atPosition = email.indexOf("@");
  let dotPosition = email.lastIndexOf(".");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");
  const submitted = document.querySelector(".submitted");

  if (name < 5) {
    nameError.innerHTML = "Please fill in your name";
  } else {
    nameError.innerHTML = "";
  }
  if (subject.length < 15) {
    subjectError.innerHTML = "Subject must be atleast 15 characters";
  } else {
    subjectError.innerHTML = "";
  }
  if (
    atPosition < 1 ||
    dotPosition < atPosition + 2 ||
    dotPosition + 2 >= email.length
  ) {
    emailError.innerHTML = "Please enter correct E-Mail ID";
  } else {
    emailError.innerHTML = "";
  }
  if (message.length < 25) {
    messageError.innerHTML = "Message must be atleast 25 characters";
    return false;
  } else {
    messageError.innerHTML = "";
  }
  submitted.innerHTML = "Form submitted";
  return true;
}

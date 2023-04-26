function submitForm(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var correctUsername = "admin";
  var correctPassword = "123";
  var welcomeMessage = document.getElementById("welcome-message");
  var loginForm = document.getElementById("login-form");

  if (username === correctUsername && password === correctPassword) {
    var welcomeMessageText = document.createTextNode("Welcome " + correctUsername + "!");
    welcomeMessage.appendChild(welcomeMessageText);
    welcomeMessage.style.display = "block";
    loginForm.style.display = "none";

    setTimeout(function() {
      welcomeMessage.style.display = "none";
    }, 2000);
  } else {
    alert("Incorrect username or password");
  }

  return false;
}

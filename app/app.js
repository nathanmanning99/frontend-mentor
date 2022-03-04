const checkFirstName = (firstname) => {
  let valid = false;
  const fn = firstname.value.trim();
  if (!isRequired(fn)) {
    showError(firstname, "This field is mandatory*");
  } else if (firstname.value.length < 2) {
    showError(firstname, "Please check first name");
  } else {
    showSuccess(firstname);
    valid = true;
  }
  return valid;
};

const checkLastName = (lastname) => {
  let valid = false;
  const ln = lastname.value.trim();
  if (!isRequired(ln)) {
    showError(lastname, "This field is mandatory*");
  } else if (lastname.value.length < 2) {
    showError(lastname, "Please check last name");
  } else {
    showSuccess(lastname);
    valid = true;
  }
  return valid;
};

const checkEmail = (email) => {
  let valid = false;
  const ea = email.value.trim();
  if (!isRequired(ea)) {
    showError(email, "This field is mandatory*");
  } else if (!isEmailValid(ea)) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};

const passwordChecker = (password1, password2) => {
  let valid = false;

  const p1 = password1.value.trim();
  const p2 = password2.value.trim();

  if (password1.value.length < 8) {
    showError(password1, "Password must be 8 characters or more");
    showError(password2, "Password must be 8 characters or more");
  } else if (p1.search(/[a-z]/i) < 0) {
    showError(password1, "Your password must contain at least one letter.");
  } else if (p1.search(/[0-9]/) < 0) {
    showError(password1, "Your password must contain at least one digit.");
  } else if (p1 !== p2) {
    showError(password1, "Passwords are not the same");
    showError(password2, "Passwords are not the same");
  } else {
    showSuccess(password1);
    showSuccess(password2);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isRequired = (value) => (value === "" ? false : true);

const showError = (input, message) => {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.textContent = message;
  input.style.border = "1.5px solid #EB0000";
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.textContent = "";
  input.style.border = "1.5px solid hsl(154, 59%, 51%)";
};

const validateMyForm = (
  form,
  firstname,
  lastname,
  email,
  password1,
  password2
) => {
  checkFirstName(firstname);
  checkLastName(lastname);
  checkEmail(email);
  passwordChecker(password1, password2);

  let formValid =
    checkFirstName(firstname) &&
    checkLastName(lastname) &&
    checkEmail(email) &&
    passwordChecker(password1, password2);

  // if form is valid then submit
  if (formValid) {
    form.style.display = "none";
    document.querySelector(".enquiry-form__success").style.display = "block";
  }

  const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };

  //debounce function to provide instant user feeback upon form submission
  form.addEventListener(
    "input",
    debounce(function (e) {
      switch (e.target.id) {
        case "enq-first-name":
          checkFirstName(firstname);
          break;
        case "enq-last-name":
          checkLastName(lastname);
          break;
        case "enq-email":
          checkEmail(email);
          break;
        case "enq-pw1":
          passwordChecker(password1, password2);
          break;
        case "enq-pw2":
          passwordChecker(password1, password2);
          break;
      }
    })
  );
}

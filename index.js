const COMPLETE_STATE = document.getElementById("complete-state");
const FORM = document.getElementById("card-form");

function checkValidity(field, eName) {
  const ERROR = document.getElementById(eName);
  let valid = true;
  if (field) {
    if (field.checkValidity()) {
      // CORRECT
      field.classList.remove("error");
      ERROR.innerHTML = "";
    } else {
      // WRONG
      valid = false;
      field.classList.add("error");
      if (field.value === "") {
        ERROR.innerHTML = "Can't be blank";
      } else if (field.type == "number" && field.value.includes("e")) {
        ERROR.innerHTML = "Wrong format, numbers only";
      } else if (field.min && parseInt(field.value) < parseInt(field.min)) {
        ERROR.innerHTML = "Can't be less than " + field.min;
      } else if (field.max && parseInt(field.value) > parseInt(field.max)) {
        ERROR.innerHTML = "Can't be more than " + field.max;
      }
    }
  }
  return valid;
}

function updateCard(id, value, defaultValue = "") {
  const element = document.getElementById(id);
  if (value.length == 0) {
    element.innerHTML = defaultValue;
  } else {
    element.innerHTML = value;
  }
}

function handleSubmit() {
  const FORM = document.getElementById("card-form");
  const nameCheck = checkValidity(FORM.name, "name-message");
  const numberCheck = checkValidity(FORM.number, "number-message");
  const dateMonthCheck = checkValidity(FORM.date_month, "date-month-message");
  const dateYearCheck = checkValidity(FORM.date_year, "date-year-message");
  const cvcCheck = checkValidity(FORM.cvc, "cvc-message");
  const validity =
    nameCheck && numberCheck && dateMonthCheck && dateYearCheck && cvcCheck;
  if (validity) {
    FORM.classList.add("d-none");
    COMPLETE_STATE.classList.remove("d-none");
  }
}

function handleContinue() {
  FORM.classList.remove("d-none");
  COMPLETE_STATE.classList.add("d-none");
}

function resetError(field, message) {
  field.classList.remove("error");
  document.getElementById(message).innerHTML = "";
}

function handleName(field) {
  updateCard("card-name", field.value, "Jane Appleseed");
  resetError(field, "name-message");
}

function handleNumber(field) {
  // Keep numeric values only
  value = field.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  newValue = "";
  // Add space each 4 characters
  for (var i = 0; i < value.length; i++) {
    if (i % 4 == 0 && i > 0) newValue = newValue.concat(" ");
    newValue = newValue.concat(value[i]);
  }
  field.value = newValue;
  updateCard("card-number", field.value, "1234 5678 9123 0000");
  resetError(field, "number-message");
}

function handleDateMonth(field) {
  updateCard("card-date-month", field.value, "00");
  resetError(field, "date-month-message");
}

function handleDateYear(field) {
  updateCard("card-date-year", field.value, "00");
  resetError(field, "date-year-message");
}

function handleCvc(field) {
  updateCard("card-cvc", field.value, "123");
  resetError(field, "cvc-message");
}

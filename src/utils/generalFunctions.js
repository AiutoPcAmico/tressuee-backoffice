function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertToDateIT(date) {
  if (date) {
    return new Date(date).toLocaleDateString("it-IT");
  } else {
    return "";
  }
}

export { capitalizeFirstLetter, convertToDateIT };

function sortArray(arrayToBeSorted, filtri, field, realValueName) {
  var sorting = [];
  if (filtri[field]) {
    //console.log(filtri[field]);
    sorting = arrayToBeSorted.sort((a, b) => {
      if (filtri[field] === "cre") {
        if (a[realValueName] < b[realValueName]) return -1;
        if (a[realValueName] > b[realValueName]) return 1;
        return 0;
      } else {
        if (a[realValueName] > b[realValueName]) return -1;
        if (a[realValueName] < b[realValueName]) return 1;
        return 0;
      }
    });
  } else {
    sorting = arrayToBeSorted;
  }

  //console.log({ sorting });
  return sorting;
}

function filterArray(
  arrayToBeSorted,
  filtri,
  filtriField,
  filtriValue,
  elementField,
  elementValue
) {
  const filtering = arrayToBeSorted.filter((el) => {
    if (
      filtri[filtriField] === filtriValue &&
      el[elementField] === elementValue
    ) {
      return true;
    } else return false;
  });

  //console.log({ filtering });
  return filtering;
}

export { sortArray, filterArray };
/*
const result = arrayduplicato.filter((el) => {
  if (filtri.fattiva === "tutte") {
    //?
    return true;
  }
  if (filtri.fattiva === false) {
    //se vuoto o inesistente??
    if (el.is_active === true) {
      return false;
    } else {
      return true;
    }
  } else {
    if (el.is_active === false) {
      return false;
    } else {
      return true;
    }
  }
});
*/

import { destroySession } from "../stores/sessionInfo.js";
import axios from "./axios.js";

function retrieveErrors(statusCode, data) {
  var isError = false;
  var messageError = null;

  switch (statusCode) {
    case 200:
      //request ok
      break;
    case 201:
      //created element
      break;

    case 400:
      //Bad Request
      isError = true;
      messageError =
        "Errore della piattaforma.\nNello specifico, è stata inviata una richiesta non valida.\n\nRiprova";
      break;

    case 401:
      //Unauthorized Access
      isError = true;
      messageError = "La sessione è scaduta.\nPrego, rieffettuare il login.";
      destroySession();
      break;

    case 403:
      //user not authorizated (or not found)
      isError = true;
      messageError =
        "Username o Password errati, o l'utente non è autorizzato all'accesso.\nRiprova";
      break;

    case 404:
      isError = true;
      messageError =
        "Gli elementi ricercati non sono stati trovati nel nostro sistema.\nRiprova!";
      break;

    case 409:
      isError = true;
      messageError =
        "L'utente indicato risulta già iscritto al portale.\nRiprova!";
      break;

    case 426:
      isError = true;
      messageError =
        "L'account è stato disabilitato.\nContattare il supporto Treessue";
      break;

    case 500:
      isError = true;
      messageError = "Errore del Server.\nRiprova!";
      break;

    default:
      isError = true;
      messageError =
        "Errore sconosciuto.\nContattare l'assistenza e fornire il seguente codice.\n" +
        statusCode;
      break;
  }

  return {
    isError: isError,
    messageError: messageError,
    status: statusCode,
    data: data,
  };
}

const postLogin = async (username, password) => {
  const base64encodedData = btoa(`${username}:${password}`);

  try {
    const response = await axios.post("/user-login/login", undefined, {
      headers: {
        Authorization: "Basic " + base64encodedData,
      },
    });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
};

const registerUser = async (username, name, surname, password) => {
  try {
    const response = await axios.post("/user-registration/registerCustomer", {
      email: username,
      firstName: name,
      lastName: surname,
      password: password,
    });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
};

async function retrieveAllProducts() {
  try {
    const response = await axios.get("/product/all");

    //TODO DA RIMUOVERE ASSOLULATMENTE!!!
    response.data[0].quantity = Math.floor(Math.random() * 30);
    response.data[1].quantity = Math.floor(Math.random() * 30);
    response.data[2].quantity = Math.floor(Math.random() * 30);
    response.data[3].quantity = Math.floor(Math.random() * 30);

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveSingleProduct(id) {
  try {
    const response = await axios.get("/product/id/" + id);

    //TODO DA RIMUOVERE ASSOLULATMENTE!!!
    response.data.quantity = Math.floor(Math.random() * 30);

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveAllTowers() {
  try {
    const response = await axios.get("/tower/all/public");

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}


async function retrieveSingleTower(towerId) {

  //const tower = await axios.get("/towers/id/" + towerI);
  var tower = { status: 200 };
  tower.data =
  {
    address: "Via delle gallerie 2, Cividate Camuno (BS)",
    description: "Torre di ricarica id medie dimensioni",
    id_tower: 3,
    id_user_customer: 4,
    is_public: true,
    latitude: "45.94574",
    longitude: "10.280165",
    tissue_quantity: 70,
    title: "Torre di Ricarica",
  }
  try {
    const response = tower;

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}


async function retrieveUserOrders() {
  var orders = { status: 200 };
  orders.data = [
    {
      id_order: 1,
      order_date: "Fazzoletti 10",
      order_status: "in lavorazione",
      courier_name: "poste italianeeeeeeee",
      tracking_code: 10,
      start_shipping_date: "",
      expected_delivery_date: "",
      delivery_data: "",
      original_price: 10,
      discount: 90,
      price: 1,
    },
    {
      id_order: 2,
      order_date: "Fazzoletti 200",
      order_status: "consegnato",
      courier_name: "brt",
      tracking_code: 11,
      start_shipping_date: "",
      expected_delivery_date: "",
      delivery_data: "",
      original_price: 100,
      discount: 90,
      price: 10,
    },
  ];
  try {
    const response = orders;

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveSingleOrder(orderId) {

  //const tower = await axios.get("/towers/id/" + towerI);
  var order = { status: 200 };
  order.data = 
    {
      id_order: 1,
      order_date: "Fazzoletti 10",
      order_status: "in lavorazione",
      courier_name: "poste italianeeeeeeee",
      tracking_code: 10,
      start_shipping_date: "",
      expected_delivery_date: "",
      delivery_data: "",
      original_price: 10,
      discount: 90,
      price: 1,
    }
  try {
    const response = order;

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveWorkers() {
  var workers = { status: 200 };
  workers.data = [
    {
      id_worker: 1,
      first_name: "Andrea",
      last_name: "Felappi",
      role: "ufficio",
      username: "poste italianeeeeeeee",
      password: "pass",
      is_active: true,
    },
    {
      id_worker: 2,
      first_name: "DonaKing0",
      last_name: "Anonimo",
      role: "ufficio",
      username: "poste italianeeeeeeee",
      password: "caioooo",
      is_active: true
    },
    {
      id_worker: 3,
      first_name: "yy",
      last_name: "Fazzoletti 10",
      role: "magazziniere",
      username: "poste italianeeeeeeee",
      password: "pippo",
      is_active: false,

    },
  ];
  try {
    const response = workers;

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

export {
  postLogin,
  registerUser,
  retrieveAllProducts,
  retrieveSingleProduct,
  retrieveAllTowers,
  retrieveSingleTower,
  retrieveUserOrders,
  retrieveSingleOrder,
  retrieveWorkers
};

import { destroySession, sessionInfo } from "../stores/sessionInfo.js";
import axios from "./axios.js";
import { store } from "../stores/store.js";

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

/**
 * _______________________________________________ *
 * API LOGIN:
 * Login del worker
 * _______________________________________________ *
 */

function requireTokenAuth() {
  const access =
    "Bearer " + store.getState(sessionInfo).sessionInfo.sessionToken;
  return access;
}

const postLogin = async (username, password) => {
  const base64encodedData = btoa(`${username}:${password}`);

  try {
    const response = await axios.post("/user-worker-login/login", undefined, {
      headers: {
        Authorization: "Basic " + base64encodedData,
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
};

/**
 * _______________________________________________ *
 * API CUSTOMER:
 * Registrazione, visualizza tutti e
 * visualizza dettagli singolo
 * _______________________________________________ *
 */

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

async function retrieveUsers() {
  try {
    //backOffice/getAllCustomer
    const response = await axios.get("/backOffice/getallCustomer", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveSingleUserDetails(idUser) {
  try {
    //backOffice/customerDetail/
    const response = await axios.get("/backOffice/customerDetail/" + idUser, {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

/**
 * _______________________________________________ *
 * API PRODUCTS:
 * recupero tutti i prodotti e
 * visualizza dettagli singolo, delete e update
 * _______________________________________________ *
 */

async function retrieveAllProducts() {
  try {
    const response = await axios.get("/product/all");

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveSingleProduct(id) {
  try {
    const response = await axios.get("/product/id/" + id);

    console.log({ response });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function deleteProduct(id) {
  try {
    const response = await axios.delete("/product/delete/" + id, {
      headers: { Authorization: requireTokenAuth() },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function createProduct(product) {
  console.log({ product });
  try {
    const response = await axios.post(
      "/product/create",
      {
        prod_name: product.prod_name,
        id_product_category: product.category,
        description: product.description,
        unit_price: product.unit_price,
        is_available: product.is_available,
        available_quantity: product.available_quantity,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function modifyProduct(product) {
  try {
    const response = await axios.put(
      "/product/update/" + product.id_product,
      {
        prod_name: product.prod_name,
        id_product_category: product.category,
        description: product.description,
        unit_price: product.unit_price,
        is_available: product.is_available,
        available_quantity: product.available_quantity,
      },
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log(e);
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function getAllCategories() {
  try {
    const response = await axios.get("/product-category/all", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

/**
 * _______________________________________________ *
 * API TOWERS:
 * Aggiunta, visualizza tutti, solo pubblici e
 * visualizza dettagli singolo
 * _______________________________________________ *
 */

async function retrieveAllTowers() {
  try {
    const response = await axios.get("/tower/all", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveAllTowersPublicForMap() {
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
  tower.data = {
    address: "Via delle gallerie 2, Cividate Camuno (BS)",
    description: "Torre di ricarica id medie dimensioni",
    id_tower: 3,
    id_user_customer: 4,
    is_public: true,
    latitude: "45.94574",
    longitude: "10.280165",
    tissue_quantity: 70,
    title: "Torre di Ricarica",
  };
  try {
    const response = tower;

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function createTower(tower) {
  try {
    const response = await axios.post(
      "tower/create",
      {
        id_user_customer: tower.id_user_customer,
        is_public: tower.is_public,
        description: tower.description,
        address: tower.address,
        latitude: tower.latitude,
        longitude: tower.longitude,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

/**
 * _______________________________________________ *
 * API ORDERS:
 * Visualizza tutti ordini e dettaglio singolo
 * _______________________________________________ *
 */

async function retrieveAllOrders() {
  try {
    const response = await axios.get("backOffice/getAllRole", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function retrieveSingleOrder(orderId) {
  //const tower = await axios.get("/towers/id/" + towerI);
  var order = { status: 200 };
  order.data = {
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
  };
  try {
    const response = order;

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

/**
 * _______________________________________________ *
 * API WORKERS:
 * Aggiunta, visualizza tutti e
 * visualizza dettagli singolo.
 * Modifica ed elimina
 *
 * Role: Lettura di tutti
 *
 * _______________________________________________ *
 */

async function retrieveWorkers() {
  try {
    //const response = workers;
    const response = await axios.get("/backOffice/getAllWorker", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveWorkerDetails(idWorker) {
  //const tower = await axios.get("/workers/id/" + towerI);

  try {
    const response = await axios.get("backOffice/workerDetail/" + idWorker, {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function getAllRoles() {
  try {
    const response = await axios.get("backOffice/getAllRole", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function deleteWorker(idWorker) {
  try {
    const response = await axios.delete("backOffice/deleteWorker/" + idWorker, {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function createWorker(worker) {
  try {
    const response = await axios.post(
      "backOffice/createWorker",
      {
        first_name: worker.first_name,
        last_name: worker.last_name,
        email: worker.email,
        password: worker.password,
        role: worker.role,
        state: worker.state,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

//backOffice/modifyUserWorkerDetail/:id
async function modifyWorker(worker) {
  try {
    const response = await axios.put(
      "backOffice/modifyUserWorkerDetail/" + worker.id,
      {
        first_name: worker.first_name,
        last_name: worker.last_name,
        email: worker.email,
        password: worker.password,
        role: worker.role,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

export {
  postLogin,
  registerUser,
  retrieveUsers,
  retrieveSingleUserDetails,
  retrieveAllProducts,
  retrieveSingleProduct,
  deleteProduct,
  getAllCategories,
  retrieveAllTowers,
  retrieveAllTowersPublicForMap,
  retrieveSingleTower,
  createTower,
  retrieveAllOrders,
  retrieveSingleOrder,
  retrieveWorkers,
  retrieveWorkerDetails,
  getAllRoles,
  deleteWorker,
  createWorker,
  modifyWorker,
  createProduct,
  modifyProduct,
};

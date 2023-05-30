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

async function retrieveUsers() {
  try {
    //backOffice/getAllCustomer
    const response = await axios.get("/backOfficeCustomer/getallCustomer", {
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
    const response = await axios.get(
      "/backOfficeCustomer/customerDetail/" + idUser,
      {
        headers: { Authorization: requireTokenAuth() },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

//create
//modify    put   user-customer/modifyUserDetail noppp
//backOffice/modifyUserCustomerDetail
async function modifyUser(user) {
  try {
    console.log(user);
    const response = await axios.put(
      //non funziona e non va bene!!!
      "/backOfficeLogin/modifyUserCustomerDetail/" + user.id,
      {
        //id: user.id,
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        address: user.address,
        birth_date: user.birth_date, //data gg-mm-aaaa
        zip_code: user.zip_code,
        city: user.city,
        province: user.province,
        is_active: user.is_active,
        country: null,
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

async function createUser(user) {
  try {
    //backOfficeCustomer/registerCustomer

    const response = await axios.post(
      "/backOfficeCustomer/registerCustomer",
      {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        address: user.address,
        birth_date: user.birth_date, //data gg-mm-aaaa
        zip_code: user.zip_code,
        city: user.city,
        province: user.province,
        is_active: user.is_active,
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

//backOfficeLogin/delete/:id
async function deleteUser(idUser) {
  try {
    const response = await axios.delete(
      "/backOfficeLogin/deleteUser/" + idUser,
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );

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
  //const tower =
  /*var tower = { status: 200 };
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
  };*/
  try {
    const response = await axios.get("/tower/id/" + towerId, {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function createTower(tower) {
  console.log(tower);
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
        title: tower.title,
        tissue_quantity: tower.tissue_quantity,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );
    console.log(response);
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function modifyTower(tower) {
  try {
    const response = await axios.put(
      //tower/update/{id-tower}
      "/tower/update/" + tower.id_tower,
      {
        title: tower.title,
        address: tower.address,
        description: tower.description,
        id_user_customer: tower.id_user_customer,
        is_public: tower.is_public,
        tissue_quantity: tower.tissue_quantity,
        latitude: tower.latitude,
        longitude: tower.longitude,
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

//tower/delete/{id-tower}

async function deleteTower(idTower) {
  try {
    const response = await axios.delete("tower/delete/" + idTower, {
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
 * API ORDERS:
 * Visualizza tutti ordini e dettaglio singolo
 * Crea e modifica ordine
 * _______________________________________________ *
 */
async function retrieveAllOrders() {
  ///???????

  try {
    const response = await axios.get("backOfficeOrder/getAllOrder", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });

    return retrieveErrors(response.status, response.data.result);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function retrieveSingleOrder(orderId) {
  const response = await axios.get("/backOfficeOrder/getOrderById/" + orderId, {
    headers: {
      Authorization: requireTokenAuth(),
    },
  });

  try {
    return retrieveErrors(response.status, response.data.result);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function createOrder(order) {
  try {
    const response = await axios.post(
      "backOffice/createOrder",
      {
        courier_name: order.courier_name,
        id_user_customer: order.id_user_customer,
        cart: order.products,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );
    console.log(response);
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

//backOfficeOrder/update/{id-order}
async function modifyOrder(order) {
  try {
    const response = await axios.put(
      "backOfficeOrder/update/" + order.id_order,
      {
        courier_name: order.courier_name,
        id_user_customer: parseInt(order.id_user_customer),
        id_order_status: order.status,
      },
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );
    console.log(response);
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
  }
}

async function getStatus() {
  try {
    const response = await axios.get("order-status/all", {
      headers: {
        Authorization: requireTokenAuth(),
      },
    });
    console.log(response);
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data);
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
    const response = await axios.get("/backOfficeWorker/getAllWorker", {
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
    const response = await axios.get(
      "backOfficeWorker/workerDetail/" + idWorker,
      {
        headers: {
          Authorization: requireTokenAuth(),
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

async function getAllRoles() {
  try {
    const response = await axios.get("backOfficeRole/getAllRole", {
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
    const response = await axios.delete(
      "backOfficeWorker/deleteWorker/" + idWorker,
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

async function createWorker(worker) {
  try {
    const response = await axios.post(
      "backOfficeWorker/createWorker",
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
      "backOfficeWorker/modifyUserWorkerDetail/" + worker.id,
      {
        first_name: worker.first_name,
        last_name: worker.last_name,
        email: worker.email,
        password: worker.password,
        role: worker.role,
        is_active: worker.is_active,
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
  retrieveUsers,
  modifyUser,
  createUser,
  retrieveSingleUserDetails,
  deleteUser,
  retrieveAllProducts,
  retrieveSingleProduct,
  deleteProduct,
  getAllCategories,
  retrieveAllTowers,
  retrieveAllTowersPublicForMap,
  retrieveSingleTower,
  createTower,
  modifyTower,
  deleteTower,
  retrieveAllOrders,
  retrieveSingleOrder,
  createOrder,
  modifyOrder,
  getStatus,
  retrieveWorkers,
  retrieveWorkerDetails,
  getAllRoles,
  deleteWorker,
  createWorker,
  modifyWorker,
  createProduct,
  modifyProduct,
};

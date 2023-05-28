registercustomer non funziona
manca la delete user (specifica per backoffice) -> isactive false
nella crea worker ci sono problemi sul campo nome che vlidazione avete fatto? (errore 500)
le api ures e worker e orders rispondono anche con ruolo sbagliato

modificata get allorder in get all roles???     -> xke non abbiamo api

# Appunti To-Do

## prossimamente

floating input

pulsante toggle sidebar fisso sotto navbar  con schermo piccolo e navbar aperta

in account password non obbligatoria -> se cambia richiedere password vecchia -> db controlla

gesdtire meglio quantita aggiunte al carrello se superano la quantita in magazzino

eventuale lista dei filtri

paginazione per torri ordinie ecc

cambio o elimina? id new mod pages tutte

quando modificata password user nei dettagli richiedere conferma vecchia password

in tendina ruoli ci serve chiamata che restituisca tutti i ruoli dipendenti

controllo pulsanti modifica e elimina l'abbiamo fatto solo in workers tanto negli altri casi se vedi puoi anche modificare/creare

## Strumenti utilizzabili per il deployment

aggiungere in lista torri pulsante visualizza mappa

vercel (per online)

github student

PRODUCTS

Tipo    GET
Link
<https://backend-treessue.vercel.app/product/all>
Descrizione
Endpoint per prendere tutta la lista di prodotti disponibili.

Tipo    GET
Link
<https://backend-treessue.vercel.app/product/id/{id-product}>
Descrizione
Endpoint per prendere un prodotto in base al suo ID. Sostituire {id-product} con il valore desiderato.

CART

Tipo    GET
Link
<https://backend-treessue.vercel.app/cart-detail/customer>
Descrizione
Endpoint per ricevere la lista dei prodotti presenti nel carrello di un customer. L’utente viene determinato attraverso il JWT token passato nel header.

Tipo    POST
Link
<https://backend-treessue.vercel.app/cart-detail/add>
Descrizione
Endpoint per aggiungere un prodotto al carrello. Passare nel body i campi:
idProduct: number
quantity: number

Tipo    DELETE
Link
<https://backend-treessue.vercel.app/cart-detail/delete-item>
Descrizione
Endpoint per eliminare completamente un prodotto del carrello. Passare nel body i campi:
idCartDetail: number

## acnhe -numero?

Tipo    UPDATE
Link
<https://backend-treessue.vercel.app/cart-detail/change-quantity>
Descrizione
Endpoint per aggiornare la quantità di un prodotto presente nel carrello. Passare nel body i campi:
idCartDetail: number
newQuantity: number

## login pubblico

USER-LOGIN

Tipo    POST
Link
<https://backend-treessue.vercel.app/user-login/login>
Descrizione
Endpoint per  loggarsi. Passare nel headers i campi:
api-key: string
Authorization: base64 string with email:password

## register utente pubblico

Tipo    POST
Link
<https://backend-treessue.vercel.app/user-registration/registerCustomer>
Descrizione
Endpoint per registrarsi.
Passare nel headers i campi:
api-key: string
Passare nel body i campi:

firstName: string
lastName: string
birthDate: string dd-mm-yyyy
phoneNumber: number
email: string
country: string
province: string
address: string
password: string

## ??

Tipo    DELETE
Link
<https://backend-treessue.vercel.app/user-login/delete>
Descrizione
Endpoint per disattivare un utente. -> cambia solo il isattivo
Passare nel headers i campi:
api-key: string
Authorization: string (token che ritorna la login)

## cambio password

Tipo    PUT
Link
<https://backend-treessue.vercel.app/user-login/updateCredentials>
Descrizione
Endpoint per modificare le informazioni del’utente (solo password).
Passare nel headers i campi:
api-key: string
Authorization: string (token che ritorna la login)
Passare nel body:
newPassword: string

## USER-CUSTOMER

Tipo    PUT
Link
<https://backend-treessue.vercel.app/user-customer/modifyUserInfo>
Descrizione
Endpoint per modificare i dettagli dell’utente.
Passare nel headers i campi:
api-key: string
Authorization: string (token che ritorna la login)
Passare nel body:
firstName: string
lastName: string
birthDate: string
phoneNumber: number
country: string
province: string
zipCode: number
address: string

BACKOFFICE

Tipo    POST
Link
<https://backend-treessue.vercel.app/backOffice/createWorker>
Descrizione
Endpoint per inserire un nuovo lavoratore.
Passare nel headers i campi:
api-key: string
Passare nel body:

firstName: string
lastName: string
email: string
password: string
role:string

## NON USATELO AL MOMENTO VISTO CHE CE LA COSA CHE SPACCA

Tipo    GET
Link
<https://backend-treessue.vercel.app/backOffice/getAllCustomer>
Descrizione
Endpoint per ottenere la lista di tutti i clienti.
Passare nel headers i campi:
api-key: string

## customerDetail : MODIFICARE

Tipo    GET
Link
<https://backend-treessue.vercel.app/backOffice/customerDetail/:id>?
Descrizione
Endpoint per ottenere i dettagli di un cliente.
Passare nel headers i campi:
api-key: string
nel body mi passate:
email
firstName
lastName

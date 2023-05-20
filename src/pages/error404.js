function Error404() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Oops!</span> Si è verificato un errore :
          {"("}
        </p>
        <p className="lead">La pagina cercata non esiste!.</p>
        <a href="/towers" className="btn btn-primary">
          Torna al sito -- dipende dal ruolo abbimo una pagina comune che non sia login?
        </a>
      </div>
    </div>
  );
}

export { Error404 };

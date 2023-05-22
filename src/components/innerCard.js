import "./components.css";

function InnerCard({ title, description, i, w }) {
  return (
    <div>
      {i === -1 && (
        <div className="card-body p-1 row" style={{ maxHeight: "50vh" }}>
          <p className="card-title col-12 ">
            <b>{title}</b>
          </p>
        </div>
      )}
      {i !== -1 && (
        <div className="card-body p-1 row" style={{ maxHeight: "50vh" }}>
          {w < 1199 && (
            <p className="card-title col-12 ">
              <b>{title}</b>
            </p>
          )}
          <p className="card-text col-12 text-truncate-container small m-0">
            {description ? description : "-"}
          </p>
        </div>
      )}
    </div>
  );
}

export { InnerCard };

import "./components.css";



function InnerCard({ title, description }) {


  return (
    <div className="card-body p-1 row">
            <p className="card-title col-12">{title}</p>
            <p className="card-text col-12">
              {description}
            </p>
          </div>
  );
}

export { InnerCard };

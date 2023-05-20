import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./components.css";
import "leaflet/dist/leaflet.css";
import { memo, useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const GetMyLocation = memo(() => {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);
  return <></>;
});

function RenderingWithHooks({ position }) {
  const map = useMap();
  useEffect(() => {
    console.log({ position });
    if (position && position?.latitude && position?.longitude) {
      map.flyTo([position.latitude, position.longitude], 15);
    }
  }, [map, position]);
}

function LeafletMap({ positions, isFixed, positionSelected }) {
  const [styled, setStyled] = useState("maprelative");
  //console.log({ isFixed });

  useEffect(() => {
    //console.log(isFixed === "hidden" ? "maprelative" : "mapfixed");
    setStyled(isFixed === "hidden" ? "maprelative" : "mapfixed");
  }, [isFixed]);

  return (
    <div className={styled}>
      <MapContainer
        className="map"
        center={[positions[0].latitude, positions[0].longitude]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <RenderingWithHooks position={positionSelected}></RenderingWithHooks>

        <GetMyLocation></GetMyLocation>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((location) => {
          //console.log(location.latitude, location.longitude);
          return (
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                <b>{location.title}</b> <br /> <i>{location.address}</i>
                <br></br>
                <br></br>
                {location.description}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export { LeafletMap };

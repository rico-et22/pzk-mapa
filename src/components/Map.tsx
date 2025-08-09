import { cn } from "@/lib/utils";
import { useLocations } from "@/providers/LocationsProvider";
import { divIcon } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

const Map = () => {
  const { locations } = useLocations();

  return (
    <MapContainer
      center={[52, 20]}
      zoom={7}
      scrollWheelZoom
      style={{ height: "100vh", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {locations.map((item, index) => (
        <Marker
          icon={divIcon({
            className: cn("size-7! rounded-full -ml-3.5!", {
              "bg-pzk-blue": item["Kategoria"] === "Klub terenowy PZK",
              "bg-pzk-yellow": item["Kategoria"] === "Oddział terenowy PZK",
            }),
          })}
          key={index}
          position={[item.Latitude, item.Longitude]}
        >
          <Popup>
            <p className={cn("font-bold mb-0! text-center mt-0!", {
              "text-pzk-blue": item["Kategoria"] === "Klub terenowy PZK",
              "text-pzk-yellow": item["Kategoria"] === "Oddział terenowy PZK",
            })}>
              {item["Kategoria"]}
            </p>
            {item["Kategoria"] === "Klub terenowy PZK" && (
              <p
                className={
                  "text-3xl uppercase font-black mt-1! mb-0! text-center text-pzk-blue"
                }
              >
                {item["W przypadku klubu znak"].replaceAll(";", " & ")}
              </p>
            )}
            {item["Kategoria"] === "Oddział terenowy PZK" && (
              <p className="text-2xl uppercase font-black mt-1! mb-0! text-center text-pzk-yellow">
                {item["Oddział terenowy"]}
              </p>
            )}
            {
              <p className="text-sm mt-1! mb-0! text-center">
                {item["Miejsce spotkań"]}
              </p>
            }
            {(item["Wskazówki dojazdu"] ||
              item["Specjalizacja"] ||
              item["Termin spotkań"]) && <hr className="mb-2 mt-3" />}
            {item["Wskazówki dojazdu"] && (
              <p className="text-sm mt-1! mb-0!">
                <strong>Wskazówki:</strong> {item["Wskazówki dojazdu"]}
              </p>
            )}
            {item["Specjalizacja"] && (
              <p className="text-sm mt-1! mb-0!">
                <strong>Specjalizacja:</strong>{" "}
                {item["Specjalizacja"]
                  .replaceAll(";", ", ")
                  .replace(/,\s*$/, "")}
              </p>
            )}
            {item["Termin spotkań"] && (
              <p className="text-sm mt-1! mb-0!">
                <strong>Termin spotkań:</strong> {item["Termin spotkań"]}
              </p>
            )}
            {(item["Adres korespondencyjny"] ||
              item["Dane kontaktowe "] ||
              item["Konto bankowe"] ||
              item["Osobowość prawna"]) && <hr className="mb-2 mt-3" />}
            {item["Adres korespondencyjny"] && (
              <p className="text-sm mt-1! mb-0!">
                <strong>Adres korespondencyjny:</strong>{" "}
                {item["Adres korespondencyjny"]}
              </p>
            )}
            {item["Dane kontaktowe "] && (
              <p className="text-sm mt-1! mb-0!">
                <strong>Dane kontaktowe:</strong> {item["Dane kontaktowe "]}
              </p>
            )}
            {item["Konto bankowe"] && (
              <p className="text-sm mt-1! mb-0!">
                <strong>Konto bankowe:</strong> {item["Konto bankowe"]}
              </p>
            )}
            {item["Osobowość prawna"] && (
              <p className="text-sm mt-1! mb-0!">
                <strong>Osobowość prawna:</strong> {item["Osobowość prawna"]}
              </p>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

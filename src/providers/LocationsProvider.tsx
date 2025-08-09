import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { readRemoteFile } from "react-papaparse";

interface DataItem {
  "Adres korespondencyjny": string;
  "Dane kontaktowe ": string;
  Kategoria: string;
  "Kolor markera": string;
  "Konto bankowe": string;
  Latitude: number;
  Longitude: number;
  "Miejsce spotkań": string;
  "Oddział terenowy": string;
  "Osobowość prawna": string;
  Specjalizacja: string;
  "Termin spotkań": string;
  "W przypadku klubu znak": string;
  "Wskazówki dojazdu": string;
}

interface LocationsContextType {
  locations: DataItem[];
  loading: boolean;
  error: string | null;
}

const LocationsContext = createContext<LocationsContextType | undefined>(
  undefined
);

interface LocationsProviderProps {
  children: ReactNode;
}

export const LocationsProvider: React.FC<LocationsProviderProps> = ({
  children,
}) => {
  const [locations, setLocations] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    readRemoteFile("./data.csv", {
      complete: (results) => {
        const processedData = results.data.map((item) => {
          const processedItem: DataItem = {
            "Adres korespondencyjny": "",
            "Dane kontaktowe ": "",
            Kategoria: "",
            "Kolor markera": "",
            "Konto bankowe": "",
            Latitude: 0,
            Longitude: 0,
            "Miejsce spotkań": "",
            "Oddział terenowy": "",
            "Osobowość prawna": "",
            Specjalizacja: "",
            "Termin spotkań": "",
            "W przypadku klubu znak": "",
            "Wskazówki dojazdu": "",
          };
          for (const [key, value] of Object.entries(item as DataItem)) {
            const typedKey = key as keyof DataItem;
            if (typedKey === "Latitude" || typedKey === "Longitude") {
              (processedItem as DataItem)[typedKey] =
                value === "-" ? 0 : Number(value);
            } else {
              (processedItem as DataItem)[typedKey] =
                value === "-" ? "" : value;
            }
          }
          return processedItem;
        });
        setLocations(processedData as DataItem[]);
        setLoading(false);
      },
      error: (error) => {
        setError(error.message);
        setLoading(false);
      },
      download: true,
      header: true,
    });
  }, []);

  return (
    <LocationsContext.Provider value={{ locations, loading, error }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (context === undefined) {
    throw new Error("useLocations must be used within a LocationsProvider");
  }
  return context;
};

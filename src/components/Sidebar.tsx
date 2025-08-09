import React from "react";
import { Button } from "./ui/button";
import { ArrowDownFromLine, ArrowUpFromLine, OctagonXIcon } from "lucide-react";
import pzkLogo from "../assets/Logo_PZK.svg";
import { Badge } from "./ui/badge";
import { useLocations } from "@/providers/LocationsProvider";

interface SidebarProps {
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle?.();
  };

  const { locations, loading, error } = useLocations();
  const clubs = locations.filter(
    (location) => location.Kategoria === "Klub terenowy PZK"
  );
  const divisions = locations.filter(
    (location) => location.Kategoria === "Oddział terenowy PZK"
  );

  return (
    <>
      <div className="fixed top-4 left-4 bg-white shadow-lg z-4000 rounded-lg w-[calc(100%-32px)] sm:w-84">
        <div className="flex items-center p-2 rounded-t-lg">
          <img src={pzkLogo} alt="PZK Logo" className="size-15" />
          <h2 className="text-lg font-black mr-2">Mapa lokalizacji</h2>
          <Badge variant="outline">beta</Badge>
          <Button
            variant="ghost"
            onClick={handleToggle}
            aria-label="Menu"
            className="ml-auto [&_svg]:size-6!"
            size="icon"
          >
            {isOpen ? <ArrowUpFromLine /> : <ArrowDownFromLine />}
          </Button>
        </div>

        {isOpen && (
          <div className="p-4 pt-2 flex flex-col gap-4">
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-pzk-blue mx-auto"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Ładowanie...</span>
              </div>
            )}
            {error && (
              <div className="flex flex-col gap-3 text-red-500 items-center">
                <OctagonXIcon /> Błąd ładowania danych
              </div>
            )}
            {!loading && !error && (
              <>
                <div className="flex items-center gap-3 pl-1.5">
                  <div className="size-10 rounded-full bg-pzk-blue flex items-center justify-center text-white">
                    <span>{clubs.length}</span>
                  </div>
                  <p className="font-semibold">Kluby terenowe PZK</p>
                </div>
                <div className="flex items-center gap-3 pl-1.5">
                  <div className="size-10 rounded-full bg-pzk-yellow flex items-center justify-center">
                    <span>{divisions.length}</span>
                  </div>
                  <p className="font-semibold">Oddziały terenowe PZK</p>
                </div>
              </>
            )}
            <div className="text-[9px] text-center mt-2 sm:mt-6">
              <p>
                Frontend made with ❤️+📻 by{" "}
                <a
                  href="https://qrz.com/db/so8kp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Kamil SO8KP
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/rico-et22/pzk-mapa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;

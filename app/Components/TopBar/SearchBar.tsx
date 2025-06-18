// SearchBar.tsx
import { useGlobalContextProvider } from "../../contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";

export default function SearchBar() {
  const { isDark } = useGlobalContextProvider();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-[240px] sm:w-[300px] flex gap-2 items-center border p-2 rounded-md">
      <FontAwesomeIcon
        icon={faSearch}
        height={16}
        width={16}
        className={`${isDark ? "text-white" : "text-gray-500"}`}
      />
      <input className={`outline-none text-sm w-full ${
          isDark ? " text-white" : " text-black"}`}
        ref={inputRef}
        placeholder="Cerca..."
        
      />
    </div>
  );
}

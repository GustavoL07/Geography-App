import "./SearchResults.css";
import { useEffect, useRef } from "react";

type Props<T> = {
  onLoseFocus: () => void;
  displayableOptions: T[];
  optionsCallback: (option: T, index: number) => React.ReactNode;
};
export default function SearchResults<T>({
  onLoseFocus,
  displayableOptions,
  optionsCallback,
}: Props<T>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onLoseFocus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onLoseFocus]);

  return (
    <div className="search-results-wrapper" ref={wrapperRef}>
      <div className="search-results">
        {displayableOptions.length !== 0 ? (
          displayableOptions.map(optionsCallback)
        ) : (
          <p>No results.</p>
        )}
      </div>
    </div>
  );
}

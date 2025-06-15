import "./CompareCountry.css";
import { Country } from "@/types";
import { useState } from "react";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import Search from "@/components/Custom/CustomSearch/Search";
import SearchResults from "@/components/Custom/CustomSearchResult/SearchResuts";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";

type Props = {title?: string};
export default function CompareCountry({title = "Compare Countries"}: Props) {
  const { countryList, setSelectedCountry } = useCountryContext();
  const { setDisplayMode } = useSettingsContext();
  const [searchValue, setSearchValue] = useState("");
  const [comparing, setComparing] = useState<[Country | null, Country | null]>([null, null]);

  const addCompareCountry = (newCountry: Country) =>
    setComparing(([first, second]) => {
      if (
        first?.name.informal === newCountry.name.informal ||
        second?.name.informal === newCountry.name.informal
      ) {
        return [first, second];
      }
      return [second, newCountry];
    });
  const resetCompareCountry = () => setComparing([null, null]);
  const goToCountry = (c: Country) => {
    setSelectedCountry(c);
    setDisplayMode("full");
  };

  const filteredByName = countryList
    .filter((c) => c.name.informal.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => a.name.informal.toLowerCase().localeCompare(b.name.informal.toLowerCase()));

  return (
    <>
      <div className="compare-wrapper">
        <p className="compare-title">{title}</p>

        <div className="search-area">
          <Search
            value={searchValue}
            onSearch={setSearchValue}
            resetSearch={() => {
              setSearchValue("");
              resetCompareCountry();
            }}
          />
        </div>
        {searchValue && (
          <SearchResults
            displayableOptions={filteredByName}
            optionsCallback={(c, index) => (
              <div
                key={index}
                className="filtered-options"
                onClick={() => {
                  addCompareCountry(c);
                  setSearchValue("");
                }}
              >
                <img src={c.flag} alt="" />
                <p>{c.getFormatted("name")}</p>
              </div>
            )}
            onLoseFocus={() => setSearchValue("")}
          />
        )}

        <div className="selected-options">
          {comparing[0] !== null && (
            <BeingCompared c={comparing[0]} onClick={() => goToCountry(comparing[0]!)} />
          )}
          {comparing[1] !== null && (
            <BeingCompared c={comparing[1]} onClick={() => goToCountry(comparing[1]!)} />
          )}
        </div>
      </div>
    </>
  );
}

type BeingComparedProps = {
  c: Country;
  onClick: () => void;
};
function BeingCompared({ c, onClick }: BeingComparedProps) {
  return (
    <div className="filtered-options" onClick={onClick}>
      <img src={c.flag} alt="" />
      <p>{c.name.symbol}</p>
    </div>
  );
}

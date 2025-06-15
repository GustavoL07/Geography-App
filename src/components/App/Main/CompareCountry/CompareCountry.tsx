import { useCountryContext } from "@/components/Contexts/CountryContext";
import Search from "../../Sidebar/Inputs/Search/Search";
import "./CompareCountry.css";
import { useState } from "react";
import Results from "../../Sidebar/Results/Results";
import { Country } from "@/types";

type Props = {};
export default function CompareCountry({}: Props) {
  const { countryList } = useCountryContext();
  const [searchValue, setSearchValue] = useState("");
  const [comparing, setComparing] = useState<[Country | null, Country | null]>([null, null]);
  const addCompareCountry = (newCountry: Country) =>
    setComparing(([first, second]) => [second, newCountry]);

  const filteredByName = countryList.filter((c) =>
    c.name.informal.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="compare-wrapper">
        <div className="selected-options">
          <div className="filtered-option">
            <p>{comparing[0]?.getFormatted("name")}</p>
          </div>
          <p>{comparing[1]?.getFormatted("name")}</p>
        </div>
        <div className="search-area">
          <Search
            value={searchValue}
            onSearch={setSearchValue}
            resetSearch={() => setSearchValue("")}
          />
        </div>
        {searchValue && (
          <div className="compare-options-wrapper">
            {filteredByName.length !== 0 ? (
              filteredByName.map((c: any, index: number) => (
                <div key={index} className="filtered-options" onClick={() => addCompareCountry(c)}>
                  <img src={c.flag} />
                  <p>{c.getFormatted("name")}</p>
                </div>
              ))
            ) : (
              <div className="options-results">
                <Results />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

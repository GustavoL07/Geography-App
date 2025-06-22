import "./CompareCountry.css";
import { Country } from "@/types";
import { useState } from "react";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import Search from "@/components/Custom/Search/Search";
import SearchResults from "@/components/Custom/SearchResult/SearchResuts";
import Overview from "../FullCountry/Overview/Overview";
import InfoBox from "../FullCountry/InfoBox/InfoBox";
import { FormatOptions } from "@/utils/Organizing/formatter";
import Title from "@/components/Custom/Title/Title";

type Props = { title?: string };
export default function CompareCountry({ title = "Compare Countries" }: Props) {
  const { countryList } = useCountryContext();
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

  const filteredByName = countryList
    .filter((c) => c.name.informal.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => a.name.informal.toLowerCase().localeCompare(b.name.informal.toLowerCase()));

  return (
    <>
      <div className="compare-wrapper">
        <Title title={title} />

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
                className={`filtered-options ${
                  c.name.symbol === comparing[0]?.name.symbol ||
                  c.name.symbol === comparing[1]?.name.symbol
                    ? "comparing"
                    : ""
                }`}
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
          {comparing[0] !== null && <BeingCompared c={comparing[0]} />}
          {comparing[1] !== null && <BeingCompared c={comparing[1]} />}
        </div>
      </div>
    </>
  );
}

type BeingComparedProps = {
  c: Country;
};
function BeingCompared({ c }: BeingComparedProps) {
  return (
    <div className="being-compared">
      <Overview country={c}></Overview>
      <section className="info-grid">
        {FormatOptions.map((obj, index) => {
          if (obj.key === "name") return null;

          return <InfoBox key={index} text={`${obj.text}:`} value={c.getFormatted(obj.key)} />;
        })}
      </section>
    </div>
  );
}

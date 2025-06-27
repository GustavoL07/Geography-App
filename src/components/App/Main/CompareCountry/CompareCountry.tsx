import "./CompareCountry.css";
import { Country, CountryList } from "@/types";
import { useState } from "react";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import Search from "@/components/Custom/Search/Search";
import SearchResults from "@/components/Custom/SearchResult/SearchResuts";
import Overview from "../FullCountry/Overview/Overview";
import InfoBox from "../FullCountry/InfoBox/InfoBox";
import { FormatOptions } from "@/utils/Organizing/formatter";
import Title from "@/components/Custom/Title/Title";
import Map from "../FullCountry/Map/Map";
import Button from "@/components/Custom/Button/Button";

type Props = { title?: string };
export default function CompareCountry({ title = "Compare Countries" }: Props) {
  const { countryList } = useCountryContext();
  const [showInfo, setShowInfo] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [comparing, setComparing] = useState<CountryList>([]);

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
  const resetCompareCountry = () => setComparing([]);
  const twoBeingCompared = () => comparing[0] && comparing[1];
  function getMapCenter(): [number, number] {
    const lat1 = comparing[0].geography.position.latitude;
    const lng1 = comparing[0].geography.position.longitude;
    const lat2 = comparing[1].geography.position.latitude;
    const lng2 = comparing[1].geography.position.longitude;

    return [(lat1 + lat2) * 0.5, (lng1 + lng2) * 0.5];
  }

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
            }}
          />
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
          {comparing[1] && (
            <div className="controls-area">
              <Button
                icon={<i className="fa-solid fa-info"></i>}
                onClick={() => setShowInfo(!showInfo)}
              />
              {twoBeingCompared() && (
                <Button
                  icon={<i className="fa-solid fa-map-location-dot"></i>}
                  onClick={() => setShowMap(!showMap)}
                />
              )}
              <Button
                icon={<i className="fa-solid fa-xmark close-icon"></i>}
                onClick={() => resetCompareCountry()}
              />
            </div>
          )}
        </div>

        <div className="selected-options">
          {comparing[0] !== null && <BeingCompared c={comparing[0]} showInfo={showInfo} />}
          {comparing[1] !== null && <BeingCompared c={comparing[1]} showInfo={showInfo} />}
        </div>
        {comparing[0] && comparing[1] && showMap && (
          <Map toDisplay={[comparing[0], comparing[1]]} center={getMapCenter()} zoom={2} />
        )}
      </div>
    </>
  );
}

type BeingComparedProps = {
  c: Country;
  showInfo: boolean;
};
function BeingCompared({ c, showInfo }: BeingComparedProps) {
  if (!c) return;
  return (
    <div className="being-compared">
      <Overview country={c}></Overview>
      {showInfo && (
        <section className="info-grid">
          {FormatOptions.map((obj, index) => {
            if (obj.key === "name") return null;
            return <InfoBox key={index} text={`${obj.text}:`} value={c.getFormatted(obj.key)} />;
          })}
        </section>
      )}
    </div>
  );
}

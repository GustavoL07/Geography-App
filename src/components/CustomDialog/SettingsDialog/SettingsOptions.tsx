import { CountryContext, FilterKey, useCountryContext } from "../../Contexts/CountryContext";
import "./SettingsOptions.css";

export default function SettingsOptions({}) {
  const { filterBy, setFilterBy } = useCountryContext();
  return (
    <div>
      <div className="option-wrapper">
        <p className="title">Search Countries By</p>

        <div className="option">
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(e) => changeFilter(e, filterBy, setFilterBy, "capital")}
          />
          <p>Capital</p>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(e) => changeFilter(e, filterBy, setFilterBy, "continent")}
          />
          <p>Continent</p>
        </div>

        <div className="option">
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(e) => changeFilter(e, filterBy, setFilterBy, "iso3")}
          />
          <p>Symbol</p>
        </div>

      </div>
    </div>
  );
}

function changeFilter(
  e: React.ChangeEvent<HTMLInputElement>,
  filterBy: CountryContext["filterBy"],
  setFilterBy: CountryContext["setFilterBy"],
  key: FilterKey,
) {
  const checked = e.target.checked;
  checked
    ? setFilterBy([...filterBy, key])
    : setFilterBy(filterBy.filter((key) => key !== key));
}

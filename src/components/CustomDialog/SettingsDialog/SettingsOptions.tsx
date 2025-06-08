import { useSettingsContext } from "../../Contexts/SettingsContext";
import { FilterKey } from "@/types";
import { SettingsContextInterface } from "@/types";
import "./SettingsOptions.css";

export default function SettingsOptions({}) {
  const { filterBy, setFilterBy } = useSettingsContext();
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
      <div className="option-wrapper">
        <p className="title">Maps</p>

        <div className="option">
          <select name="" id="">
            <option value="">Light</option>
            <option value="">Dark</option>
            <option value="">Earth</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function changeFilter(
  e: React.ChangeEvent<HTMLInputElement>,
  filterBy: SettingsContextInterface["filterBy"],
  setFilterBy: SettingsContextInterface["setFilterBy"],
  key: FilterKey
) {
  const checked = e.target.checked;
  checked ? setFilterBy([...filterBy, key]) : setFilterBy(filterBy.filter((key) => key !== key));
}

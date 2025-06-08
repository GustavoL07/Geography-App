import "./SettingsOptions.css";
import { useSettingsContext } from "../../Contexts/SettingsContext";
import { FilterKey, MapTileKey } from "@/types";
import Button from "@/components/CustomButton/Button";
import { clearLocalStorage } from "@/components/Hooks/useLocalStorage";

type Props = {
  description: string;
  filterKey: FilterKey;
};
function Checkbox({ description, filterKey }: Props) {
  const { filterBy, setFilterBy } = useSettingsContext();

  function changeFilter(e: boolean, key: FilterKey) {
    const checked = e;
    if (checked) {
      if (!filterBy.includes(filterKey)) {
        setFilterBy([...filterBy, filterKey]);
      }
    } else {
      setFilterBy(filterBy.filter((k) => k !== key));
    }
  }

  return (
    <div className="option">
      <input
        checked={filterBy.includes(filterKey)}
        type="checkbox"
        onChange={(e) => changeFilter(e.target.checked, filterKey)}
      />
      <p>{description}</p>
    </div>
  );
}

function Select({}) {
  const { mapTile, setMapTile } = useSettingsContext();

  return (
    <div className="option">
      <select value={mapTile} onChange={(e) => setMapTile(e.target.value as MapTileKey)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="earth">Earth</option>
      </select>
    </div>
  );
}

export default function SettingsOptions({}) {
  return (
    <div>
      <div className="option-wrapper">
        <p className="title">Search Countries By</p>
        <Checkbox description="Capital" filterKey="capital" />
        <Checkbox description="Continent" filterKey="continent" />
        <Checkbox description="Symbol" filterKey="iso3" />
      </div>

      <div className="option-wrapper">
        <p className="title">Map Mode</p>
        <Select />
      </div>

      <div className="reset-container">
        <Button
          icon={<i className="fa fa-refresh"></i>}
          onClick={() => clearLocalStorage()}
        ></Button>
        <p>Reset to Default</p>
      </div>
    </div>
  );
}

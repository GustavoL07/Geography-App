import "./SettingsOptions.css";
import Button from "@/components/Custom/Button/Button";
import CheckBox from "@/components/Custom/Checkbox/CheckBox";
import { FilterKey, MapTileKey } from "@/types";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import { clearLocalStorage } from "@/components/Hooks/useLocalStorage";

type Props = {
  description: string;
  filterKey: FilterKey;
};
function OptionCheckboxes({ description, filterKey }: Props) {
  const { filterBy, setFilterBy } = useSettingsContext();

  function changeFilter(e: boolean) {
    const checked = e;
    if (checked) {
      if (!filterBy.includes(filterKey)) {
        setFilterBy([...filterBy, filterKey]);
      }
    } else {
      setFilterBy(filterBy.filter((k) => k !== filterKey));
    }
  }

  return (
    <div className="option">
      <CheckBox id={filterKey} checked={filterBy.includes(filterKey)} onChange={changeFilter} />
      <p>{description}</p>
    </div>
  );
}

function OptionSelect({}) {
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
        <OptionCheckboxes description="Capital" filterKey="capital" />
        <OptionCheckboxes description="Continent" filterKey="continent" />
        <OptionCheckboxes description="Symbol" filterKey="iso3" />
      </div>

      <div className="option-wrapper">
        <p className="title">Map Mode</p>
        <OptionSelect />
      </div>

      <div className="reset-container">
        <p>Reset to Default</p>
        <Button
          icon={<i className="fa fa-refresh" aria-hidden="true"></i>}
          onClick={() => clearLocalStorage()}
        ></Button>
      </div>
    </div>
  );
}

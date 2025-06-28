import "./Filter.css"
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import { FilterOptions } from "@/utils/Organizing/filter";
import Button from "../../Button/Button";
import { FilterKey } from "@/types";
type Props = {
  onClose: () => void;
};
export default function Filter({ onClose }: Props) {
  const { filterValue, setFilterValue } = useSettingsContext();
  const onChangeFilter = (mode: FilterKey, close: boolean = false) => {
    setFilterValue(mode);
    if (close) onClose();
  };
  return (
    <div className="menu-child-wrapper">
      <div className="btns">
        <Button
        icon={<i className="fa-solid fa-xmark close-icon"></i>}
        onClick={() => onChangeFilter("none", true)}
      />
      </div>
      <div className="sort-content">
        <ul>
        {FilterOptions.filter((opt) => opt.key !== "none").map((opt, index) => (
          <li
            key={index}
            className={`sort-opt ${filterValue === opt.key ? "active" : ""}`}
            onClick={() => onChangeFilter(opt.key, true)}
          >
            {opt.text}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

import { useCountryContext } from "../../../../Contexts/CountryContext";
import "./StartButton.css";

export default function StartButton({}) {
  const { setSelectedCountry } = useCountryContext();

  function handleClick() {
    setSelectedCountry(null);
  }

  return (
    <div className="start-btn-wrapper">
      <button className="start-btn" onClick={() => handleClick()}>
        <i className="fa-solid fa-globe"></i>
      </button>
    </div>
  );
}

import { Country } from "@/types";
import "./Overview.css";

interface Props {
  country: Country;
}
export default function Overview({ country }: Props) {
  return (
    <div className="overview-wrapper">
      <img className="overview-flag" src={country.flag} alt={`${country.name.informal}'s flag`} />
      <p className="overview-title">{country.name.informal}</p>
      <p className="overview-subtitle">
        {country.name.formal} <br />({country.name.symbol})
      </p>
    </div>
  );
}

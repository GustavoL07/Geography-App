import { useCountryContext } from "@/components/Contexts/CountryContext";
import "./CompareCountry.css";

type Props = {};
export default function CompareCountry({}: Props) {
  const { countryList } = useCountryContext();
  return (
    <>
      <div className="compare-wrapper">
      </div>
    </>
  );
}

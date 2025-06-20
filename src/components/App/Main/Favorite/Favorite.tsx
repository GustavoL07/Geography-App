import "./Favorite.css";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import Overview from "../FullCountry/Overview/Overview";
import { Country } from "@/types";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Message from "@/components/Custom/CustomMessage/Message";
import Title from "@/components/Custom/CustomTitle/Title";

type Props = {
  title?: string;
};
export default function Favorite({ title = "Favorite Countries" }: Props) {
  const { favoriteList, setSelectedCountry } = useCountryContext();
  const { setDisplayMode } = useSettingsContext();

  const handleClick = (c: Country) => {
    setSelectedCountry(c);
    setDisplayMode("full");
  };

  return (
    <>
      <Title title={title} />
      {favoriteList.some(Boolean) ? (
        <div className="favorite-wrapper">
          <div className="info-grid">
            {favoriteList.map((c, index) => (
              <div key={index} className="favorite-option" onClick={() => handleClick(c)}>
                <Overview country={c} />
              </div>
            ))}
          </div>
          <Message message={`You have ${favoriteList.length} countries in your list.`} />
        </div>
      ) : (
        <Message message="Add more favorites to your list!" />
      )}
    </>
  );
}

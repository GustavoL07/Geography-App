import "./Favorite.css";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import { Country } from "@/types";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";
import Overview from "../FullCountry/Overview/Overview";
import Message from "@/components/Custom/Message/Message";
import Title from "@/components/Custom/Title/Title";

type Props = {
  title?: string;
};
export default function Favorite({ title = "Favorite Countries" }: Props) {
  const navigate = useNavigate();
  const { favoriteList } = useCountryContext();

  const handleClick = (c: Country) => navigate(ROUTES.COUNTRY(c.name.symbol));

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

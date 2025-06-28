import "./CapitalImage.css";
import useGetCapitalUrl from "@/components/Hooks/useGetCapitalUrl";

type Props = {
  capital: string;
};
export default function CapitalImage({ capital }: Props) {
  const url = useGetCapitalUrl(capital);

  if (!url) return null;
  return (
    <div className="capital-image-wrapper">
      <img className="capital-image" src={url} alt={`View of ${capital}`} />
      <a
        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(capital)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="capital-link"
      >
        <p>{capital}</p>
      </a>
    </div>
  );
}

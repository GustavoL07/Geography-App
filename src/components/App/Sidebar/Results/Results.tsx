import "./Results.css";

interface Props {
  value: number | undefined;
}
export default function Results({ value }: Props) {
  return (
    <div className="results-container">
      {value ? <p>{`${value} Results have been found.`}</p> : <p>No results.</p>}
    </div>
  );
}

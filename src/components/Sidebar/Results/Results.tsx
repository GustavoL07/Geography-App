import "./Results.css";

interface Props {
  value: number;
}

export default function Results({ value }: Props) {
  return (
    <div className="results-container">
      {value > 0 ? <p>{`${value} Results have been found.`}</p> : <p>No results.</p>}
    </div>
  );
}

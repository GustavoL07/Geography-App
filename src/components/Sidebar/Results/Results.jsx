import "./Results.css";

export default function Results({value}){
  return(
    <div className="results-container">
      {value > 0 ? (
        <p>{`${value} Results have been found.`}</p>
      ) : (
        <p>No results.</p>
      )}
    </div>
  )
}
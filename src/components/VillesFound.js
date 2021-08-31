import "../styles/ville.css";

const VillesFound = (props) => {
  return (
    <div className="CitiesFound">
      <p className="CitiesFoundText">
        {props.length} villes correspondant au texte saisi
      </p>
    </div>
  );
};
export default VillesFound;

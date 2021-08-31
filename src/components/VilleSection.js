import "../styles/ville.css";
import VillesNotFound from "./VillesNotFound";
import VillesFound from "./VillesFound";
import VilleItem from "./VilleItem";
import Loader from "react-loader-spinner";

const VilleSection = (props) => {
  return (
    <div className="villeSubContainer">
      <h2 style={{ fontSize: 20 }}>{props.title}</h2>

      {props.isLoading1 ? (
        <Loader
          style={{ marginTop: "30" }}
          type="Oval"
          color="coral"
          height={30}
          width={30}
        />
      ) : null}
      {props.found && !props.isLoading1 && props.searched1.length === 0 ? (
        <VillesNotFound />
      ) : null}

      {props.found && !props.isLoading1 && !props.searched1.length == 0 ? (
        <VillesFound length={props.searched1.length} />
      ) : null}
      <VilleItem searchedData={props.searchedData} />
    </div>
  );
};
export default VilleSection;

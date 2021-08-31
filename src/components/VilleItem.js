import React from "react";
import { ImageList, ImageListItem } from "@material-ui/core";
import "../styles/ville.css";
const VilleItem = (props) => {
  return (
    <ImageList cols={2}>
      {props.searchedData.slice(0, 100).map((item) => (
        <ImageListItem key={item.id} cols={1} style={{ height: "auto" }}>
          <div className="item">
            <p className="textItem">{item.nomCommune}</p>
            <p className="codePostal">{item.codePostal}</p>
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default VilleItem;

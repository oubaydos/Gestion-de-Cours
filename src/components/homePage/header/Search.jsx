import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Search() {
  const history = useHistory();
  function handleClick(str) {
    history.push("/search"); //khask tdir lien dial search
  }
  let [search, setSearch] = useState("");
  let style = {
    borderRadius: 100,
    float: "left",
    marginLeft: "50px",
    fontFamily: "montserrat",
    fontSize: "15px",
    fontWeight: "bold",
    width: "30%",
    height: "35px",
  };
  return (
    <Hidden>
      <SearchBar
        style={style}
        placeholder="Rechercher un cours"
        onChange={(newValue) => setSearch(newValue)}
        value={search}
        onRequestSearch={() => handleClick(search)}
      />
    </Hidden>
  );
}
export default Search;

import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextButton from "../../components/usedComponents/TextButton";

let useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: 100,
    float: "left",
    marginLeft: "50px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "10px",
      width: "20%",
    },
    fontFamily: "montserrat",
    fontSize: "15px",
    fontWeight: "bold",
    width: "30%",
    height: "35px",
  },
}));
function Search() {
  const history = useHistory();
  function handleClick(str) {
    history.push("/search"); //khask tdir lien dial search
  }
  let [search, setSearch] = useState("");
  let style = useStyle().root;
  return (
    <Hidden>
      <SearchBar
        className={style}
        placeholder="Rechercher un cours"
        onChange={(newValue) => setSearch(newValue)}
        value={search}
        onRequestSearch={() => handleClick(search)}
      />
    </Hidden>
  );
}
export default Search;

import React from "react";
import { Audio } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Loader.module.css";

function Loader() {
  return (
    
    <Audio className={s.loader} color="#00BFFF" height={100} width={100} />
  );
}

export default Loader;

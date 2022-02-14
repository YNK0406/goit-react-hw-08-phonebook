import React from "react";
import s from "./HomeView.module.css";

const HomeView = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Welcome!</h1>
      <p className={s.text}>To use the phone book, register or login!</p>
    </div>
  );
};

export default HomeView;

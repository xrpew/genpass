import { useState } from "react";

export const useGenerator = () => {

  let result = [];
  let specieD = [];

  const [password, setPasword] = useState("");

  const getChar = (goes=0, type) => {
    let kel = type[goes].length;
    let special = Math.floor(Math.random() * kel);
    result.push(type[goes][special]);
  };

  const generator = (value , type) => {
    for (let i = 0; i < value; i++) {
      let goes = Math.floor(Math.random() * type.length);
      specieD.push(goes);
      getChar(goes, type);
    }
    let ok = result.join("");
    setPasword(ok);
  };
  return {
    generator,
    password,
  };
};

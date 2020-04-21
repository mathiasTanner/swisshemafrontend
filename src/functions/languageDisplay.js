import React from "react";

const languageDisplay = (element, language) => {
  return (
    <span>
      {language === "FR"
        ? element.FR
        : language === "EN"
        ? element.EN
        : element.DE}
    </span>
  );
};

export default languageDisplay;

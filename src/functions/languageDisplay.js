import React from "react";

const languageDisplay = (element, language) => {
  return (
    <span>
      {language === "FR"
        ? element.FR
        : language === "EN"
        ? element.EN
        : language === "IT"
        ? element.IT
        : language === "RO"
        ? element.RO
        : element.DE}
    </span>
  );
};

export default languageDisplay;

import days from "../JSONdata/days";
import languageDisplay from "./languageDisplay";

const daySelector = (day, language) => {
  switch (day) {
    case "monday":
      return languageDisplay(days.monday, language);
    case "tuesday":
      return languageDisplay(days.tuesday, language);
    case "wednesday":
      return languageDisplay(days.wednesday, language);
    case "thrusday":
      return languageDisplay(days.thursday, language);
    case "friday":
      return languageDisplay(days.friday, language);
    case "saturday":
      return languageDisplay(days.saturday, language);
    case "sunday":
      return languageDisplay(days.sunday, language);
    default:
      return null;
  }
};

export default daySelector;

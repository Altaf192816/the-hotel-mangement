import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const { isDarkMode, toogleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toogleDarkMode}>{isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}</ButtonIcon>
  );
}

export default DarkModeToggle;

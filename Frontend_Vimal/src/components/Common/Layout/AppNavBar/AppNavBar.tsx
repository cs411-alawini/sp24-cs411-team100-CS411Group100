import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppNavBarProps } from "./AppNavBar.constants";


type Props = AppNavBarProps;

const AppNavBar = (props: Props) => {
  const { t } = useTranslation();
  const { toggleMenuCollapse } = props;
  const [error, setError] = useState("");
  const resetError = () => {
    setError("");
  };

  return (
    <>
    </>
  );
}
export default AppNavBar;

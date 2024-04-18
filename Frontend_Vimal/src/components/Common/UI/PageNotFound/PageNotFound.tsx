import { useTranslation } from "react-i18next";
import { PageNotFoundProps } from "./PageNotFound.constants";

type Props = PageNotFoundProps;

const PageNotFound = (props: Props) => {
  const { t } = useTranslation();
  const { title, icon, description } = props;
  return (
    <div className="data-not-found main-tab-content">
      {icon && (
        <div className="nodata-icon-container">
          <img src={icon} />
        </div>
      )}
      <div className="data-not-found__text">{title}</div>
      {description && (
        <div className="nodata-additional-message">{description}</div>
      )}
    </div>
  );
};
export default PageNotFound;

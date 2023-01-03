import { AiOutlineArrowLeft } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ title, hasBack = true }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 font-bold flex items-center justify-center gap-2 border-b border-gray-200">
      {hasBack && (
        <div
          className="w-7 h-7 rounded-full bg-gray-500 flex items-center justify-center"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft color="white" />
        </div>
      )}
      <p className="text-heading3 flex-1 text-center">{t(title)}</p>
      {hasBack && <div className="w-10"></div>}
    </div>
  );
};

export default NavigationBar;

import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";

const CustomLoadingButton = ({ text, loading, onClick }) => {
  const { t } = useTranslation();

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth
      loading={loading}
    >
      {t(text)}
    </LoadingButton>
  );
};

export default CustomLoadingButton;

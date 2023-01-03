import Rating from "@mui/material/Rating";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createFeedback } from "../api";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";

const Feedback = ({ setOpenCallPayment, setSuccessType, setOpen }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(5);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const storeData = useSelector((state) => state.store.storeData);

  const onFeedback = async () => {
    try {
      setLoading(true);
      await createFeedback({
        point: value,
        branchId: storeData.id,
        comment: note,
      });
      setLoading(false);
      setOpenCallPayment(false);
      setSuccessType("feedback");
      setNote("");
      setOpen(true);
    } catch (error) {
      toast.error(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p className="text-center text-heading3 mt-2">{t("submitAReview")}</p>
      <p className="text-content1 mb-4 mt-1">
        {t("submitAReviewDesc")}
      </p>
      <Rating
        name="simple-controlled"
        size="large"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />

      <textarea
        placeholder={t("submitAReviewPlaceholder")}
        className="text-supplement border border-gray-200 rounded-lg w-full p-2 mt-4 focus:outline-none"
        rows={3}
        maxLength={200}
        autoFocus
        onChange={(e) => setNote(e.target.value)}
      />

      <LoadingButton
        variant="contained"
        fullWidth
        size="large"
        className="mt-2"
        onClick={onFeedback}
        loading={loading}
      >
        {t("submitAReview")}
      </LoadingButton>
    </div>
  );
};

export default Feedback;

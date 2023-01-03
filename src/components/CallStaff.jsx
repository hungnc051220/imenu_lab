import { useState } from "react";
import { useSelector } from "react-redux";
import { callStaff } from "../api";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import toast from 'react-hot-toast';

const CallStaff = ({ setSuccessType, setOpen, setOpenCallPayment }) => {
  const { t } = useTranslation();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const storeData = useSelector((state) => state.store.storeData);
  const table = useSelector((state) => state.table);
  const { orderId } = useSelector(state => state.cart);

  const onCallStaff = async () => {
    if(!note) {
      toast.error(t("requiredCallStaff"), {id: "note"});
      return;
    }
    try {
      setLoading(true);
      await callStaff({
        branchId: storeData?.id,
        floorId: table?.floorId,
        tableId: table?.tableId,
        content: note,
        orderId
      });
      setLoading(false);
      setOpenCallPayment(false);
      setNote("");
      setSuccessType("callStaff");
      setOpen(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <p className="text-center text-heading3 mt-2">{t("callStaff")}</p>
      <p className="text-content1 mt-1">{t("callStaffDesc")}</p>
      <textarea
        placeholder={t("callStaffPlaceholder")}
        maxLength={200}
        className="text-supplement border border-gray-200 rounded-lg w-full p-2 mt-4 focus:outline-none"
        rows={3}
        autoFocus
        onChange={(e) => setNote(e.target.value)}
      />
      <LoadingButton
        variant="contained"
        size="large"
        fullWidth
        loading={loading}
        className="mt-2"
        onClick={onCallStaff}
      >
        {t("sendRequest")}
      </LoadingButton>
    </div>
  );
};

export default CallStaff;

import { images } from "../constants";
import { AiOutlinePlus } from 'react-icons/ai';

const PromotionCard = () => {
  return (
    <div className="h-[160px] min-w-[200px] rounded-[20px] shadow-lg bg-white overflow-hidden flex flex-col relative">
      <img
        src={images.promotion2}
        className="w-full h-[60%] object-cover object-center"
      />
      <div className="bg-dark-orange absolute top-2 right-2 rounded-full text-xs text-white py-1 px-2">
        <p>10% OFF</p>
      </div>
      <div className="flex justify-between items-center flex-1 py-1 px-2">
        <div>
          <p className="text-content3">Mochi Kem Chocolate</p>
          <p className="text-base font-bold">19.000đ</p>
        </div>
        <div className="bg-black text-white h-[27px] w-[27px] rounded-full flex justify-center items-center">
          <AiOutlinePlus color="white" size={14} />
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;

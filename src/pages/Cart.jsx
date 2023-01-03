import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonsChangeQuantity, FoodCard, Footer } from "../components";
import { calculateTotalItems } from "../features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const { orderFoods } = useSelector((state) => state.cart);
  const totalItems = useSelector(calculateTotalItems);

  useEffect(() => {
    if (totalItems === 0) {
      navigate(-1);
    }
  }, [totalItems]);

  return (
    <div className="bg-white relative pb-20 pt-16 min-h-screen">
      <div className="bg-white p-4 font-bold flex items-center justify-between gap-2 fixed top-0 left-0 w-full z-10">
        <div
          className="p-2 bg-white rounded-lg shadow-md"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft className="h-4 w-4 text-gray-600" />
        </div>
        <p className="font-bold text-lg mt-1">Các món đã chọn</p>
        <div className="w-10"></div>
      </div>
      {orderFoods.map((item, index) => (
        <FoodCard
          key={index}
          food={item}
          rightComponent={<ButtonsChangeQuantity food={item} />}
        />
      ))}
      <Footer />
    </div>
  );
};

export default Cart;

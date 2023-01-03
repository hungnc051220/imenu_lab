import OrderItem from "./OrderItem/OrderItem";
import { useSelector } from 'react-redux';

const OrderItems = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div>
    <p className="text-gray-500 bg-white pl-4 text-sm font-medium">Đơn gọi đồ của bạn</p>
    <ul role="list" className="divide-y divide-gray-200">
      {cartItems.map((menuItem) => (
        <OrderItem orderItem={menuItem} key={menuItem.id} />
      ))}
    </ul>
    </div>
  );
};

export default OrderItems;

import { useState } from "react";
import { useSelector } from "react-redux";
import { Footer, Header, MenuItems } from "../components";
import { calculateTotalItems } from "../features/cart/cartSlice";

const Menu = () => {
  const [currentCategory, setCurrentCategory] = useState();
  const totalItems = useSelector(calculateTotalItems);
  const storeData = useSelector((state) => state.store.storeData);

  return (
    <div className={`${totalItems > 0 ? "pb-32" : ""}`}>
      <Header
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />

      {/* List of foods */}
      <MenuItems
        menuItems={storeData?.menus?.filter((x) => {
          return currentCategory ? x.id === currentCategory : x.id;
        })}
      />

      {/* Footer */}
      {totalItems > 0 && <Footer />}
    </div>
  );
};

export default Menu;

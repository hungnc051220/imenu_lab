
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonsChangeQuantity from "./ButtonsChangeQuantity";
import FoodCard from "./FoodCard";
import FoodDetail from "./FoodDetail";

const MenuItems = ({ menuItems }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    if (selectedFood) handleOpen();
  }, [selectedFood]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFood(null);
  };

  return (
    <div className="divide-y divide-fade-gray px-4">
      {menuItems?.map((group) => (
        <div className="divide-y divide-fade-gray" key={group.id}>
          {group.foods.map((food) => (
            <FoodCard
              key={food.id}
              groupName={group.name}
              food={food}
              setSelectedFood={setSelectedFood}
              rightComponent={<ButtonsChangeQuantity food={food} />}
            />
          ))}
        </div>
      ))}

      <FoodDetail
        selectedFood={selectedFood}
        open={open}
        onOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default MenuItems;

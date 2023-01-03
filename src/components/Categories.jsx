import { t } from "i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import { classNames } from "../utils/commonFunctions";

const CategoryCard = ({ category, currentCategory, setCurrentCategory }) => {
  const active = category.id === currentCategory;
  return (
    <p
      className={classNames(
        active ? "text-white bg-primary rounded-full" : "",
        "font-normal py-1 px-3 text-content3 whitespace-nowrap"
      )}
      onClick={() => setCurrentCategory(category.id)}
    >
      {category.name}
    </p>
  );
};

const Categories = ({ currentCategory, setCurrentCategory }) => {
  const { menus } = useSelector((state) => state.store.storeData);

  return (
    <div className="flex items-center px-4 pb-2 gap-2 overflow-x-auto overflow-y-hidden categories-container">
      <CategoryCard
        category={{ id: undefined, name: t("all") }}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      {menus?.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      ))}
    </div>
  );
};

export default Categories;

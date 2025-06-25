import React from "react";
import CategorieTopBar from "./CategoriesTopBar";
import CategoriesArea from "./CategoriesArea";
import DropDown from "../DropDown";
import AddCategorie from "../AddCategories";
import { useGlobalContextProvider } from "@/app/contextAPI";

function Categories() {
  const { isDark, categoryDropDown } = useGlobalContextProvider();

  const {
    open: openDropDown,
    setOpen: setOpenDropDown,
    position: dropDownPosition,
    selectedItem,
    setSelectedItem,
  } = categoryDropDown;

  function handleClose() {
    setOpenDropDown(false);
  }

  function handleEdit(category: any) {
    console.log("Modifica categoria:", category);
    setOpenDropDown(false);
  }

  function handleDelete(category: any) {
    console.log("Elimina categoria:", category);
    setOpenDropDown(false);
  }

  return (
    <div className="h-full min-h-screen w-full">
      <DropDown
        open={openDropDown}
        position={dropDownPosition}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedItem={selectedItem}
        isDark={isDark}
      />
      <AddCategorie />
      <CategorieTopBar />
      <CategoriesArea />
    </div>
  );
}

export default Categories;

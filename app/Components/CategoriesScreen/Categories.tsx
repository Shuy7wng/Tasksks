import React from "react";
import CategorieTopBar from "./CategoriesTopBar";
import CategoriesArea from "./CategoriesArea";
import DropDown from "../DropDown";
import AddCategorie from "../AddCategories";
import { useGlobalContextProvider } from "@/app/contextAPI";

function Categories() {
  const { dropDown, isDark } = useGlobalContextProvider();
  const {
    openDropDown,
    setOpenDropDown,
    dropDownPosition,
    setSelectedProject, // magari per categorie si chiama diversamente, ma tieni conto del nome
    selectedProject,
  } = dropDown;

  function handleClose() {
    setOpenDropDown(false);
  }

  function handleEdit(project: any) {
    console.log("Modifica categoria:", project);
    setOpenDropDown(false);
  }

  function handleDelete(project: any) {
    console.log("Elimina categoria:", project);
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
        selectedProject={selectedProject}
        isDark={isDark}
      />
      <AddCategorie />
      <CategorieTopBar />
      <CategoriesArea />
    </div>
  );
}

export default Categories;

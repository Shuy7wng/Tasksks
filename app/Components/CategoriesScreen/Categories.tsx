import React from "react";
import CategorieTopBar from "./CategoriesTopBar";
import CategoriesArea from "./CategoriesArea";
import DropDown from "../DropDown";
import AddCategorie from "../AddCategories";

function Categories(){
    return (
        <div className={`h-full min-h-screen  w-full`}>
            <DropDown/>
            <AddCategorie/>
            <CategorieTopBar />
            <CategoriesArea />
        </div>
    );
}
export default Categories;
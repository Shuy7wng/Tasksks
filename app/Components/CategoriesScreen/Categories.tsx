import React from "react";
import CategorieTopBar from "./CategoriesTopBar";
import CategoriesArea from "./CategoriesArea";
import DropDown from "../DropDown";

function Categories(){
    return (
        <div className={`h-full min-h-screen  w-full`}>
            <DropDown/>
            <CategorieTopBar />
            <CategoriesArea />
        </div>
    );
}
export default Categories;
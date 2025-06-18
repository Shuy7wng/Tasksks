import React from "react";
import CategorieTopBar from "./CategoriesTopBar";
import CategoriesArea from "./CategoriesArea";

function Categories(){
    return (
        <div className={`h-[1000px] w-full`}>
            <CategorieTopBar />
            <CategoriesArea />
        </div>
    );
}
export default Categories;
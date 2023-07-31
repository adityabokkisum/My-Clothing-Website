import { useContext } from "react";

import {CategoriesContext} from "../../components/contexts/categories.context"

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    return (
        <div className="categories-preview-container">
            {
                Object.keys(categoriesMap).map((title) => <CategoryPreview key={title} products={categoriesMap[title]} title= {title}/>)
            }
        </div>
    )
}

export default CategoriesPreview;
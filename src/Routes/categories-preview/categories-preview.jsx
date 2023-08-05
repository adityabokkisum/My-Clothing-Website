import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectorCategory } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectorCategory)
    return (
        <div className="categories-preview-container">
            {
                Object.keys(categoriesMap).map((title) => <CategoryPreview key={title} products={categoriesMap[title]} title= {title}/>)
            }
        </div>
    )
}

export default CategoriesPreview;
import "./category-menu.styles.scss"
import CategoryMenuItem from "../category-menu-item/category-menu-item.component"

const CategoryMenu = ({categories}) => {
      return(
        <div className="categories-container">
            {
                categories.map((category)=> <CategoryMenuItem key = {category.id} category = {category}/>)
            }
        </div>
      )
}

export default CategoryMenu
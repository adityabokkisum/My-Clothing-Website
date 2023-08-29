import { createContext, useEffect, useState} from "react";
import {gql,useQuery} from "@apollo/client";

//As the actual value you want to access
export const CategoriesContext = createContext({
    categoriesMap:{}
});

const COLLECTIONS = gql`
    query {
        collections {
            id
             title
           items{
             name
             id
             price
             imageUrl
           }
         }
    }
`

export const CategoriesProvider = ({children}) => {
    const {loading,error,data} = useQuery(COLLECTIONS);
    const [categoriesMap,setCategoriesMap] = useState({});
    useEffect(()=>{
        if (data) {
            const {collections} = data;
            const collectionsMap = collections.reduce((acc,collection)=>{
                const {title,items} = collection;
                acc[title.toLowerCase()] = items;
                return acc;
            },{});
            setCategoriesMap(collectionsMap)
        }
    },[data])
    const value = {categoriesMap,loading}
    return <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>
}
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const[name,setName] = useState("");
    const[categories, setCategories] = useState([]);
    const[parentCategory, setParentCategory] = useState("");
    useEffect(() => {
        fetchCategories();
    }, []);
    function fetchCategories() {
        axios.get("/api/categories").then(result => {
            setCategories(result.data);
        });
    };
    async function saveCategory(ev){
        ev.preventDefault();
        axios.post("/api/categories", {name, parentCategory});
        setName("");
        fetchCategories();
    }
    return(
        <Layout>
            <h1>Categories Page</h1>
            <label>Nova Categoria</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input  className="m-0"
                        value={name} 
                        onChange={ev => setName(ev.target.value)} 
                        type="text" placeholder={"Nome da Categoria"}>
                </input>
                <select className="m-0" 
                        onChange={ev => setParentCategory(ev.target.value)}
                        value={parentCategory}>
                    <option value="">Categoria Principal</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="bg-purple-700 text-white border border-black px-2 rounded-md">Salvar</button>
            </form>
            <table className="basict mt-4">
                <thead>
                    <tr>
                        <td>Nome da Categoria</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}
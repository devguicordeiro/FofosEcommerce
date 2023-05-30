import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categoies() {
    const[name,setName] = useState("");
    async function saveCategory(ev){
        ev.preventDefault();
        axios.post("/api/categories", {name});
        setName("");
    }
    return(
        <Layout>
            <h1>Categories Page</h1>
            <label>Nova Categoria</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input className="m-0" value={name} 
                onChange={ev => setName(ev.target.value)} 
                type="text" placeholder={"Nome da Categoria"}></input>
                <button type="submit" className="bg-purple-700 text-white border border-black px-2 rounded-md">Salvar</button>
            </form>
        </Layout>
    )
}
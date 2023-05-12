import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";

export default function NewProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    async function createProduct(ev) {
        ev.preventDefault();
        const data = {title, description, price}
        await axios.post("/api/products", data);
    }

    return(
        <Layout>
        <form onSubmit={createProduct}>
            <h1 >Novo Produto</h1>
            <label>Nome do produto</label>
            <input 
                type="text" 
                placeholder="Insira o nome aqui" 
                value={title}
                onChange={ev => setTitle(ev.target.value)} >
            </input>
            <label>Descrição do produto</label>
            <textarea 
                placeholder ="Insira a descrição aqui"
                value={description}
                onChange={ev => setDescription(ev.target.value)} >
            </textarea>
            <label>Preço do produto</label>
            <input 
                type="number" 
                placeholder="Insira o preço aqui"
                value={price}
                onChange={ev => setPrice(ev.target.value)} >
            </input>
            <button type="submit" className="create-new-btn">Criar</button>
        </form>
        </Layout>
    )
}
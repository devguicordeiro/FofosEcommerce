import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
                                    _id,
                                    title:existingTitle,
                                    description:existingDescription,
                                    price:existingPrice 
    }) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(ev) {
        ev.preventDefault();

        const data = {title, description, price}
        if(_id) {
            //update product
            await axios.put("/api/products", {...data, _id})
        } else {
            //create product
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);

    }
    if (goToProducts) {
        router.push("/products")
    }

    return(
        <form onSubmit={saveProduct}>
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
            <button type="submit" className="create-new-btn">Salvar</button>
        </form>
    )
}
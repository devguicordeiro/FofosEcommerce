import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
                                    _id,
                                    title:existingTitle,
                                    description:existingDescription,
                                    price:existingPrice,
                                    images
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
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files){
                data.append("file", file);
            }
            const res = await axios.post("/api/upload", data);
        }
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
            <label>
                Imagens 
            </label>
            <div className="mb-2">
                <label className="cursor-pointer my-1 w-28 h-28 border border-2 flex flex-col items-center justify-center text-center text-gray-400 rounded-md bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                    <div>
                    Importar...
                    </div>
                    <input type="file" className="hidden" onChange={uploadImages}></input>
                </label>
                {!images?.length && (<div>Produto sem imagens</div>)}
            </div>
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
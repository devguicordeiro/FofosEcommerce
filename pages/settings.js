import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const[products,  setProducts] = useState([]);
    const[featuredId, setFeaturedId] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/products").then(res => {
            setProducts(res.data);
            setIsLoading(false);
        })
    }, [])
    return(
        <Layout>
            <h1>Configurações do Site</h1>
            {isLoading && (
                <Spinner />
            )}
            {!isLoading && (
                <>
                    <label>Produto em Destaque</label>
                    <select onChange={ev => setFeaturedId(ev.target.value)} >
                        {products.length > 0 && products.map(product => (
                            <option key={product._id} value={product._id}>{product.title}</option>
                        ))}
                    </select>
                    <div>
                        <button className="btn-default">Salvar</button>
                    </div>
                </>
            )}
        </Layout>
    )

}
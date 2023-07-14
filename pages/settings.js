import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function SettingsPage({swal}) {
    const[products,  setProducts] = useState([]);
    const[featuredId, setFeaturedId] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/products").then(res => {
            setProducts(res.data);
            setIsLoading(false);
        });
        axios.get("/api/settings?name=featuredId").then(res => {
            setFeaturedId(res.data.value);
        });
    }, []);

    async function saveSettings() {
        const id = featuredId;
        await axios.put("/api/settings", {
            name: "featuredId",
            value: id,
        }).then(() => {
            swal.fire({
                title: "Configuração salva!",
                icon: "success",
            });
        });
    }
    return(
        <Layout>
            <h1>Configurações do Site</h1>
            {isLoading && (
                <Spinner />
            )}
            {!isLoading && (
                <>
                    <label>Produto em Destaque</label>
                    <select value={featuredId} onChange={ev => setFeaturedId(ev.target.value)} >
                        {products.length > 0 && products.map(product => (
                            <option key={product._id} value={product._id}>{product.title}</option>
                        ))}
                    </select>
                    <div>
                        <button onClick={saveSettings} className="btn-default">Salvar</button>
                    </div>
                </>
            )}
        </Layout>
    )

}

export default withSwal(({swal}) => (
    <SettingsPage swal={swal} />
));
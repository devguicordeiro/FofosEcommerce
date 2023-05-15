import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const{id} = router.query;
    useEffect (() => {
        if (!id) {
            return;
        }
        axios.get("/api/products?id="+id)
    }, [id]);
    function goBack(){
        router.push("/products");
    }
    return (
        <Layout>
            <h1>Você realmente deseja deletar o produto X?</h1>
            <button>Sim</button>
            <button onClick={goBack}>Não</button>
        </Layout>
    )
}
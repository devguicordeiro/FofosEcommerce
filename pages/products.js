import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
    return(
        <Layout>
            <Link className="bg-gray-400 py-1 px-2 rounded-md" href={"/products/new"}>Adicionar novo produto</Link>
        </Layout>
    )

}
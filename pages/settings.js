import Layout from "@/components/Layout";

export default function SettingsPage() {
    return(
        <Layout>
            <h1>Configurações do Site</h1>
            <label>Produto em Destaque</label>
            <select></select>
            <div>
                <button className="btn-default">Salvar</button>
            </div>
        </Layout>
    )

}
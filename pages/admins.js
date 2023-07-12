import Layout from "@/components/Layout";

export default function AdminsPage() {
    return (
        <Layout>
            <h1>Administradores</h1>
            <h2>Adicionar novo administrador</h2>
            <h2>Administradores existentes</h2>
            <table className="basict">
                <thead>
                    <tr>
                        <th className="text-left">Email Google do Administrador</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
        </Layout>
    )
}
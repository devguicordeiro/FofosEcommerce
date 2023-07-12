import Layout from "@/components/Layout";
import { useState } from "react";

export default function AdminsPage() {
    const [email, setEmail] = useState("");
    function addAdmin(){
        
    }
    return (
        <Layout>
            <h1>Administradores</h1>
            <h2>Adicionar novo administrador</h2>
            <form onSubmit={addAdmin}>
                <div className="flex gap-2">
                    <input value={email} onChange={ev => setEmail(ev.target.value)} className="mb-0" type="text" placeholder="Email do google" />
                    <button type="submit" className="bg-purple-700 text-white border border-black px-2 rounded-md">Adicionar</button>
                </div>
            </form>
            <table className="basict">
                <thead>
                    <tr>
                        <th className="text-left">Atuais Administradores</th>
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
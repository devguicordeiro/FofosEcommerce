import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { dateFormat } from "@/lib/date";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function AdminsPage({swal}) {
    const [email, setEmail] = useState("");
    const [adminEmails, setAdminEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function addAdmin(ev){
        ev.preventDefault();
        axios.post("/api/adminsapi", {email}).then(res => {
            console.log(res.data);
            swal.fire({
                title: "Administrador adicionado!",
                icon: "success",
            });
            setEmail("");
            loadAdmins();
        })
    };

    function loadAdmins() {
        setIsLoading(true);
        axios.get("/api/adminsapi").then(res => {
            setAdminEmails(res.data);
            setIsLoading(false);
        });
    };

    function deleteAdmin(_id) {
        axios.delete("/api/adminsapi?_id="+_id).then(() => {
            swal.fire({
                title: "Administrador deletado!",
                icon: "success",
        });
        loadAdmins();
    });
    };
    
    useEffect(() => {
        loadAdmins();
    }, []);

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
                        <th className="text-left">Administradores Atuais</th>
                        <th className="text-left">Data de Criação</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={3}>
                            <div className="py-4">
                                <Spinner fullWidthP={true} />
                            </div>
                            </td>
                        </tr>
                    )}
                    {adminEmails.length > 0 && adminEmails.map(adminEmail => (
                        <tr>
                            <td>
                                {adminEmail.email}
                            </td>
                            <td>
                                {adminEmail.createdAt && dateFormat(adminEmail.createdAt)}
                            </td>
                            <td>
                            <div className="space-x-2 flex justify-center">
                                <button
                                onClick={() => deleteAdmin(adminEmail._id)}
                                className="btn-red flex items-center text-sm"
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                                <span>Deletar</span>
                                </button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({swal}) => (
    <AdminsPage swal={swal}></AdminsPage>
))
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
    }

    function loadAdmins() {
        setIsLoading(true);
        axios.get("/api/adminsapi").then(res => {
            setAdminEmails(res.data);
            setIsLoading(false);
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
                        <th className="text-left">Atuais Administradores</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={2}>
                            <div className="py-4">
                                <Spinner fullWidthP={true} />
                            </div>
                            </td>
                        </tr>
                    )}
                    {adminEmails.length > 0 && adminEmails.map(adminEmail => (
                        <tr>
                            <td>{adminEmail.email}</td>
                            <td>{dateFormat(adminEmail.createdAt)}</td>
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
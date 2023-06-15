import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("/api/orders").then(response => {
            setOrders(response.data);
        });
    }, []);
    return(
        <Layout>
            <h1>Página de Ordens</h1>
            <table className="basict">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.name} {order.email} <br/>
                                {order.city} {order.cep} <br/>
                                {order.address} {order.house} <br/>
                                {order.complement} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )

}
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("/api/order").then(response => {
            setOrders(response.data);
        });
    }, []);
    return(
        <Layout>
            <h1>Página de Ordens</h1>
            <table className="basict">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Pago</th>
                        <th>Cliente</th>
                        <th>Produtos</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr>
                            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                            <td className={order.paid ? "text-green-600" : "text-red-600"} >
                                {order.paid ? "SIM" : "NÃO"}
                            </td>
                            <td>{order.name} {order.email} <br/>
                                {order.city} {order.cep} <br/>
                                {order.address} {order.house} <br/>
                                {order.complement} 
                            </td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data?.product_data.name} 
                                        x {l.quantity} <br />

                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )

}
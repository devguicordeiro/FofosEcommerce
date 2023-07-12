import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/order").then(response => {
            setOrders(response.data);
            setIsLoading(false);
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
                    {isLoading && (
                            <tr>
                                <td colSpan={4}>
                                    <div className="py-5">
                                        <Spinner fullWidthP={true} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    {orders.length > 0 && orders.map(order => (
                        <tr key={order._id}>
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
                            {order.line_items.map((l, index) => (
                                <div key={index}>
                                {l.price_data?.product_data.name} 
                                x {l.quantity} <br />
                                </div>
                            ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )

}
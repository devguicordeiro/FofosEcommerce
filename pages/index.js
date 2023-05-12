import Layout from "@/components/Layout"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const {data:session} = useSession();
  return (
  <Layout>
    <div className="text-purple-900">
      Olá, <b>{session?.user?.name}</b>
    </div>
  </Layout>
  )
}

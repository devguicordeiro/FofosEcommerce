import Layout from "@/components/Layout"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  return (
  <Layout>
    Página de controle
    <button onClick={() => signOut()}>Sign out</button>
  </Layout>
  )
}

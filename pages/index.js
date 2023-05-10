import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()
  if(!session){
    return(
      <div className={"bg-purple-900 w-screen h-screen flex items-center"}>
        <div className={"text-center w-full"}>
          <button onClick={() => signIn("google")} className={"bg-white py-2 px-4 rounded-lg"}>Entrar com conta do Google</button>
        </div>
      </div>
    )
  }

  return (
    <div>Você está logado como: {session.user.email} <br/>
    <button onClick={() => signOut()}>Sair</button></div>
  )
}

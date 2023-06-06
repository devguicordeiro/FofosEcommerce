import { useSession, signIn, signOut } from "next-auth/react" // Importing necessary dependencies from the "next-auth/react" module
import Nav from "@/components/Nav" // Importing the Nav component from the "@/components/Nav" module
import { useState } from "react" // Importing the useState hook from the "react" module
import Logo from "./Logo"; // Importing the Logo component from the local "./Logo" file

export default function Layout({children}) { // Defining the Layout component with a children prop
  const [showNav, setShowNav] = useState(false); // Initializing the showNav state variable using the useState hook and setting its initial value to false
  const { data: session } = useSession() // Using the useSession hook to access the user's session information and destructuring it into the session variable

  if(!session){ // Checking if there is no session
    return(
      <div className={"bg-purple-900 w-screen h-screen flex items-center"}> {/* Render a div with a purple background that covers the entire screen and vertically centers its contents */}
        <div className={"text-center w-full"}> {/* Render a div that centers its contents horizontally */}
          <button onClick={() => signIn("google")} className={"bg-white py-2 px-4 rounded-lg"}>Entrar com conta do Google</button> {/* Render a button that triggers the signIn function with the "google" provider when clicked */}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-purple-900 min-h-screen "> {/* Render a div with a purple background that covers at least the height of the screen */}
      <div className="block md:hidden flex items-center text-white p-3 pb-1"> {/* Render a div with certain classes for styling */}
        <button onClick={() => setShowNav(true)}> {/* Render a button that sets the showNav state variable to true when clicked */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> {/* Render an SVG icon */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> {/* Render path elements for the SVG icon */}
          </svg>
        </button>
        <div className="flex grow justify-center mr-6"> {/* Render a div with certain classes for styling */}
          <Logo></Logo> {/* Render the Logo component */}
        </div>
      </div>
      <div className="flex"> {/* Render a div with the flex class */}
        <Nav show={showNav} /> {/* Render the Nav component with the show prop set to the value of the showNav state variable */}
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4"> {/* Render a div with certain classes for styling */}
          {children} {/* Render the content passed as the children prop */}
        </div>
      </div>
    </div>
  )
}

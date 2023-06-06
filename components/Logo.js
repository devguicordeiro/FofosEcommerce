import Link from "next/link" // Importing the Link component from the "next/link" module

export default function Logo() { // Defining the Logo component
    return (
        <Link href={"/"} className="flex gap-1"> {/* Render a Link component with the href prop set to "/" and the className prop set to "flex gap-1" */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> {/* Render an SVG icon */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" /> {/* Render path elements for the SVG icon */}
            </svg>
            <span className=""> {/* Render a span element with an empty className */}
                Fofos-Admin {/* Render the text "Fofos-Admin" */}
            </span>
        </Link>
    )
}

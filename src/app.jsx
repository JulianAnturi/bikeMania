import Navbar from "./components/navbar"
import Owners from "./pages/Owners"
import Bikes from "./pages/Bikes"
import React from "react"

export default function App() {
  const [page, setPage] = React.useState('owners')
  return (
    <>
      <Navbar setPage={setPage} />

      <div className="container mt-4">
        {page === 'owners' && <Owners />}
        {page === 'bikes' && <Bikes />}
      </div>
    </>
  )
}
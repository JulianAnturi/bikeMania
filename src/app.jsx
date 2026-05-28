import Navbar from "./components/navbar"
import Users from "./pages/Users"
import Bikes from "./pages/Bikes"
import React from "react"

export default function App() {
  const [page, setPage] = React.useState('')
  return (
    <>
      <Navbar setPage={setPage} />

      <div className="container mt-4">
        {page === 'users' && <Users />}
        {page === 'bikes' && <Bikes />}
      </div>
    </>
  )
}
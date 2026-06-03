import Navbar from "./components/navbar"
import CreateOwners from "./pages/Owners/Create"
import Owners from "./pages/Owners/Index"
import Bikes from "./pages/Bikes"
import {useState} from "react"

export default function App() {
  const [page, setPage] = useState('owners')
  return (
    <>
      <Navbar setPage={setPage} />

      <div className="container mt-4">
        {page === 'owners' && <Owners setPage={setPage} />}
        {page === 'createOwners' && <CreateOwners />}
        {page === 'bikes' && <Bikes />}
      </div>
    </>
  )
}
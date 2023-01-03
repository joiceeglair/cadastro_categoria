import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="flex justify-center items-center p-5 mt-2">
      <div className="flex gap-5">
        <Link to="/" className="text-xl font-bold">Início</Link>
        <Link to="/categoria-cliente" className="text-xl font-bold">Categoria Cliente</Link>
      </div>
    </nav>
  )
}
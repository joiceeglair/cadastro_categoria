import { Route, Routes } from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { Lista } from './pages/Lista';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/categoria-cliente" element={<Lista />} />
    </Routes>
  )
}
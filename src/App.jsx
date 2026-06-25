import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AppProvider } from './context/AppContext.jsx'
import Layout from './components/Layout/Layout.jsx'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.jsx'

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'))
const NovoServico = lazy(() => import('./pages/NovoServico/NovoServico.jsx'))
const Servicos = lazy(() => import('./pages/Servicos/Servicos.jsx'))
const ServicoDetalhe = lazy(() => import('./pages/ServicoDetalhe/ServicoDetalhe.jsx'))
const Clientes = lazy(() => import('./pages/Clientes/Clientes.jsx'))
const ClientDetails = lazy(() => import('./components/ClientDetails/ClientDetails.jsx'))
const Relatorios = lazy(() => import('./pages/Relatorios/Relatorios.jsx'))
const Definicoes = lazy(() => import('./pages/Definicoes/Definicoes.jsx'))

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense>
          } />
          <Route path="novo-servico" element={
            <Suspense fallback={<LoadingSpinner />}><NovoServico /></Suspense>
          } />
          <Route path="servicos" element={
            <Suspense fallback={<LoadingSpinner />}><Servicos /></Suspense>
          } />
          <Route path="servicos/:id" element={
            <Suspense fallback={<LoadingSpinner />}><ServicoDetalhe /></Suspense>
          } />
          <Route path="clientes" element={
            <Suspense fallback={<LoadingSpinner />}><Clientes /></Suspense>
          } />
          <Route path="clientes/:id" element={
            <Suspense fallback={<LoadingSpinner />}><ClientDetails /></Suspense>
          } />
          <Route path="relatorios" element={
            <Suspense fallback={<LoadingSpinner />}><Relatorios /></Suspense>
          } />
          <Route path="definicoes" element={
            <Suspense fallback={<LoadingSpinner />}><Definicoes /></Suspense>
          } />
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App

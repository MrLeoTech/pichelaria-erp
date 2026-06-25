import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { useServiceFilters } from '../../hooks/useServiceFilters.js'
import { useToast } from '../../hooks/useToast.js'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import ServiceFilters from '../../components/ServiceFilters/ServiceFilters.jsx'
import ServiceTable from '../../components/ServiceTable/ServiceTable.jsx'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx'
import ToastContainer from '../../components/Toast/ToastContainer.jsx'
import { useMobile } from '../../hooks/useMobile.js'
import { useNavigate } from 'react-router-dom'

export default function Servicos() {
  const navigate = useNavigate()
  const { servicos, setServicos } = useApp()
  const { filters, setFilters, filtered, resetFilters } = useServiceFilters(servicos)
  const { toasts, addToast, removeToast } = useToast()
  const isMobile = useMobile()

  const [deleteModal, setDeleteModal] = useState({ open: false, servico: null })

  const handleDelete = (servico) => {
    setDeleteModal({ open: true, servico })
  }

  const confirmDelete = () => {
    if (!deleteModal.servico) return
    setServicos(prev => prev.filter(s => s.id !== deleteModal.servico.id))
    addToast('Serviço eliminado com sucesso.', 'success')
    setDeleteModal({ open: false, servico: null })
  }

  const handleDuplicate = (servico) => {
    const novo = {
      ...servico,
      id: crypto.randomUUID(),
      numero: `S-${String(servicos.length + 1).padStart(4, '0')}`,
      data: new Date().toISOString().split('T')[0],
      estado: 'Orçamento',
    }
    setServicos(prev => [...prev, novo])
    addToast('Serviço duplicado com sucesso.', 'success')
  }

  const handleEdit = (servico) => {
    navigate(`/novo-servico?edit=${servico.id}`)
  }

  const handleView = (servico) => {
    navigate(`/servicos/${servico.id}`)
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <DeleteModal
        isOpen={deleteModal.open}
        servico={deleteModal.servico}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ open: false, servico: null })}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Serviços</h1>
          <p className="text-sm text-text-muted mt-1">
            {filtered.length} serviço{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => navigate('/novo-servico')}
          className="px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold
            hover:bg-primary-dark transition-colors shadow-sm self-start sm:self-auto"
        >
          + Novo Serviço
        </button>
      </div>

      <div className="space-y-4">
        <SearchBar
          value={filters.search}
          onChange={v => setFilters({ ...filters, search: v })}
          placeholder="Pesquisar por nome, telefone, nº ou morada..."
        />
        <ServiceFilters filters={filters} onChange={setFilters} />
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {filtered.map(s => (
            <ServiceCard
              key={s.id}
              servico={s}
              onView={handleView}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <ServiceTable
          servicos={filtered}
          onView={handleView}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

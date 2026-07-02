import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { useServiceFilters } from '../../hooks/useServiceFilters.js'
import { useToast } from '../../hooks/useToast.js'
import { useIndustry } from '../../hooks/useIndustry.js'
import { getNextServiceNumber } from '../../utils/serviceUtils.js'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import ServiceFilters from '../../components/ServiceFilters/ServiceFilters.jsx'
import ServiceTable from '../../components/ServiceTable/ServiceTable.jsx'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx'
import ToastContainer from '../../components/Toast/ToastContainer.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import { useMobile } from '../../hooks/useMobile.js'
import { useNavigate } from 'react-router-dom'

export default function Servicos() {
  const navigate = useNavigate()
  const { servicos, setServicos } = useApp()
  const { labels, prefix } = useIndustry()
  const { filters, setFilters, filtered } = useServiceFilters(servicos)
  const { toasts, addToast, removeToast } = useToast()
  const isMobile = useMobile()

  const [deleteModal, setDeleteModal] = useState({ open: false, servico: null })

  const handleDelete = (servico) => {
    setDeleteModal({ open: true, servico })
  }

  const confirmDelete = () => {
    if (!deleteModal.servico) return
    setServicos(prev => prev.filter(s => s.id !== deleteModal.servico.id))
    addToast(`${labels.service} eliminado com sucesso.`, 'success')
    setDeleteModal({ open: false, servico: null })
  }

  const handleDuplicate = (servico) => {
    const novo = {
      ...servico,
      id: crypto.randomUUID(),
      numero: getNextServiceNumber(servicos, prefix),
      data: new Date().toISOString().split('T')[0],
      estado: 'Orçamento',
    }
    setServicos(prev => [...prev, novo])
    addToast(`${labels.service} duplicado com sucesso.`, 'success')
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
          <h1 className="text-xl sm:text-2xl font-bold text-text">{labels.services}</h1>
          <p className="text-sm text-text-muted mt-1">
            {filtered.length} {filtered.length === 1 ? labels.service.toLowerCase() : labels.services.toLowerCase()} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => navigate('/novo-servico')}
          className="px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold
            hover:bg-primary-dark transition-colors shadow-sm self-start sm:self-auto min-h-[48px]"
        >
          + {labels.newService}
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

      {filtered.length === 0 ? (
        <EmptyState message={`Nenhum ${labels.service.toLowerCase()} encontrado.`} />
      ) : isMobile ? (
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

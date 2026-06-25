import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { useClients } from '../../hooks/useClients.js'
import { useToast } from '../../hooks/useToast.js'
import { getClientStats } from '../../utils/clientUtils.js'
import ClientSearch from '../../components/ClientSearch/ClientSearch.jsx'
import ClientTable from '../../components/ClientTable/ClientTable.jsx'
import ClientCard from '../../components/ClientCard/ClientCard.jsx'
import ClientForm from '../../components/ClientForm/ClientForm.jsx'
import ClientStats from '../../components/ClientStats/ClientStats.jsx'
import DeleteClientModal from '../../components/DeleteClientModal/DeleteClientModal.jsx'
import ToastContainer from '../../components/Toast/ToastContainer.jsx'
import { useMobile } from '../../hooks/useMobile.js'
import { emptyClient } from '../../utils/clientUtils.js'

const filters = ['Todos', 'Com serviços', 'Sem serviços']
const sorts = [
  { value: 'nome_asc', label: 'Nome A-Z' },
  { value: 'nome_desc', label: 'Nome Z-A' },
  { value: 'faturacao', label: 'Mais faturação' },
  { value: 'servicos', label: 'Mais serviços' },
  { value: 'ultimo', label: 'Último serviço' },
]

export default function Clientes() {
  const navigate = useNavigate()
  const { clientes, servicos } = useApp()
  const { addClient, updateClient, deleteClient, hasServices } = useClients()
  const { toasts, addToast, removeToast } = useToast()
  const isMobile = useMobile()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [sort, setSort] = useState('nome_asc')
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [form, setForm] = useState(emptyClient())
  const [deleteModal, setDeleteModal] = useState({ open: false, cliente: null })

  const enrichedClientes = useMemo(() => {
    return clientes.map(c => {
      const stats = getClientStats(c, servicos)
      return { ...c, ...stats }
    })
  }, [clientes, servicos])

  const filtered = useMemo(() => {
    let result = [...enrichedClientes]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(c =>
        (c.clienteNome || '').toLowerCase().includes(q) ||
        (c.clienteTelefone || '').toLowerCase().includes(q) ||
        (c.clienteEmail || '').toLowerCase().includes(q) ||
        (c.clienteCidade || '').toLowerCase().includes(q) ||
        (c.clienteNif || '').toLowerCase().includes(q)
      )
    }

    if (filter === 'Com serviços') result = result.filter(c => c.numServicos > 0)
    if (filter === 'Sem serviços') result = result.filter(c => c.numServicos === 0)

    switch (sort) {
      case 'nome_asc': result.sort((a, b) => a.clienteNome.localeCompare(b.clienteNome)); break
      case 'nome_desc': result.sort((a, b) => b.clienteNome.localeCompare(a.clienteNome)); break
      case 'faturacao': result.sort((a, b) => (b.totalFaturado || 0) - (a.totalFaturado || 0)); break
      case 'servicos': result.sort((a, b) => (b.numServicos || 0) - (a.numServicos || 0)); break
      case 'ultimo': result.sort((a, b) => new Date(b.ultimaData || 0) - new Date(a.ultimaData || 0)); break
    }

    return result
  }, [enrichedClientes, search, filter, sort])

  const handleNew = () => {
    setEditingClient(null)
    setForm(emptyClient())
    setShowForm(true)
  }

  const handleEdit = (cliente) => {
    setEditingClient(cliente)
    setForm({ ...cliente })
    setShowForm(true)
  }

  const handleSubmit = () => {
    if (editingClient) {
      updateClient(editingClient.id, form)
      addToast('Cliente atualizado com sucesso!', 'success')
    } else {
      addClient(form)
      addToast('Cliente criado com sucesso!', 'success')
    }
    setShowForm(false)
    setForm(emptyClient())
  }

  const handleDelete = (cliente) => {
    setDeleteModal({ open: true, cliente })
  }

  const confirmDelete = () => {
    if (!deleteModal.cliente) return
    deleteClient(deleteModal.cliente.id)
    addToast('Cliente eliminado com sucesso!', 'success')
    setDeleteModal({ open: false, cliente: null })
  }

  const updateFormField = useCallback((key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <DeleteClientModal
        isOpen={deleteModal.open}
        cliente={deleteModal.cliente}
        hasServices={deleteModal.cliente ? hasServices(deleteModal.cliente.clienteNome) : false}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ open: false, cliente: null })}
      />

      <ClientStats clientes={enrichedClientes} servicos={servicos} />

      {showForm ? (
        <ClientForm
          form={form}
          onChange={updateFormField}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          isEditing={!!editingClient}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text">Clientes</h1>
              <p className="text-sm text-text-muted mt-1">{filtered.length} cliente{filtered.length !== 1 ? 's' : ''}</p>
            </div>
            <button onClick={handleNew}
              className="px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm self-start sm:self-auto">
              + Novo Cliente
            </button>
          </div>

          <div className="space-y-4">
            <ClientSearch value={search} onChange={setSearch} />

            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${filter === f ? 'bg-primary text-white' : 'bg-bg border border-border text-text-muted hover:border-accent'}`}>
                  {f}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {sorts.map(s => (
                <button key={s.value} onClick={() => setSort(s.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${sort === s.value ? 'bg-accent text-white' : 'bg-bg border border-border text-text-muted hover:border-accent'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {isMobile ? (
            <div className="space-y-3">
              {filtered.map(c => (
                <ClientCard key={c.id} cliente={c}
                  onView={() => navigate(`/clientes/${c.id}`)}
                  onEdit={() => handleEdit(c)}
                  onDelete={() => handleDelete(c)}
                />
              ))}
            </div>
          ) : (
            <ClientTable clientes={filtered}
              onView={(c) => navigate(`/clientes/${c.id}`)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  )
}

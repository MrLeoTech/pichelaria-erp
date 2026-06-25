import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useServicoForm } from '../../hooks/useServicoForm.js'
import { useToast } from '../../hooks/useToast.js'
import { useApp } from '../../context/AppContext.jsx'
import ClienteForm from '../../components/ClienteForm/ClienteForm.jsx'
import ServicoForm from '../../components/ServicoForm/ServicoForm.jsx'
import PecasForm from '../../components/PecasForm/PecasForm.jsx'
import MaoObraForm from '../../components/MaoObraForm/MaoObraForm.jsx'
import OutrosCustosForm from '../../components/OutrosCustosForm/OutrosCustosForm.jsx'
import TotaisPanel from '../../components/TotaisPanel/TotaisPanel.jsx'
import ToastContainer from '../../components/Toast/ToastContainer.jsx'
import { Save, RotateCcw, X } from 'lucide-react'

export default function NovoServico() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const { servicos, setServicos, config } = useApp()
  const { toasts, addToast, removeToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const {
    form, setForm, updateField,
    addPeca, removePeca, duplicatePeca, updatePeca,
    totals, resetForm, saveServico,
  } = useServicoForm()

  // Load existing service for editing
  useEffect(() => {
    if (editId) {
      const existing = servicos.find(s => s.id === editId)
      if (existing) {
        setForm(existing)
        setIsEditing(true)
      }
    }
  }, [editId, servicos, setForm])

  const handleSave = () => {
    if (!form.clienteNome.trim()) {
      addToast('O nome do cliente é obrigatório.', 'error')
      return
    }

    if (isEditing) {
      setServicos(prev => prev.map(s => s.id === editId ? { ...form, ...totals } : s))
      addToast('Serviço atualizado com sucesso!', 'success')
      navigate('/servicos')
    } else {
      saveServico()
      addToast('Serviço guardado com sucesso!', 'success')
      resetForm()
    }
  }

  const handleClear = () => {
    if (isEditing) {
      const existing = servicos.find(s => s.id === editId)
      if (existing) setForm(existing)
    } else {
      resetForm()
    }
    addToast('Formulário limpo.', 'info')
  }

  const handleCancel = () => {
    navigate('/servicos')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">
            {isEditing ? 'Editar Serviço' : 'Novo Serviço'}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {isEditing ? `A editar ${form.numero}` : 'Registar um novo serviço de pichelaria'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ClienteForm form={form} updateField={updateField} />
          <ServicoForm form={form} updateField={updateField} />
          <PecasForm
            pecas={form.pecas}
            onAdd={addPeca}
            onRemove={removePeca}
            onDuplicate={duplicatePeca}
            onUpdate={updatePeca}
          />
          <MaoObraForm form={form} updateField={updateField} />
          <OutrosCustosForm form={form} updateField={updateField} />
        </div>

        <div className="space-y-6">
          <div className="lg:sticky lg:top-4 space-y-6">
            <TotaisPanel
              totals={totals}
              ivaAtivo={form.ivaAtivo}
              onToggleIva={() => updateField('ivaAtivo', !form.ivaAtivo)}
              config={config}
            />

            <div className="bg-surface rounded-xl border border-border shadow-sm p-5 space-y-3">
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                  bg-primary text-white text-sm font-semibold hover:bg-primary-dark
                  transition-colors shadow-sm"
              >
                <Save size={16} />
                {isEditing ? 'Guardar Alterações' : 'Guardar Serviço'}
              </button>
              <button
                onClick={handleClear}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                  bg-bg border border-border text-text text-sm font-medium
                  hover:bg-slate-100 transition-colors"
              >
                <RotateCcw size={16} />
                Limpar
              </button>
              <button
                onClick={handleCancel}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                  bg-bg border border-border text-danger text-sm font-medium
                  hover:bg-danger/5 transition-colors"
              >
                <X size={16} />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

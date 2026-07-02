import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useServicoForm } from '../../hooks/useServicoForm.js'
import { useToast } from '../../hooks/useToast.js'
import { useApp } from '../../context/AppContext.jsx'
import { useIndustry } from '../../hooks/useIndustry.js'
import { useMobile } from '../../hooks/useMobile.js'
import ClienteForm from '../../components/ClienteForm/ClienteForm.jsx'
import ServicoForm from '../../components/ServicoForm/ServicoForm.jsx'
import PecasForm from '../../components/PecasForm/PecasForm.jsx'
import MaoObraForm from '../../components/MaoObraForm/MaoObraForm.jsx'
import OutrosCustosForm from '../../components/OutrosCustosForm/OutrosCustosForm.jsx'
import TotaisPanel from '../../components/TotaisPanel/TotaisPanel.jsx'
import MobileActionBar from '../../components/MobileActionBar/MobileActionBar.jsx'
import ToastContainer from '../../components/Toast/ToastContainer.jsx'
import { Save, RotateCcw, X } from 'lucide-react'

export default function NovoServico() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const isMobile = useMobile()

  const { servicos, setServicos, settings } = useApp()
  const { labels } = useIndustry()
  const { toasts, addToast, removeToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const {
    form, setForm, updateField,
    addPeca, removePeca, duplicatePeca, updatePeca,
    totals, resetForm, saveServico,
  } = useServicoForm()

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
      addToast(`${labels.service} atualizado com sucesso!`, 'success')
      navigate('/servicos')
    } else {
      const saved = saveServico()
      addToast(`${labels.service} guardado com sucesso!`, 'success')
      resetForm([...servicos, saved])
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

  const saveLabel = isEditing ? 'Guardar' : `Guardar ${labels.service}`

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-text">
          {isEditing ? `Editar ${labels.service}` : labels.newService}
        </h1>
        <p className="text-sm text-text-muted mt-1">
          {isEditing ? `A editar ${form.numero}` : labels.newServiceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ClienteForm form={form} updateField={updateField} />
          <ServicoForm form={form} updateField={updateField} descPlaceholder={labels.serviceDescPlaceholder} />
          <PecasForm
            pecas={form.pecas}
            partsLabel={labels.parts}
            partLabel={labels.part}
            onAdd={addPeca}
            onRemove={removePeca}
            onDuplicate={duplicatePeca}
            onUpdate={updatePeca}
          />
          <MaoObraForm form={form} updateField={updateField} laborLabel={labels.labor} />
          <OutrosCustosForm form={form} updateField={updateField} costsLabel={labels.otherCosts} />
        </div>

        <div className="space-y-6">
          <div className="lg:sticky lg:top-4 space-y-6">
            <TotaisPanel
              totals={totals}
              ivaAtivo={form.ivaAtivo}
              onToggleIva={() => updateField('ivaAtivo', !form.ivaAtivo)}
              config={settings}
              partsLabel={labels.parts}
              laborLabel={labels.labor}
            />

            {!isMobile && (
              <div className="bg-surface rounded-xl border border-border shadow-sm p-5 space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
                    bg-primary text-white text-sm font-semibold hover:bg-primary-dark
                    transition-colors shadow-sm min-h-[48px]"
                >
                  <Save size={16} />
                  {isEditing ? 'Guardar Alterações' : saveLabel}
                </button>
                <button
                  onClick={handleClear}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
                    bg-bg border border-border text-text text-sm font-medium
                    hover:bg-slate-100 transition-colors min-h-[48px]"
                >
                  <RotateCcw size={16} />
                  Limpar
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
                    bg-bg border border-border text-danger text-sm font-medium
                    hover:bg-danger/5 transition-colors min-h-[48px]"
                >
                  <X size={16} />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <MobileActionBar
          onSave={handleSave}
          onClear={handleClear}
          onCancel={handleCancel}
          saveLabel={saveLabel}
        />
      )}
    </div>
  )
}

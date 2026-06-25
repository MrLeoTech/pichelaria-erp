import { useRef, useState } from 'react'
import Card from '../Card/Card.jsx'
import { useToast } from '../../hooks/useToast.js'
import { downloadBackup, parseBackup } from '../../utils/backupUtils.js'
import { Download, Upload, AlertTriangle } from 'lucide-react'

export default function BackupPanel({ clientes, servicos, settings, onRestore }) {
  const { toasts, addToast, removeToast } = useToast()
  const fileRef = useRef(null)
  const [confirmRestore, setConfirmRestore] = useState(null)

  const handleExport = () => {
    downloadBackup(clientes, servicos, settings)
    addToast('Backup exportado com sucesso!', 'success')
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = parseBackup(ev.target.result)
        setConfirmRestore(data)
      } catch (err) {
        addToast(err.message, 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleConfirmRestore = () => {
    if (!confirmRestore) return
    onRestore(confirmRestore)
    setConfirmRestore(null)
    addToast('Dados restaurados com sucesso!', 'success')
  }

  return (
    <Card title="Backup & Restauro" icon={Download}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white
              text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
            <Download size={16} /> Exportar Backup
          </button>
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface
              text-sm font-medium text-text hover:bg-bg transition-colors">
            <Upload size={16} /> Importar Backup
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleFileSelect} className="hidden" />
        </div>

        {confirmRestore && (
          <div className="p-4 rounded-xl border border-warning bg-warning/5 space-y-3">
            <div className="flex items-center gap-2 text-warning">
              <AlertTriangle size={18} />
              <span className="text-sm font-semibold">Confirmar Restauro</span>
            </div>
            <p className="text-sm text-text-muted">
              Isto vai substituir todos os dados atuais por {confirmRestore.clientes.length} clientes e {confirmRestore.servicos.length} serviços.
            </p>
            <div className="flex gap-2">
              <button onClick={handleConfirmRestore}
                className="px-4 py-2 rounded-lg bg-warning text-white text-sm font-semibold hover:bg-amber-600 transition-colors">
                Confirmar Substituição
              </button>
              <button onClick={() => setConfirmRestore(null)}
                className="px-4 py-2 rounded-lg border border-border bg-bg text-sm font-medium text-text hover:bg-slate-100 transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

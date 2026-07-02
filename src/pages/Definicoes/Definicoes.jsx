import { useApp } from '../../context/AppContext.jsx'
import { useSettings } from '../../hooks/useSettings.js'
import { useToast } from '../../hooks/useToast.js'
import CompanyForm from '../../components/CompanyForm/CompanyForm.jsx'
import FinancialSettings from '../../components/FinancialSettings/FinancialSettings.jsx'
import PdfSettings from '../../components/PdfSettings/PdfSettings.jsx'
import ThemeSettings from '../../components/ThemeSettings/ThemeSettings.jsx'
import IndustrySettings from '../../components/IndustrySettings/IndustrySettings.jsx'
import BackupPanel from '../../components/BackupPanel/BackupPanel.jsx'
import StatisticsPanel from '../../components/StatisticsPanel/StatisticsPanel.jsx'
import ToastContainer from '../../components/Toast/ToastContainer.jsx'
import { Settings } from 'lucide-react'

export default function Definicoes() {
  const { clientes, setClientes, servicos, setServicos } = useApp()
  const { settings, updateField } = useSettings()
  const { toasts, addToast, removeToast } = useToast()

  const handleRestore = (data) => {
    setClientes(data.clientes)
    setServicos(data.servicos)
    const merged = { ...settings, ...data.settings }
    Object.entries(merged).forEach(([k, v]) => updateField(k, v))
    addToast('Dados restaurados com sucesso!', 'success')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex items-center gap-3">
        <Settings size={24} className="text-accent shrink-0" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text">Definições</h1>
          <p className="text-sm text-text-muted">Configurações da aplicação e da empresa</p>
        </div>
      </div>

      <div className="space-y-6">
        <IndustrySettings settings={settings} onChange={updateField} />
        <CompanyForm settings={settings} onChange={updateField} />
        <FinancialSettings settings={settings} onChange={updateField} />
        <PdfSettings settings={settings} onChange={updateField} />
        <ThemeSettings settings={settings} onChange={updateField} />
        <BackupPanel
          clientes={clientes}
          servicos={servicos}
          settings={settings}
          onRestore={handleRestore}
        />
        <StatisticsPanel clientes={clientes} servicos={servicos} />
      </div>
    </div>
  )
}

import { useApp } from '../../context/AppContext.jsx'
import { useSettings } from '../../hooks/useSettings.js'
import { useToast } from '../../hooks/useToast.js'
import CompanyForm from '../../components/CompanyForm/CompanyForm.jsx'
import FinancialSettings from '../../components/FinancialSettings/FinancialSettings.jsx'
import PdfSettings from '../../components/PdfSettings/PdfSettings.jsx'
import ThemeSettings from '../../components/ThemeSettings/ThemeSettings.jsx'
import BackupPanel from '../../components/BackupPanel/BackupPanel.jsx'
import StatisticsPanel from '../../components/StatisticsPanel/StatisticsPanel.jsx'
import ToastContainer from '../../components/Toast/ToastContainer.jsx'
import { Settings } from 'lucide-react'

export default function Definicoes() {
  const { clientes, setClientes, servicos, setServicos, config, setConfig } = useApp()
  const { settings, updateField } = useSettings()
  const { toasts, addToast, removeToast } = useToast()

  // Sync settings with existing config
  const handleFieldChange = (field, value) => {
    updateField(field, value)
    // Sync financial settings with existing config
    if (field === 'ivaPercentagem') setConfig(prev => ({ ...prev, ivaPercentagem: value }))
    if (field === 'precoHoraPadrao') setConfig(prev => ({ ...prev, precoHoraPadrao: value }))
    if (field === 'empresaNome') setConfig(prev => ({ ...prev, empresaNome: value }))
    if (field === 'empresaNif') setConfig(prev => ({ ...prev, empresaNif: value }))
    if (field === 'empresaMorada') setConfig(prev => ({ ...prev, empresaMorada: value }))
  }

  const handleRestore = (data) => {
    setClientes(data.clientes)
    setServicos(data.servicos)
    // Merge settings
    const merged = { ...settings, ...data.settings }
    Object.entries(merged).forEach(([k, v]) => updateField(k, v))
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex items-center gap-3">
        <Settings size={24} className="text-accent" />
        <div>
          <h1 className="text-2xl font-bold text-text">Definições</h1>
          <p className="text-sm text-text-muted">Configurações da aplicação e da empresa</p>
        </div>
      </div>

      <div className="space-y-6">
        <CompanyForm settings={settings} onChange={handleFieldChange} />
        <FinancialSettings settings={settings} onChange={handleFieldChange} />
        <PdfSettings settings={settings} onChange={handleFieldChange} />
        <ThemeSettings settings={settings} onChange={handleFieldChange} />
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

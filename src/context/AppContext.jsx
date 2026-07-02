import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loadSettings, saveSettings, applyThemeSettings } from '../utils/settingsUtils.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('pichelaria_clientes')
    return saved ? JSON.parse(saved) : []
  })

  const [servicos, setServicos] = useState(() => {
    const saved = localStorage.getItem('pichelaria_servicos')
    return saved ? JSON.parse(saved) : []
  })

  const [settings, setSettingsState] = useState(() => loadSettings())

  useEffect(() => {
    localStorage.setItem('pichelaria_clientes', JSON.stringify(clientes))
  }, [clientes])

  useEffect(() => {
    localStorage.setItem('pichelaria_servicos', JSON.stringify(servicos))
  }, [servicos])

  useEffect(() => {
    saveSettings(settings)
    applyThemeSettings(settings)
  }, [settings])

  const updateSetting = useCallback((field, value) => {
    setSettingsState(prev => ({ ...prev, [field]: value }))
  }, [])

  const setSettings = useCallback((newSettings) => {
    setSettingsState(prev => ({ ...prev, ...newSettings }))
  }, [])

  const value = {
    clientes, setClientes,
    servicos, setServicos,
    settings,
    setSettings,
    updateSetting,
    // Legacy alias for gradual migration
    config: settings,
    setConfig: setSettings,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider')
  return ctx
}

import { createContext, useContext, useState, useEffect } from 'react'
import { loadSettings } from '../utils/settingsUtils.js'

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

  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('pichelaria_config')
    const settings = loadSettings()
    const base = saved ? JSON.parse(saved) : {
      ivaPercentagem: 23,
      precoHoraPadrao: 25,
      empresaNome: 'Pichelaria',
      empresaNif: '',
      empresaMorada: ''
    }
    return { ...base, ...settings }
  })

  useEffect(() => {
    localStorage.setItem('pichelaria_clientes', JSON.stringify(clientes))
  }, [clientes])

  useEffect(() => {
    localStorage.setItem('pichelaria_servicos', JSON.stringify(servicos))
  }, [servicos])

  useEffect(() => {
    localStorage.setItem('pichelaria_config', JSON.stringify(config))
  }, [config])

  const value = {
    clientes, setClientes,
    servicos, setServicos,
    config, setConfig
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

export const defaultSettings = {
  // Industry
  areaTrabalho: 'geral',

  // Company
  empresaNome: '',
  empresaLogo: '',
  empresaTelefone: '',
  empresaTelemovel: '',
  empresaEmail: '',
  empresaWebsite: '',
  empresaNif: '',
  empresaMorada: '',
  empresaCodigoPostal: '',
  empresaCidade: '',
  empresaPais: 'Portugal',

  // Financial
  ivaPercentagem: 23,
  precoHoraPadrao: 25,
  moeda: 'EUR',
  simboloMoeda: '€',
  casasDecimais: 2,

  // PDF
  pdfRodape: 'Obrigado pela preferência!',
  pdfMensagem: 'Documento gerado automaticamente',
  pdfObservacoes: '',

  // Theme
  corPrincipal: '#1e3a5f',
  corSecundaria: '#3b82f6',
  temaEscuro: false,
}

const CONFIG_KEYS = ['ivaPercentagem', 'precoHoraPadrao', 'empresaNome', 'empresaNif', 'empresaMorada']

export function loadSettings() {
  try {
    const saved = localStorage.getItem('pichelaria_settings')
    let settings = saved ? { ...defaultSettings, ...JSON.parse(saved) } : { ...defaultSettings }

    // Migrate legacy pichelaria_config into unified settings
    const legacyConfig = localStorage.getItem('pichelaria_config')
    if (legacyConfig) {
      try {
        const config = JSON.parse(legacyConfig)
        CONFIG_KEYS.forEach(key => {
          if (config[key] !== undefined && config[key] !== '') {
            settings[key] = config[key]
          }
        })
        saveSettings(settings)
        localStorage.removeItem('pichelaria_config')
      } catch {
        /* ignore corrupt legacy data */
      }
    }

    return settings
  } catch {
    return { ...defaultSettings }
  }
}

export function saveSettings(settings) {
  localStorage.setItem('pichelaria_settings', JSON.stringify(settings))
}

export function resetSettings() {
  localStorage.setItem('pichelaria_settings', JSON.stringify(defaultSettings))
  return { ...defaultSettings }
}

import { APP_NAME } from '../config/appConfig.js'

export function applyThemeSettings(settings) {
  const root = document.documentElement
  root.classList.toggle('dark', !!settings.temaEscuro)
  root.style.setProperty('--color-primary', settings.corPrincipal || defaultSettings.corPrincipal)
  root.style.setProperty('--color-accent', settings.corSecundaria || defaultSettings.corSecundaria)
  root.style.setProperty('--color-primary-dark', adjustColor(settings.corPrincipal || defaultSettings.corPrincipal, -20))
  const company = settings.empresaNome?.trim()
  document.title = company ? `${company} — ${APP_NAME}` : APP_NAME
}

function adjustColor(hex, amount) {
  try {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.min(255, Math.max(0, (num >> 16) + amount))
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
    const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  } catch {
    return '#152a45'
  }
}

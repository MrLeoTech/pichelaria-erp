export const defaultSettings = {
  // Company
  empresaNome: 'Pichelaria',
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

export function loadSettings() {
  try {
    const saved = localStorage.getItem('pichelaria_settings')
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : { ...defaultSettings }
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

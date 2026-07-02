import { useState, useCallback, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { findClientByName, createClientFromService } from '../utils/clientUtils.js'
import { getNextServiceNumber } from '../utils/serviceUtils.js'
import { getIndustryProfile } from '../config/industryProfiles.js'

const emptyPeca = () => ({
  id: crypto.randomUUID(),
  nome: '',
  fornecedor: '',
  quantidade: 1,
  precoCompra: 0,
  precoVenda: 0,
})

const emptyServico = () => ({
  id: crypto.randomUUID(),
  numero: '',
  data: new Date().toISOString().split('T')[0],
  clienteNome: '',
  clienteTelefone: '',
  clienteEmail: '',
  clienteMorada: '',
  clienteCodigoPostal: '',
  clienteCidade: '',
  clienteNif: '',
  descricao: '',
  observacoes: '',
  estado: 'Orçamento',
  pecas: [emptyPeca()],
  maoObraModo: 'fixo',
  maoObraValor: 0,
  maoObraHoras: 1,
  maoObraPrecoHora: 25,
  custoDeslocacao: 0,
  custoConsumiveis: 0,
  custoOutros: 0,
  ivaAtivo: true,
})

export function useServicoForm() {
  const { servicos, setServicos, clientes, setClientes, settings } = useApp()
  const [form, setForm] = useState(emptyServico)

  const prefix = getIndustryProfile(settings.areaTrabalho).prefix

  useEffect(() => {
    setForm(prev => {
      if (prev.numero) return prev
      return { ...prev, numero: getNextServiceNumber(servicos, prefix) }
    })
  }, [servicos, prefix])

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const addPeca = useCallback(() => {
    setForm(prev => ({ ...prev, pecas: [...prev.pecas, emptyPeca()] }))
  }, [])

  const removePeca = useCallback((pecaId) => {
    setForm(prev => ({ ...prev, pecas: prev.pecas.filter(p => p.id !== pecaId) }))
  }, [])

  const duplicatePeca = useCallback((pecaId) => {
    setForm(prev => {
      const idx = prev.pecas.findIndex(p => p.id === pecaId)
      if (idx === -1) return prev
      const copy = { ...prev.pecas[idx], id: crypto.randomUUID() }
      const newPecas = [...prev.pecas]
      newPecas.splice(idx + 1, 0, copy)
      return { ...prev, pecas: newPecas }
    })
  }, [])

  const updatePeca = useCallback((pecaId, field, value) => {
    setForm(prev => ({
      ...prev,
      pecas: prev.pecas.map(p => p.id === pecaId ? { ...p, [field]: value } : p)
    }))
  }, [])

  const calcular = useCallback(() => {
    const totalCompraPecas = form.pecas.reduce((sum, p) => {
      const q = Number(p.quantidade) || 0
      const pc = Number(p.precoCompra) || 0
      return sum + (q * pc)
    }, 0)

    const totalVendaPecas = form.pecas.reduce((sum, p) => {
      const q = Number(p.quantidade) || 0
      const pv = Number(p.precoVenda) || 0
      return sum + (q * pv)
    }, 0)

    const maoObra = form.maoObraModo === 'fixo'
      ? Number(form.maoObraValor) || 0
      : (Number(form.maoObraHoras) || 0) * (Number(form.maoObraPrecoHora) || 0)

    const outrosCustos =
      (Number(form.custoDeslocacao) || 0) +
      (Number(form.custoConsumiveis) || 0) +
      (Number(form.custoOutros) || 0)

    const subtotal = totalVendaPecas + maoObra + outrosCustos
    const ivaValor = form.ivaAtivo ? subtotal * (settings.ivaPercentagem / 100) : 0
    const totalCliente = subtotal + ivaValor
    const lucro = totalCliente - totalCompraPecas - outrosCustos
    const margem = subtotal > 0 ? (lucro / subtotal) * 100 : 0

    return { totalCompraPecas, totalVendaPecas, maoObra, outrosCustos, subtotal, ivaValor, totalCliente, lucro, margem }
  }, [form, settings.ivaPercentagem])

  const totals = calcular()

  const resetForm = useCallback((servicosOverride) => {
    const list = servicosOverride ?? servicos
    setForm({
      ...emptyServico(),
      numero: getNextServiceNumber(list, prefix),
      maoObraPrecoHora: settings.precoHoraPadrao,
    })
  }, [servicos, prefix, settings.precoHoraPadrao])

  const autoLinkClient = useCallback(() => {
    const nome = form.clienteNome?.trim()
    if (!nome) return
    const existing = findClientByName(clientes, nome)
    if (!existing) {
      const novo = createClientFromService(form)
      setClientes(prev => [...prev, novo])
    }
  }, [form, clientes, setClientes])

  const saveServico = useCallback(() => {
    autoLinkClient()
    const servicoCompleto = {
      ...form,
      ...totals,
      clienteNome: form.clienteNome.trim() || 'Cliente sem nome',
    }
    setServicos(prev => [...prev, servicoCompleto])
    return servicoCompleto
  }, [form, totals, setServicos, autoLinkClient])

  return {
    form, setForm, updateField,
    addPeca, removePeca, duplicatePeca, updatePeca,
    totals, resetForm, saveServico,
  }
}

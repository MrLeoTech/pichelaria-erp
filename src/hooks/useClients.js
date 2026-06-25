import { useState, useCallback } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { createClientFromService, findClientByName } from '../utils/clientUtils.js'

export function useClients() {
  const { clientes, setClientes, servicos } = useApp()

  const addClient = useCallback((cliente) => {
    setClientes(prev => [...prev, { ...cliente, id: crypto.randomUUID() }])
  }, [setClientes])

  const updateClient = useCallback((id, data) => {
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...data } : c))
  }, [setClientes])

  const deleteClient = useCallback((id) => {
    setClientes(prev => prev.filter(c => c.id !== id))
  }, [setClientes])

  const getClientServices = useCallback((clienteNome) => {
    return servicos.filter(s => s.clienteNome === clienteNome)
  }, [servicos])

  const hasServices = useCallback((clienteNome) => {
    return servicos.some(s => s.clienteNome === clienteNome)
  }, [servicos])

  const autoLinkOrCreateClient = useCallback((serviceData) => {
    const existing = findClientByName(clientes, serviceData.clienteNome)
    if (existing) return existing

    const novo = createClientFromService(serviceData)
    setClientes(prev => [...prev, novo])
    return novo
  }, [clientes, setClientes])

  return {
    clientes,
    addClient,
    updateClient,
    deleteClient,
    getClientServices,
    hasServices,
    autoLinkOrCreateClient,
  }
}

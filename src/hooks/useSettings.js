import { useState, useEffect, useCallback } from 'react'
import { loadSettings, saveSettings } from '../utils/settingsUtils.js'

export function useSettings() {
  const [settings, setSettingsState] = useState(() => loadSettings())

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  const setSettings = useCallback((newSettings) => {
    setSettingsState(prev => ({ ...prev, ...newSettings }))
  }, [])

  const updateField = useCallback((field, value) => {
    setSettingsState(prev => ({ ...prev, [field]: value }))
  }, [])

  const reset = useCallback(() => {
    setSettingsState(loadSettings())
  }, [])

  return { settings, setSettings, updateField, reset }
}

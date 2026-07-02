import { useApp } from '../context/AppContext.jsx'
import { loadSettings as loadSettingsFromStorage } from '../utils/settingsUtils.js'

export function useSettings() {
  const { settings, setSettings, updateSetting } = useApp()
  return {
    settings,
    setSettings,
    updateField: updateSetting,
    reset: () => setSettings(loadSettingsFromStorage()),
  }
}

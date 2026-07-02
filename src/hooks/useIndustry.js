import { useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { getIndustryProfile } from '../config/industryProfiles.js'

export function useIndustry() {
  const { settings } = useApp()

  return useMemo(() => {
    const profile = getIndustryProfile(settings.areaTrabalho)
    const appName = settings.empresaNome?.trim() || profile.name
    return {
      profile,
      labels: profile.labels,
      prefix: profile.prefix,
      appName,
      fullName: `${appName} ERP`,
    }
  }, [settings.areaTrabalho, settings.empresaNome])
}

import { useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { getIndustryProfile } from '../config/industryProfiles.js'
import { APP_NAME } from '../config/appConfig.js'

export { APP_NAME } from '../config/appConfig.js'

export function useIndustry() {
  const { settings } = useApp()

  return useMemo(() => {
    const profile = getIndustryProfile(settings.areaTrabalho)
    const companyName = settings.empresaNome?.trim() || ''
    return {
      profile,
      labels: profile.labels,
      prefix: profile.prefix,
      appName: APP_NAME,
      companyName,
      fullName: APP_NAME,
      sidebarSubtitle: companyName || profile.tagline,
    }
  }, [settings.areaTrabalho, settings.empresaNome])
}

import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import BottomNav from '../BottomNav/BottomNav.jsx'
import { useMobile } from '../../hooks/useMobile.js'
import { useState, useEffect } from 'react'

export default function Layout() {
  const isMobile = useMobile()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isFormPage = location.pathname === '/novo-servico'

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="flex h-dvh bg-bg overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        <main
          className={`flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6
            ${isMobile ? (isFormPage ? 'mobile-content-form' : 'mobile-content') : ''}`}
          id="main-content"
          role="main"
        >
          <Outlet />
        </main>
        {!isMobile && <Footer />}
        {isMobile && <BottomNav />}
      </div>
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

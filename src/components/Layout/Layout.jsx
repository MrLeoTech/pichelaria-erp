import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import { useMobile } from '../../hooks/useMobile.js'
import { useState } from 'react'

export default function Layout() {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6" id="main-content" role="main">
          <Outlet />
        </main>
        <Footer />
      </div>
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

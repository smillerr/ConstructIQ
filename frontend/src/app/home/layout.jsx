import Footer from '@/ui/common/Footer'
import SideNav from '@/ui/common/Sidenav'

const HomeLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        <SideNav />
        {/* Second column (Main Content) */}
        <div className="flex-grow p-6 md:p-12 overflow-y-auto">
          {/* Main Content */}
          {children}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomeLayout

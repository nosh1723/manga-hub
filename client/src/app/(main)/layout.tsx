
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { LayoutProps } from '@/models'

const MainLayout = ({children}: LayoutProps) => {
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout
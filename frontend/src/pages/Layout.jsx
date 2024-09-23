import { Outlet } from 'react-router-dom'
import { Header } from '../components'

function Layout() {
    return (
        <>            
            <div className='dark:bg-background-primary bg-gray-50 min-h-screen'>
                <Header />
                <Outlet />
            </div>
        </>
    )
}

export default Layout
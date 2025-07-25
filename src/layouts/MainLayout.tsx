import Header from '../shared/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
    <Header />
    <Outlet />
    <h1>footer</h1>
    </>
  )
}

export default MainLayout
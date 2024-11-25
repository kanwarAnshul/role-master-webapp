import { Outlet } from 'react-router-dom'
import TabBar from '../Components/Header'

const HomeLayout = () => {
  return (
    <>
      <TabBar />
      <Outlet/>
    </>
  )
}

export default HomeLayout

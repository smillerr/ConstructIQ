import UsersListSkeleton from '@/ui/common/Skeletons/Users/UsersListSkeleton'
import UserList from '@/ui/user/UserList'
import { Suspense } from 'react'

const Usuarios = () => {
  return (
    <>
      <Suspense fallback={<UsersListSkeleton />}>
        <UserList />
      </Suspense>
    </>
  )
}

export default Usuarios

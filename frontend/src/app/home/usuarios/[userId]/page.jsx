import EditUserForm from '@/ui/user/EditUserForm'

const EditUser = (props) => {
  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Gestion de usuarios</h1>
      </div>
      <EditUserForm userId={props.params.userId} />
    </>
  )
}

export default EditUser

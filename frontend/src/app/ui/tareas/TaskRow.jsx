import { Avatar, AvatarGroup } from '@mui/material'
import Link from 'next/link'

const TaskRow = ({
  id,
  name,
  status,
  constructionId,
  constructionName,
  personal,
}) => {
  return (
    <div className="border-b border-gray-300 py-2 flex justify-between items-center overflow-hidden">
      <p className="w-3/5">
        <Link
          href={{
            pathname: `/home/tareas/${id}`,
            query: {
              cid: constructionId,
              cname: constructionName,
            },
          }}
          className="text-blue-600"
        >
          {name}
        </Link>
      </p>
      <p className="text-gray-600 w-1/5">{status}</p>
      <AvatarGroup max={4} className="w-1/5">
        {personal?.map((trabajador) => (
          <Avatar
            key={trabajador.id}
            alt={trabajador.nombre}
            src={trabajador.foto_perfil}
          />
        ))}
      </AvatarGroup>
    </div>
  )
}

export default TaskRow

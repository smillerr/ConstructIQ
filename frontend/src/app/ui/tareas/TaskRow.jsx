import { Avatar, AvatarGroup } from '@mui/material'
import Link from 'next/link'

const TaskRow = ({ id, name, status, constructionId, constructionName }) => {
  return (
    <div className="border-b border-gray-300 py-2 flex justify-between items-center">
      <p>
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
      <p className="text-gray-600">{status}</p>
      <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
    </div>
  )
}

export default TaskRow

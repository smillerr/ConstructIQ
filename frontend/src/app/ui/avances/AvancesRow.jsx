import Link from 'next/link'

const AvancesRow = ({
  id,
  description,
  porcentaje,
  constructionId,
  constructionName,
  necesidades,
}) => {
  return (
    <div className="border-b border-gray-300 py-2 flex justify-between items-center overflow-hidden">
      <p className="w-3/5">
        <Link
          href={{
            pathname: `/home/avances/${id}`,
            query: {
              cid: constructionId,
              cname: constructionName,
            },
          }}
          className="text-blue-600"
        >
          {description}
        </Link>
      </p>
      <p className="text-gray-600 w-1/5">{porcentaje} %</p>
      <p className="text-gray-600 w-1/5">{necesidades}</p>
    </div>
  )
}

export default AvancesRow

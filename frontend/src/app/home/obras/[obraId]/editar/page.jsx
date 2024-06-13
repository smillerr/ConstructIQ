import EditObraForm from '@/ui/obras/EditObraForm'
import { ArrowBack } from '@mui/icons-material'
import Link from 'next/link'
export default async function EditarObraPage(props) {
  return (
    <>
      <div className="p-4 flex justify-start items-center">
        <Link className="mr-4" href={`/home/obras/${props.params.obraId}`}>
          <ArrowBack className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl">Editar obra</h1>
      </div>
      <EditObraForm obraId={props.params.obraId} />
    </>
  )
}

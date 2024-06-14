import AvanceForm from '@/ui/avances/AvancesForm'

export default async function CrearAvance(props) {
  return (
    <>
      <h1 className="text-3xl mb-6 text-gray-500">Nuevo avance</h1>
      <AvanceForm
        relatedId={props.searchParams.cid}
        relatedName={props.searchParams.cname}
      />
    </>
  )
}

import Link from 'next/link'

export default async function NoAccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center">
      <h1 className="text-4xl font-bold mb-4">Acceso Denegado</h1>
      <p className="text-lg mb-4">
        Parece ser que antes tenías acceso al sistema, pero ya no.
      </p>
      <Link href={'/'} className="text-blue-500 hover:underline">
        Volver a la página principal
      </Link>
    </div>
  )
}

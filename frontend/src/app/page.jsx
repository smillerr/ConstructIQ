import UserLoginForm from './ui/user/UserLoginForm'

export default function Home() {
  return (
    <section className="bg-white ">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <UserLoginForm />
      </div>
    </section>
  )
}

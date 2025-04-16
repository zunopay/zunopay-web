import { LoginForm } from "@/components/forms/LoginForm";

export default async function LoginPage() {
  return (
    <main className="container flex flex-col max-w-sm mb-8">
      <LoginForm />
    </main>
  )
}
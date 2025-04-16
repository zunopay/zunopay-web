import { RegisterForm } from "@/components/forms/RegisterForm";

export default async function LoginPage() {
  return (
    <main className="container flex flex-col max-w-sm mb-8">
      <RegisterForm />
    </main>
  )
}
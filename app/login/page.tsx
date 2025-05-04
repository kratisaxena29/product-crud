import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - CRM Application",
  description: "Login to your CRM account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          {/* <h1 className="text-3xl  text-gray font-extrabold tracking-tight lg:text-4xl">CRM Application</h1> */}
          <h1 className="text-3xl text-white font-extrabold tracking-tight lg:text-4xl">CRM Application</h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

import { useState } from "react"
import { Button } from "~/components/Button"
import { Feedback } from "~/components/Feedback"
import { Input } from "~/components/Form"
import { MailIcon } from "~/components/Icons"

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const forgotPassword = async (e: any) => {
    setError("")
    setSuccess(false)
    setLoading(true)
    e.preventDefault()

    try {
      const data = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }).then((rsp) => rsp.json())

      if (!data.ok) {
        setError(data.message || "Something went wrong!")
      } else {
        setSuccess(true)
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form
        onSubmit={forgotPassword}
        className="max-w-[500px] m-auto p-15 mt-12"
      >
        <h2 className="text-center pb-4 font-bold text-2xl">
          Request a new password
        </h2>
        <p className="text-grayscale-500 text-bodyM max-w-xs block mx-auto text-center mb-10">
          Enter your email and we will send you a magic link to reset your
          password
        </p>
        <div className="mb-5">
          <Input
            IconBefore={MailIcon}
            label="Email"
            id="email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <Feedback variant="error" message={error} />}
        {success && (
          <Feedback
            variant="success"
            message="Check your email for instructions"
          />
        )}
        <Button type="submit" disabled={!email} loading={loading}>
          Request Password
        </Button>
      </form>
    </>
  )
}

export default ResetPassword

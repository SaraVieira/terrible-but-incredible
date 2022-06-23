import { useRouter } from "next/router"
import { Button } from "~/components/Button"
import { Feedback } from "~/components/Feedback"
import { Input } from "~/components/Form"
import { MailIcon, PasswordIcon } from "~/components/Icons"
import { PasswordMeter } from "~/components/PasswordMetter"
import { useSignup } from "~/utils/hooks/useRegistration"

const SignUp = () => {
  const router = useRouter()
  const {
    createUser,
    error,
    setPassword,
    setEmail,
    setRepeatPassword,
    password,
    isFilledIn,
  } = useSignup()

  const createAccount = (e) => createUser(e, router)

  return (
    <>
      <form
        onSubmit={createAccount}
        className="max-w-[500px] m-auto p-15 h-full justify-center flex flex-col"
      >
        <h2 className="pb-8 font-bold text-2xl">Sign up</h2>
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
        <div className="mb-5">
          <Input
            IconBefore={PasswordIcon}
            label="Password"
            required
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <PasswordMeter password={password} />
        <div className="mb-5">
          <Input
            IconBefore={PasswordIcon}
            label="Repeat Password"
            id="repeat-password"
            required
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {error && <Feedback variant="error" message={error} />}
        <Button type="submit" disabled={!isFilledIn()}>
          Create Account
        </Button>
      </form>
    </>
  )
}

export default SignUp

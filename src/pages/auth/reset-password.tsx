import { useRouter } from "next/router"
import { Button } from "~/components/Button"
import { Feedback } from "~/components/Feedback"
import { Input } from "~/components/Form"
import { PasswordIcon } from "~/components/Icons"
import { PasswordMeter } from "~/components/PasswordMetter"

import { useResetPassword } from "~/utils/hooks/useRegistration"

const ResetPassword = () => {
  const router = useRouter()
  const {
    updatePassword,
    error,
    setPassword,
    password,
    setRepeatPassword,
    isFilledIn,
  } = useResetPassword()

  return (
    <>
      <form
        onSubmit={(e) => updatePassword(e, router)}
        className="max-w-[500px] m-auto p-15 mt-12"
      >
        <h2 className="text-center pb-4 font-bold text-2xl">
          Create a new password
        </h2>
        <p className="text-grayscale-500 text-bodyM max-w-xs block mx-auto text-center mb-10">
          Please enter a new password
        </p>

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
          Update Password
        </Button>
      </form>
    </>
  )
}

export default ResetPassword

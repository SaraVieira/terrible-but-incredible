import { PasswordMeter } from "password-meter"
import { useMemo } from "react"

export const STEPS = [40, 100, 180] as [number, number, number]

export const usePasswordStrenght = (password: string) => {
  const strong = useMemo(() => {
    return new PasswordMeter(
      {},
      {
        [STEPS[0]]: { label: "Weak", bg: "bg-primary-500" },
        [STEPS[1]]: { label: "Not bad", bg: "bg-yellow" },
        [STEPS[2]]: { label: "Good", bg: "bg-yellow" },
        _: { label: "Incredible!", bg: "bg-green" },
      }
    ).getResult(password)
  }, [password]) as unknown as {
    score: number
    status: {
      bg: string
      label: string
    }
  }

  return strong
}

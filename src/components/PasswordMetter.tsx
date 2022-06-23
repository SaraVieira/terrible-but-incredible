import classNames from "classnames"
import { STEPS, usePasswordStrenght } from "~/utils/hooks/usePasswordStrenght"

export const PasswordMeter = ({ password }) => {
  const { status, score } = usePasswordStrenght(password)
  return (
    <div className="grid grid-cols-5 gap-5 mb-4 -mt-3 items-center">
      <div
        className={classNames("h-2 rounded-md bg-primary-500", status?.bg)}
      ></div>
      <div
        className={classNames(
          score > STEPS[0] ? status?.bg : "bg-grayscale-200",
          "h-2 rounded-md",
          status?.bg
        )}
      ></div>
      <div
        className={classNames(
          score > STEPS[1] ? status?.bg : "bg-grayscale-200",
          "h-2 rounded-md"
        )}
      ></div>{" "}
      <div
        className={classNames(
          score > STEPS[2] ? status.bg : "bg-grayscale-200",
          "h-2 rounded-md"
        )}
      ></div>
      <p className=" text-grayscale-500 text-bodyM">{status.label || "Weak"}</p>
    </div>
  )
}

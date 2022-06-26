import classNames from "classnames"
import { omit } from "lodash"
import { forwardRef, ReactElement } from "react"

export const Label = ({ children, ...props }) => (
  <label className="block mb-2 opacity-50" {...props}>
    {children}
  </label>
)

// eslint-disable-next-line react/display-name
export const Input = forwardRef((props: any, ref): ReactElement => {
  const { IconBefore, label, id, name, ...rest } = props
  return (
    <>
      <Label htmlFor={name || id} className="sr-only">
        {label}
      </Label>
      <div className="relative">
        {IconBefore && (
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <IconBefore className="text-grayscale-400" />
          </div>
        )}
        <input
          placeholder={label}
          className={classNames(
            "rounded-xl border-[1px] border-grayscale-200 focus:!border-yellow focus:outline-none focus:ring-0 ring-yellow w-full min-h-[48px] placeholder:text-grayscale-400 pr-7 text-grayscale-900 text-sm transition-all dark:bg-grayscale-900 dark:text-grayscale-50 dark:border-grayscale-700",
            IconBefore && "pl-12"
          )}
          ref={ref}
          {...rest}
        />
      </div>
    </>
  )
})

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef(
  (props: any, ref: any): ReactElement => (
    <>
      <Label htmlFor={props.name || props.id}>{props.label}</Label>
      <textarea
        className={classNames(
          "rounded-xl border-2 border-grayscale-200 focus:!border-yellow focus:outline-none focus:ring-0 ring-yellow w-full min-h-[48px] placeholder:text-grayscale-400 pr-7 text-grayscale-900 text-sm transition-all dark:bg-grayscale-900 dark:text-grayscale-50 dark:border-transparent",
          props.classNames
        )}
        ref={ref}
        {...omit(props, "className")}
      />
    </>
  )
)

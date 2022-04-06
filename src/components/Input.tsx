/* eslint-disable react/jsx-props-no-spreading */
// Component for all different inputs

import { InputHTMLAttributes, useRef, useState } from "react";

function Input({
  type = "text",
  value,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  const classes: {
    [key: string]: string;
  } = {
    text: "hover:transition-colors p-2 outline-none bg-gray-100 dark:bg-gray-700 rounded border border-transparent focus:border-gray-300 dark:focus:border-gray-500 text-inherit focus:text-inherit",
    submit:
      "p-2 rounded cursor-pointer hover:transition-colors text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800",
    reset:
      "p-2 rounded cursor-pointer hover:transition-colors text-white bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 active:bg-gray-600 dark:active:bg-gray-700",
    button:
      "p-2 rounded cursor-pointer hover:transition-colors text-white bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 active:bg-gray-600 dark:active:bg-gray-700"
  };

  return (
    <input
      className={`${classes[type] ?? classes.text} ${className}`}
      type={type}
      value={value}
      {...rest}
    />
  );
}

export function FileInput({
  children,
  id,
  accept = "image/*",
  className,
  onChange
}: InputHTMLAttributes<HTMLInputElement>) {
  const [file, setFile] = useState<File | null>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <button onClick={() => inputEl.current?.click()} type="button">
      <div
        className={
          className ??
          "w-full text-blue-600 dark:text-white bg-blue-200 dark:bg-blue-600 ring-1 ring-transparent active:ring-blue-400 p-2 rounded transition-all font-semibold select-none"
        }
      >
        {children ?? (!file ? "Upload file" : <>{file.name} uploaded</>)}
      </div>
      <input
        ref={inputEl}
        className="hidden"
        id={id}
        type="file"
        onChange={handleChange}
        accept={accept}
        aria-hidden
      />
    </button>
  );
}

export function TextArea({
  value,
  onChange,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${className} resize-none hover:transition-colors p-2 outline-none bg-gray-100 dark:bg-gray-700 rounded border border-transparent focus:border-gray-300 dark:focus:border-gray-500`}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;

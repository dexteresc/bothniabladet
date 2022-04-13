/* eslint-disable react/jsx-props-no-spreading */
// Component for all different inputs

import {
  ChangeEvent,
  Component,
  createRef,
  InputHTMLAttributes,
  ReactNode
} from "react";

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

type FileInputProps = InputHTMLAttributes<HTMLInputElement>;
type FileInputState = { files: FileList | null };
export class FileInput extends Component<FileInputProps, FileInputState> {
  inputEl = createRef<HTMLInputElement>();

  constructor(props: FileInputProps) {
    super(props);
    this.state = {
      files: null
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const { onChange } = this.props;
    if (files && files.length > 0) {
      this.setState({
        files
      });
    }

    if (onChange) {
      onChange(e);
    }
  };

  render(): ReactNode {
    const { accept, className, children, id } = this.props;
    const { files } = this.state;
    return (
      <button onClick={() => this.inputEl.current?.click()} type="button">
        <div
          className={
            className ??
            "w-full text-blue-600 dark:text-white bg-blue-200 dark:bg-blue-600 ring-1 ring-transparent active:ring-blue-400 p-2 rounded transition-all font-semibold select-none"
          }
        >
          {children ??
            (files && files.length > 0 ? (
              <>
                {files.length} file{files.length > 1 && "s"} selected
              </>
            ) : (
              "Select file"
            ))}
        </div>
        <input
          ref={this.inputEl}
          className="hidden"
          id={id}
          type="file"
          onChange={this.handleChange}
          accept={accept}
          aria-hidden
        />
      </button>
    );
  }
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

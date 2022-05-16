/* eslint-disable react/jsx-props-no-spreading */
import {
  ChangeEvent,
  Component,
  createRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState
} from "react";
import Icon from "./Icon";

const Input = forwardRef(
  (
    {
      type = "text",
      value,
      className = "",

      ...rest
    }: InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const classes: {
      [key: string]: string;
    } = {
      text: "hover:transition-colors p-2 outline-none bg-gray-100 dark:bg-gray-700 rounded ring-1 ring-inset ring-transparent focus:ring-gray-300 dark:focus:ring-gray-500 text-inherit focus:text-inherit",
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
        ref={ref}
        {...rest}
      />
    );
  }
);

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
      className={`${className} resize-none hover:transition-colors p-2 outline-none bg-gray-100 dark:bg-gray-700 rounded ring-1 ring-inset ring-transparent focus:ring-gray-300 dark:focus:ring-gray-500`}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

interface SelectType {
  id: number;
  name: string;
  [key: string]: any;
}

function SelectItem({
  option,
  isSelected,
  toggle
}: {
  option: SelectType;
  isSelected: boolean;
  toggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      className={`flex items-center justify-between mb-1 ring-1 ring-gray-200 dark:ring-gray-700 ring-inset rounded py-1 px-2 outline-none ${
        isSelected ? "bg-gray-200 dark:bg-gray-600" : "bg-transparent"
      }`}
      onClick={toggle}
    >
      <div
        className={
          isSelected
            ? "text-gray-900 dark:text-gray-100"
            : "text-gray-700 dark:text-gray-400"
        }
      >
        {option.name}
      </div>
      <Icon
        value={isSelected ? "check_box" : "check_box_outline_blank"}
        className="ml-2 text-gray-600 dark:text-gray-500"
      />
    </button>
  );
}

export function SelectList({
  className = "",
  options,
  selected,
  setSelected,
  searchable = false
}: {
  className?: string;
  options: SelectType[];
  selected: SelectType[];
  setSelected: (newSelected: SelectType[]) => void;
  searchable?: boolean;
}) {
  const toggleSelected = (option: SelectType) => {
    const newSelected = selected.includes(option);
    if (newSelected) {
      setSelected(selected.filter((s) => s !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (searchable) {
      const filtered = options.filter((option) =>
        option.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [search, options, searchable]);
  return (
    <>
      {/* Searchbar */}
      {searchable && (
        <div className="flex flex-col my-2 border-b pb-2">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
            placeholder="Search"
          />
        </div>
      )}
      <div className={`flex flex-col ${className}`} role="listbox">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem
              key={option.id}
              option={option}
              isSelected={selected.includes(option)}
              toggle={() => toggleSelected(option)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center my-2">
            No results
          </div>
        )}
      </div>
    </>
  );
}

export default Input;

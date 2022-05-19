export default function Icon({
  value,
  className
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} material-icons text-xl select-none w-7 flex items-center justify-center`}
    >
      {value}
    </span>
  );
}

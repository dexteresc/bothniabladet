export default function Icon({
  value,
  className
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} material-icons text-xl select-none w-7 ${
        className?.includes("flex") ?? "flex"
      } items-center justify-center`}
    >
      {value}
    </span>
  );
}

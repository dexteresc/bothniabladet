import loadingSvg from "@/assets/loading.svg";

function Loading({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full ${className}`}
    >
      <img src={loadingSvg} alt="Loading..." />
    </div>
  );
}

export default Loading;

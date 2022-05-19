import { ReactNode } from "react";

function Image({
  className = "",
  url,
  alt,
  owned
}: {
  className?: string;
  url: string;
  alt?: string;
  owned?: boolean;
}) {
  return (
    <div className="relative rounded">
      <img
        src={`http://localhost:8080${url}/download`}
        alt={alt}
        className={className}
      />
      {owned && (
        // add square in top right corner
        <div className="absolute top-0 right-0 bg-yellow-500 h-4 w-4 rounded-tr-lg" />
      )}
    </div>
  );
}

export function ImageDownload({
  children,
  className = "",
  download,
  url
}: {
  children: ReactNode;
  className?: string;
  url: string;
  download: string;
}) {
  return (
    <a
      href={`http://localhost:8080${url}/download`}
      download={download}
      className={className}
    >
      {children}
    </a>
  );
}
export default Image;

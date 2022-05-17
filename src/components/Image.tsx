import { ReactNode } from "react";

function Image({
  className = "",
  url,
  alt
}: {
  className?: string;
  url: string;
  alt?: string;
}) {
  return (
    <img
      src={`http://localhost:8080${url}/download`}
      alt={alt}
      className={className}
    />
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

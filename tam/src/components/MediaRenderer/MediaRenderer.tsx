import React from 'react';

interface MediaRendererProps {
  file: {
    url: string;
    contentType: string;
  };
  alt?: string;
  fallbackMediaPath?: string;
  loop?: boolean;
  className?: string;
}

const MediaRenderer = ({
  file, alt, fallbackMediaPath, loop, className,
}: MediaRendererProps) => {
  const logoMediaType = file?.contentType?.split('/')[0];

  if (logoMediaType === 'image') {
    return (
      <img src={file.url} alt={alt} className={className} />
    );
  }

  if (logoMediaType === 'video') {
    return (
      <video autoPlay muted loop={loop} className={className}>
        <source src={file.url} type={file.contentType} />
        Your browser does not support the video playback.
      </video>
    );
  }

  if (fallbackMediaPath) {
    return <img src={fallbackMediaPath} alt={alt} className={className} />;
  }

  return null;
};

export default MediaRenderer;

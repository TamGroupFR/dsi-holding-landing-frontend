import React from 'react';
import shareIcon from '../../assets/icon/share.svg';

const ShareButton = ({ url, title, buttonText }: { url: string; title: string; buttonText: string }) => {
  const handleShare = async () => {
    const shareData = {
      title,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const desktopShareUrl = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(
          shareData.url,
        )}`;
        window.location.href = desktopShareUrl;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button type="button" onClick={handleShare} className="flex items-center hover:text-blue-500 fill-current">
      <img src={shareIcon} alt="download" className="md:mr-2.5 mb-0.5" />
      <span className="hidden md:block">{buttonText}</span>
    </button>
  );
};

export default ShareButton;

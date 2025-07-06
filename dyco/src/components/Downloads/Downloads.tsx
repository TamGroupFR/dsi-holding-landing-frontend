import React from 'react';
import downloadIcon from '../../assets/icon/download.svg';
import Header from '../Header/Header';
import { DownloadProps } from '../../interfaces/download.interface';
import { getDate } from '../../helpers/getDate';

interface DownloadsProps {
  downloads: DownloadProps[];
  title: string;
  button: string;
  fourCols?: boolean;
}

const Downloads = ({
  downloads,
  title,
  button,
  fourCols,
}: DownloadsProps) => (
  <div className="flex flex-col w-full">
    <Header title={title} icon />
    <div className={`grid grid-cols-1 md:grid-cols-3 ${fourCols ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}  gap-6`}>
      {downloads.map(({
        title: downloadTitle,
        file,
        updatedAt,
        thumbnail,
      }) => (
        <div
          className="rounded-md border border-gray-100 bg-white py-6 px-4 w-full max-w-[358px] lg:max-w-[292px] flex flex-col justify-end"
          key={downloadTitle}
        >
          <div className="w-full flex">
            {thumbnail?.file.url && (
              <img src={thumbnail.file.url} alt={title} className="w-1/2" />
            )}
          </div>
          <h4 className="font-medium text-lg mt-4 truncate-lines-2">{downloadTitle}</h4>
          { updatedAt && (
            <p className="text-sm mt-3 border-b border-gray-100 pb-4 text-gray-500">{getDate(updatedAt)}</p>
          )}
          <div className="mt-4 flex">
            { file?.url && (
              <a href={file.url} download={title} target="blank">
                <button type="button" className="text-base flex font-bold">
                  <img src={downloadIcon} alt="download" className="mr-2" />
                  {button}
                </button>
              </a>
            )}
            { file?.size && (
              <span className="text-sm  ml-5">{(file.size / 1000000).toFixed(2)} MB</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Downloads;

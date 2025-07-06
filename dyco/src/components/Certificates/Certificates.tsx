import React, { useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import iconDownload from '../../assets/img/download.svg';
import {
  CertificatesItemProps,
  CertificatesProps,
} from '../../interfaces/company.interface';
import { ImageProps } from '../../interfaces/products.interface';
import Header from '../Header/Header';

const Certificates = ({
  approvalItems,
  approvalTitle,
  productionTitle,
  productionItems,
  certificatesTitle,
  certificateColumnsTitle,
  certificatesItems,
  productsLink,
}: CertificatesProps) => {
  const [trHover, setTrHover] = useState<null | string>(null);
  const renderStyles = (index: number) => {
    switch (index) {
      case 0:
        return '100px';
      case 1:
        return '500px';
      case 2:
        return '115px';
      case 3:
        return '305px';
      default:
        return '200px';
    }
  };

  const certificatesRowsMap = new Map();

  certificatesItems?.forEach((item: any) => {
    const name = item.product && item.product.name
      ? `${item.type} ${item.product.name}`
      : item.name;
    if (!certificatesRowsMap.has(name)) {
      certificatesRowsMap.set(name, []);
    }
    certificatesRowsMap.get(name).push(item);
  });

  const renderRows = (
    name: string,
    symbol: ImageProps,
    file?: {
      url: string;
      title: string;
    },
  ) => (
    <>
      <td className="table-td border border-dark-navy p-2">
        <div className="w-full max-h-[50px]">
          <GatsbyImage
            image={symbol.gatsbyImageData}
            alt={symbol.title}
            className="w-full max-h-[50px] bg-contain"
            objectFit="contain"
          />
        </div>
      </td>
      <td className="table-td border border-dark-navy p-2 font-medium">
        {file ? (
          <a
            href={file.url}
            target="_blank"
            download={file?.title}
            rel="noreferrer"
          >
            {name}
          </a>
        ) : (
          name
        )}
      </td>
      <td className="table-td border border-dark-navy p-2">
        {file ? (
          <a
            href={file.url}
            target="_blank"
            download={file?.title}
            rel="noreferrer"
          >
            <img src={iconDownload} alt={name} className="mx-auto" />
          </a>
        ) : null}
      </td>
    </>
  );

  return (
    <div className="pt-8 pb-32">
      <section className="container">
        <Header title={approvalTitle} icon />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {approvalItems.map(({ description, image: itemImage }) => (
            <div key={description.childMarkdownRemark.html}>
              <div className="w-36 h-36 mx-auto">
                <GatsbyImage
                  image={itemImage.gatsbyImageData}
                  alt={itemImage.title}
                  className="w-full h-full bg-cover"
                />
              </div>
              <div
                className="mt-4 text-center text-body-14 html-link"
                dangerouslySetInnerHTML={{
                  __html: description.childMarkdownRemark.html,
                }}
              />
            </div>
          ))}
        </div>
        {productionTitle && (
        <h2 className="text-title-5 font-bold text-black uppercase mb-8">
          {productionTitle}
        </h2>
        )}
        <div className="flex flex-col w-full mb-12">
          {productionItems?.map(({ title, description }) => (
            <div
              key={title}
              className="flex flex-col md:flex-row text-body-14 w-full mb-5"
            >
              <p className="uppercase font-bold w-full md:w-1/5 md:max-w-[200px] mb-2 md:mb-0">
                {title}
              </p>
              <div
                className="font-medium w-full md:w-4/5 md:ml-4 html-link"
                dangerouslySetInnerHTML={{
                  __html: description.childMarkdownRemark.html,
                }}
              />
            </div>
          ))}
        </div>
        {certificatesTitle && (
        <h2 className="text-title-5 font-bold text-black uppercase mb-8">
          {certificatesTitle}
        </h2>
        )}
        <div className="overflow-x-auto">
          <table
            className="table-approvals table table-bordered table-fixed overflow-x-auto"
            style={{ width: '1020px' }}
          >
            <tbody className="table-tbody">
              <tr className="table-tr bg-dark-navy">
                {certificateColumnsTitle?.map((item, index) => (
                  <th
                    key={item}
                    style={{ width: renderStyles(index) }}
                    className="border border-dark-navy p-4 text-body-14 text-left text-white"
                  >
                    {item}
                  </th>
                ))}
              </tr>
              {Array.from(certificatesRowsMap).map(
                ([typeRow, rows]: [string, CertificatesItemProps[]]) => {
                  return rows.map(
                    ({
                      name, file, symbol, product, type,
                    }, index) => (
                      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                      <tr
                        className={`table-tr ${
                          trHover && trHover.includes(name) ? 'table-hover' : ''
                        }`}
                        key={name}
                        onMouseOver={() => setTrHover(`${typeRow}-${name}`)}
                        onMouseLeave={() => setTrHover(null)}
                      >
                        {index === 0 ? (
                          <>
                            {renderRows(name, symbol, file)}
                            <td
                              rowSpan={rows.length}
                              className={`table-td border border-dark-navy p-2 ${
                                trHover && trHover.includes(typeRow)
                                  ? 'table-hover'
                                  : ''
                              }`}
                            >
                              {type && product && (
                              <p className="font-bold">
                                {type}
                                {' '}
                                <Link
                                  className="text-primary font-bold"
                                  to={`/${productsLink}/${product.subcategory.category[0].slug}/${product.subcategory.slug}/${product.slug}`}
                                >
                                  {product.name}
                                </Link>
                              </p>
                              )}
                            </td>
                          </>
                        ) : (
                          renderRows(name, symbol, file)
                        )}
                      </tr>
                    ),
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Certificates;

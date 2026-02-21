import { Link, useSearchParams } from "react-router";

// Imges
import arrowLeft from "../../assets/arrow_left.svg";
import arrowRight from "../../assets/arrow_right.svg";

// Utils
import { generatePages } from "../../libs/utils/pagination";

export default function ItemPagination({ currentPage, totalPage }) {
  const [searchParams] = useSearchParams();
  const pages = generatePages(currentPage, totalPage);

  const getPageLink = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    return `?${params.toString()}`;
  };

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPage, currentPage + 1);

  return (
    <div className="flex justify-center gap-1">
      <PaginationArrow direction="left" href={getPageLink(prevPage)} />

      {pages.map((num) => (
        <PageNumber
          key={num}
          number={num}
          isActive={num === currentPage}
          href={getPageLink(num)}
        />
      ))}

      <PaginationArrow direction="right" href={getPageLink(nextPage)} />
    </div>
  );
}

const PaginationArrow = ({ direction, href }) => {
  const isLeft = direction === "left";
  const icon = isLeft ? arrowLeft : arrowRight;
  const altText = isLeft ? "이전 페이지" : "다음 페이지";

  return (
    <Link
      to={href}
      className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full"
    >
      <img src={icon} alt={altText} className="w-4 h-4" />
    </Link>
  );
};

const PageNumber = ({ number, isActive, href }) => {
  return (
    <Link
      to={href}
      className={`flex items-center justify-center w-10 h-10 rounded-full border
        ${
          isActive
            ? "bg-primary text-white border-primary font-bold"
            : "bg-white text-gray-600 border-gray-200"
        }`}
    >
      {number}
    </Link>
  );
};

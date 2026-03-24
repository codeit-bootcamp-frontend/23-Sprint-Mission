import { useEffect, useState, forwardRef, useRef } from "react";
import { getComment } from "../../libs/api/product";

import KebabIcon from "../../assets/icons/ic_kebab.svg";
import { formatRelativeTime } from "../../libs/utils/formatDate";
import { useOutsideClick } from "../../libs/hooks/useOutsideClick";

export default function ProductComment({ productId }) {
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getComment(productId);
        setCommentList(res.data.list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetch();
  }, [productId]);

  if (loading)
    return <div className="py-10 text-center text-gray-400">loading</div>;

  return (
    <div className="mt-8 space-y-6">
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

const CommentItem = ({ comment }) => {
  const { content, writer, createdAt } = comment;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  return (
    <div className="border-b border-gray-100 pb-6 last:border-0">
      <p className="text-[14px] md:text-[16px] text-gray-800 font-medium mb-4 leading-relaxed whitespace-pre-wrap">
        {content}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={writer.image}
            alt={`${writer.nickname} 프로필`}
            className="w-8 h-8 rounded-full object-cover bg-gray-100"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-600">
              {writer.nickname}
            </span>
            <span className="text-[10px] text-gray-400">
              {formatRelativeTime(createdAt)}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <img src={KebabIcon} alt="메뉴" className="w-6 h-6" />
          </button>

          {isMenuOpen && <DropdownMenu ref={menuRef} />}
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="py-20 text-center text-gray-400 text-sm">
    아직 등록된 문의가 없습니다.
  </div>
);

const DROPDOWN_TEXT_STYLE =
  "w-full px-4 py-2 text-xs md:text-sm hover:bg-gray-50 text-center";

const DropdownMenu = forwardRef(({ onClose }, ref) => (
  <div
    ref={ref}
    className="absolute right-0 top-8 w-20 md:w-24 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden"
  >
    <button
      className={`${DROPDOWN_TEXT_STYLE} text-gray-600 border-b border-gray-50`}
      onClick={onClose}
    >
      수정하기
    </button>
    <button className={`${DROPDOWN_TEXT_STYLE} text-red-500`} onClick={onClose}>
      삭제하기
    </button>
  </div>
));

DropdownMenu.displayName = "DropdownMenu";

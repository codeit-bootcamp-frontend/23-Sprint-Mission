export const generatePages = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = currentPage - 2;

  if (start < 1) start = 1;

  if (start + 4 > totalPages) {
    start = totalPages - 4;
  }

  return Array.from({ length: 5 }, (_, i) => start + i);
};

export const getPageSizes = () => {
  const width = window.innerWidth;
  if (width >= 1024) return { best: 4, all: 10 }; // Desktop
  if (width >= 768) return { best: 2, all: 6 }; // Tablet
  return { BEST_PAGE_SIZE: 1, ALL_PAGE_SIZE: 4 }; // Mobile
};

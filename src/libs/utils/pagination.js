export function generatePages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = currentPage - 2;

  if (start < 1) start = 1;

  if (start + 4 > totalPages) {
    start = totalPages - 4;
  }

  return Array.from({ length: 5 }, (_, i) => start + i);
}

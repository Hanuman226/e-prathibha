export default function usePagination(props) {
  const { totalCount, pageSize, currentPage } = props;

  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const perPageOptions = [5, 10, 20, 25, 30, 50, 100, 200, 500].filter(
    (option) => option <= totalCount
  );

  let entriesLastRange = lastIndex;
  if (currentPage === Math.ceil(totalCount / pageSize)) {
    entriesLastRange = totalCount - (currentPage - 1) * pageSize + firstIndex;
  }
  const entriesFirstRange = firstIndex + 1;

  return [
    firstIndex,
    lastIndex,
    perPageOptions,
    entriesFirstRange,
    entriesLastRange,
  ];
}

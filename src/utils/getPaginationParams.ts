const MAX_ITEMS_PER_PAGE = 20;

export function getPaginationParams(page: number): [number, number] {
  const start = (page - 1) * MAX_ITEMS_PER_PAGE;
  const end = page * MAX_ITEMS_PER_PAGE;

  return [start, end];
}

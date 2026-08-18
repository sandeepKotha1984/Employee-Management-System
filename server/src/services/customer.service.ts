import { claims, Claim, Customer } from "../data/customer.js";

type SortOrder = "asc" | "desc";

export const getClaims = (
  search: string,
  sortBy: string,
  sortOrder: SortOrder,
  startRow: number,
  endRow: number
) => {
  let result = [...claims];

  if (search) {
    const query = search.toLowerCase();

    result = result.filter(
      (claim) =>
        claim.name.toLowerCase().includes(query) ||
        claim.email.toLowerCase().includes(query) ||
        claim.company.toLowerCase().includes(query) ||
        claim.country.toLowerCase().includes(query) ||
        claim.phone.toLowerCase().includes(query)
    );
  }

  result.sort((a, b) => {
    const valueA = a[sortBy as keyof Claim];
    const valueB = b[sortBy as keyof Claim];

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }

    return 0;
  });

  return {
    data: result.slice(startRow, endRow),
    total: result.length,
  };
};

export const getCustomers = getClaims;
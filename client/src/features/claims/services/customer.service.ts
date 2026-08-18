import { Customer } from "../types/customer.types";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

const getApiUrl = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return apiBaseUrl ? `${apiBaseUrl}${normalized}` : normalized;
};

export type CustomerQuery = {
  startRow: number;
  endRow: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type CustomerResponse = {
  data: Customer[];
  total: number;
};

export const getClaims = async ({
  startRow,
  endRow,
  search = "",
  sortBy = "name",
  sortOrder = "asc",
}: CustomerQuery): Promise<CustomerResponse> => {
  const params = new URLSearchParams({
    startRow: String(startRow),
    endRow: String(endRow),
    search,
    sortBy,
    sortOrder,
  });

  const response = await fetch(`${getApiUrl("/api/claims")}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch claims");
  }

  return response.json();
};

export const getCustomers = getClaims;

export const deleteCustomer = async (id: number): Promise<void> => {
  const response = await fetch(getApiUrl(`/api/claims/${id}`), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete claim");
  }
};

export const updateCustomer = async (
  id: number,
  customer: Partial<Customer>
): Promise<Customer> => {
  const response = await fetch(getApiUrl(`/api/claims/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed to update claim");
  }

  return response.json();
};
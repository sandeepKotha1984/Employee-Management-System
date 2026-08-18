import { Customer } from "../types/customer.types";

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

  const response = await fetch(`/api/claims?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch claims");
  }

  return response.json();
};

export const getCustomers = getClaims;

export const deleteCustomer = async (id: number): Promise<void> => {
  const response = await fetch(`/api/claims/${id}`, {
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
  const response = await fetch(`/api/claims/${id}`, {
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
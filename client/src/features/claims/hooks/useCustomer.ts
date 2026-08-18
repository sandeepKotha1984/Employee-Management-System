import { useState } from "react";
import { Customer } from "../types/customer.types";
import { deleteCustomer, updateCustomer } from "../services/customer.service";

export const useClaims = () => {
  const [editingClaim, setEditingClaim] = useState<Customer | null>(null);

  const handleEdit = (customer: Customer) => {
    setEditingClaim(customer);
  };

  const handleDelete = async (customerId: number) => {
    try {
      await deleteCustomer(customerId);
      console.log(`Claim with ID ${customerId} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete claim:", error);
      throw error;
    }
  };

  const handleUpdate = async (id: number, customer: Partial<Customer>) => {
    try {
      const updatedCustomer = await updateCustomer(id, customer);
      setEditingClaim(null);
      return updatedCustomer;
    } catch (error) {
      console.error("Failed to update claim", error);
      throw error;
    }
  };

  return {
    editingClaim,
    handleEdit,
    handleDelete,
    handleUpdate,
  };
};

export const useCustomer = useClaims;

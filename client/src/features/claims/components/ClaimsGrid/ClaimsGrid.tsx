import { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  IDatasource,
} from "ag-grid-community";
import { getCustomers } from "../../services/customer.service";
import { useClaims } from "../../hooks/useCustomer";
import { Customer } from "../../types/customer.types";
import "./ClaimsGrid.css";
import { useAuth } from "@/context/AuthContext";
import ActionsCellRenderer from "./ActionsCellRenderer";
import {  useNavigate } from "react-router-dom";

type ClaimsGridProps = {
  search: string;
};

export default function ClaimsGrid({
  search,
}: ClaimsGridProps) {
  const gridApiRef = useRef<GridApi | null>(null);
  const { handleEdit, handleDelete } = useClaims();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const navigate = useNavigate();

  const onRowClicked = (event: any) => {
    navigate(`/main/${event.data.id}/documents`);
  };

  const columnDefs: ColDef<Customer>[] = [
  {
    headerName: "Customer Name",
    field: "name",
    sortable: true,
    flex: 1.2,
    minWidth: 150,
  },
  {
    headerName: "Company",
    field: "company",
    sortable: true,
    flex: 1,
    minWidth: 140,
  },
  {
    headerName: "Phone Number",
    field: "phone",
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "Email",
    field: "email",
    flex: 1.5,
    minWidth: 200,
  },
  {
    headerName: "Country",
    field: "country",
    sortable: true,
    flex: 0.8,
    minWidth: 120,
  },
  {
    headerName: "Status",
    field: "status",
    flex: 0.8,
    minWidth: 120,
  },

  ...(isAdmin
    ? [
        {
          headerName: "Actions",
          sortable: false,
          filter: false,
          width: 120,
          cellRenderer: ActionsCellRenderer,
          cellRendererParams: {
            onEdit: (data: Customer) => handleEdit(data),
            onDelete: (id: number) => onDeleteCustomer(id),
          },
        },
      ]
    : []),
];

  const onDeleteCustomer = async (id: number) => {
    try {
      await handleDelete(id);
      gridApiRef.current?.purgeInfiniteCache();
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  useEffect(() => {
    if (!gridApiRef.current) return;

    gridApiRef.current.purgeInfiniteCache();
  }, [search]);

 const datasource: IDatasource = {
  getRows: async (params) => {
    const { startRow, endRow, sortModel } = params;

    const sort = sortModel?.[0];

    try {
      const result = await getCustomers({
        startRow,
        endRow,
        search,
        sortBy: sort?.colId || "name",
        sortOrder: sort?.sort || "asc"
      });
      params.successCallback(
        result.data,
        result.total
      );
    } catch (error) {
      console.error("Failed to fetch customers", error);
      params.failCallback();
    }
  },
};


  return (
    <div  style={{ width: "100%", height: "400px" }}>
    <AgGridReact
      rowModelType="infinite"
      datasource={datasource}
      columnDefs={columnDefs}
      cacheBlockSize={50}
      onRowClicked={onRowClicked}
      maxBlocksInCache={5}
      onSortChanged={() => {
        if (!gridApiRef.current) return;
        gridApiRef.current.purgeInfiniteCache();
      }}
      onGridReady={(params) => {
        gridApiRef.current = params.api;
      }}
    />
    </div>
  );
}
import React from "react";
import type { ICellRendererParams } from "ag-grid-community";
import "./ActionsCellRenderer.css";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";

type CellParams = ICellRendererParams & {
  onEdit?: (data: any) => void;
  onDelete?: (id: number) => void;
};

export default function ActionsCellRenderer(params: CellParams) {
  const { data, onEdit, onDelete } = params as any;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(data);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!data) return;
    onDelete?.(data.id);
  };

  return (
    <div className="actions-cell">
      <button className="action-btn edit-btn" onClick={handleEditClick} aria-label="Edit">
        <EditIcon />
      </button>
      <button className="action-btn delete-btn" onClick={handleDeleteClick} aria-label="Delete">
        <DeleteIcon />
      </button>
    </div>
  );
}

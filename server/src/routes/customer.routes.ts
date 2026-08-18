import { Router } from "express";
import { getClaims, getCustomers } from "../services/customer.service.js";

type SortOrder = "asc" | "desc";

const router = Router();

const handleClaimsRequest = (req: any, res: any) => {
  const search = String(req.query.search || "");
  const sortBy = String(req.query.sortBy || "name");
  const sortOrder = (req.query.sortOrder as SortOrder) || "asc";
  const startRow = parseInt(req.query.startRow as string, 10) || 0;
  const endRow = parseInt(req.query.endRow as string, 10) || 20;

  const result = getClaims(search, sortBy, sortOrder, startRow, endRow);
  res.json(result);
};

router.get("/claims", handleClaimsRequest);


export default router;
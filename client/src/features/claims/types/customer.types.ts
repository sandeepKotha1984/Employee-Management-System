export type CustomerStatus = 'Active' | 'Pending' | 'Inactive';

export interface Customer {
  id: number;
  name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  totalSpent: number;
  status: CustomerStatus;
}

export interface CustomerStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}



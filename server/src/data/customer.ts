export type ClaimStatus = "Active" | "Inactive" | "Pending";

export interface Claim {
  id: number;
  name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  totalSpent: number;
  status: ClaimStatus;
}

export type CustomerStatus = ClaimStatus;
export interface Customer extends Claim {}

const firstNames = [
  "Ava", "Liam", "Noah", "Emma", "Mason", "Olivia", "Lucas", "Sophia", "Ethan", "Mia",
  "James", "Isabella", "Benjamin", "Charlotte", "Henry", "Amelia", "Alexander", "Harper", "Daniel", "Evelyn",
  "Michael", "Abigail", "Matthew", "Ella", "Jacob", "Scarlett", "Logan", "Grace", "Jackson", "Chloe",
  "Sebastian", "Lily", "Jack", "Zoe", "Leo", "Nora", "Owen", "Hannah", "Wyatt", "Aria",
  "Julian", "Layla", "Isaac", "Stella", "Gabriel", "Aurora", "Nathan", "Paisley", "Elijah", "Violet"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee",
  "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
  "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez"
];

const companies = [
  "Northwind", "BluePeak", "Summit Works", "Harbor & Co", "Atlas Labs", "Nexa Systems", "Greenstone", "Velora", "Cobalt Group",
  "Riverstone", "LuxeCore", "Fieldstone", "Quanta Tech", "Pinecrest", "Signal Forge", "Brightlane", "Oak & Pine", "Aster Digital",
  "Silverline", "Orbit Labs", "Pioneer One", "Redwood NV", "Prime Logic", "Open Harbor", "Lattice Foundry", "Zenith Works", "Nova Peak"
];

const countries = ["USA", "Canada", "UK", "Germany", "France", "Australia", "India", "Brazil", "Spain", "Japan"];
const statuses: ClaimStatus[] = ["Active", "Inactive", "Pending"];

const randomFrom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const claims: Claim[] = Array.from({ length: 20000 }, (_, index) => {
  const firstName = randomFrom(firstNames);
  const lastName = randomFrom(lastNames);
  const company = randomFrom(companies);
  const country = randomFrom(countries);
  const status = randomFrom(statuses);
  const totalSpent = Math.floor(Math.random() * 9000) + 500;
  const phone = `+${Math.floor(Math.random() * 9000000000) + 1000000000}`;

  return {
    id: index + 1,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@example.com`,
    company,
    country,
    phone,
    totalSpent,
    status
  };
});

export const customers: Claim[] = claims;
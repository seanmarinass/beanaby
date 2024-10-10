import { ContractStatus } from "@/shared/constants";
import { ContractInfo } from "./ContractCard";

export const FAKE_CONTRACT_DATA: ContractInfo[] = [
  {
    contractName: "Office Lease Agreement",
    holderName: "Alice Johnson",
    holderContactNumber: "555-1234",
    amount: 1200,
    startDateString: "Jan 1, 2024",
    endDateString: "Dec 31, 2024",
    contractType: "Lease", // Example contract type
    status: ContractStatus.ACTIVE,
  },
  {
    contractName: "Service Agreement",
    holderName: "Bob Smith",
    holderContactNumber: "555-5678",
    amount: 800,
    startDateString: "Mar 15, 2024",
    endDateString: "Sep 15, 2024",
    contractType: "Service", // Example contract type
    status: ContractStatus.EXPIRED,
  },
  {
    contractName: "Maintenance Contract",
    holderName: "Carol Davis",
    holderContactNumber: "555-8765",
    amount: 450,
    startDateString: "Jun 1, 2024",
    endDateString: "Jun 1, 2025",
    contractType: "Maintenance", // Example contract type
    status: ContractStatus.ACTIVE,
  },
  {
    contractName: "Consulting Agreement",
    holderName: "David Brown",
    holderContactNumber: "555-4321",
    amount: 2000,
    startDateString: "Feb 1, 2024",
    endDateString: "Feb 1, 2025",
    contractType: "Consulting", // Example contract type
    status: ContractStatus.ACTIVE,
  },
  {
    contractName: "Supply Contract",
    holderName: "Emma Wilson",
    holderContactNumber: "555-6789",
    amount: 950,
    startDateString: "May 1, 2024",
    endDateString: "Nov 1, 2024",
    contractType: "Supply", // Example contract type
    status: ContractStatus.EXPIRED,
  },
];

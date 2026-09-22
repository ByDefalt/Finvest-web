import type {AccountDashboard} from "@/modules/dashboard/domain/models/AccountDashboard.ts";

export interface DashboardData {
    totalAccounts: number;
    totalBalance: number;
    totalActiveAccounts: number;
    accounts: AccountDashboard[];
}
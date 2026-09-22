import type {AccountStatus} from "@/modules/dashboard/domain/models/AccountStatus.ts";
import type {AccountOwner} from "@/modules/dashboard/domain/models/AccountOwner.ts";

export interface AccountDashboard{
    id: number;
    bankName: string;
    name: string;
    balance: number;
    currency: string;
    createdAt: string;
    closedAt?: string;
    accountStatus: AccountStatus;
    description?: string;
    type: string;
    accountOwners: AccountOwner[];
}
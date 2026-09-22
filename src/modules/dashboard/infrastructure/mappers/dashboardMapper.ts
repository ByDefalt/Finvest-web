import type {AccountDashboardResponse, DashboardResponse} from "@/modules/dashboard/infrastructure/generated/models";
import type {DashboardData} from "@/modules/dashboard/domain/models/DashboardData.ts";
import type {AccountDashboard} from "@/modules/dashboard/domain/models/AccountDashboard.ts";
import {
    mapAccountOwnerDashboardResponseListToAccountOwnerList
} from "@/modules/dashboard/infrastructure/mappers/AccountMapper.ts";

export function mapDashboardResponseToDashboardData(dashboardResponse: DashboardResponse): DashboardData {
    return {
        totalAccounts: dashboardResponse.totalAccounts,
        totalActiveAccounts: dashboardResponse.totalActiveAccounts,
        totalBalance: dashboardResponse.totalBalance,
        accounts: mapAccountDashboardResponseListToAccountDashboardList(dashboardResponse.accounts),

    }
}

export function mapAccountDashboardResponseToAccountDashboard(accountDashboardResponse: AccountDashboardResponse): AccountDashboard {
    return {
        id: accountDashboardResponse.id,
        bankName: accountDashboardResponse.bankName,
        name: accountDashboardResponse.name,
        balance: accountDashboardResponse.balance,
        currency: accountDashboardResponse.currency,
        createdAt: accountDashboardResponse.createdAt,
        closedAt: accountDashboardResponse.closedAt,
        accountStatus: accountDashboardResponse.accountStatus,
        description: accountDashboardResponse.description,
        type: accountDashboardResponse.type,
        accountOwners: mapAccountOwnerDashboardResponseListToAccountOwnerList(accountDashboardResponse.accountOwners),
    }
}

export function mapAccountDashboardResponseListToAccountDashboardList(accountDashboardResponseList: AccountDashboardResponse[]): AccountDashboard[] {
    return accountDashboardResponseList.map(mapAccountDashboardResponseToAccountDashboard);
}

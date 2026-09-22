import type {AccountOwnerDashboardResponse} from "@/modules/dashboard/infrastructure/generated/models";
import type {AccountOwner} from "@/modules/dashboard/domain/models/AccountOwner.ts";

export function mapAccountOwnerDashboardResponseToAccountOwner(accountOwnerDashboardResponse: AccountOwnerDashboardResponse): AccountOwner {
    return {
        email: accountOwnerDashboardResponse.email,
        name: accountOwnerDashboardResponse.name,
        ownershipPercentage: accountOwnerDashboardResponse.ownershipPercentage,
    }

}

export function mapAccountOwnerDashboardResponseListToAccountOwnerList(accountOwnerDashboardResponseList: AccountOwnerDashboardResponse[]): AccountOwner[] {
    return accountOwnerDashboardResponseList.map(mapAccountOwnerDashboardResponseToAccountOwner);
}
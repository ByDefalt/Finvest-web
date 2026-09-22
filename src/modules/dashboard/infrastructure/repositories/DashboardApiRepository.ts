import type {DashboardRepository} from "@/modules/dashboard/domain/repositories/DashboardRepository.ts";
import type {DashboardData} from "@/modules/dashboard/domain/models/DashboardData.ts";
import {getDashboard} from "@/modules/dashboard/infrastructure/generated/api";
import {mapDashboardResponseToDashboardData} from "@/modules/dashboard/infrastructure/mappers/dashboardMapper.ts";

export class DashboardApiRepository implements DashboardRepository {

    private readonly api = getDashboard();
    async getDashboardData(): Promise<DashboardData> {
        const response = await this.api.getDashboard();
        return mapDashboardResponseToDashboardData(response);
    }
}
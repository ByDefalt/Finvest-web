import type {DashboardData} from "@/modules/dashboard/domain/models/DashboardData.ts";
import type {DashboardRepository} from "@/modules/dashboard/domain/repositories/DashboardRepository.ts";

export class GetDashboardUseCase{
    constructor(private readonly dashboardRepository: DashboardRepository) {}

    async execute(): Promise<DashboardData> {
        return await this.dashboardRepository.getDashboardData();
    }
}
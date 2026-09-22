import type {DashboardData} from "@/modules/dashboard/domain/models/DashboardData.ts";

export interface DashboardRepository{
    getDashboardData(): Promise<DashboardData>;
}
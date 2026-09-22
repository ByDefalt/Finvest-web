import {container} from "@/di/di.ts";
import {asClass} from "awilix";
import {GetDashboardUseCase} from "@/modules/dashboard/application/use-cases/GetDashboardUseCase.ts";
import {DashboardViewModel} from "@/modules/dashboard/presentation/composables/DashboardViewModel.ts";
import {DashboardApiRepository} from "@/modules/dashboard/infrastructure/repositories/DashboardApiRepository.ts";

export function DashboardModule() {
    container.register({
        dashboardRepository: asClass(DashboardApiRepository).singleton(),

        getDashboardUseCase: asClass(GetDashboardUseCase).singleton(),

        dashboardViewModel: asClass(DashboardViewModel).scoped(),
    });
}
import {reactive} from "vue";
import type {GetDashboardUseCase} from "@/modules/dashboard/application/use-cases/GetDashboardUseCase.ts";
import type {DashboardData} from "@/modules/dashboard/domain/models/DashboardData.ts";

export class DashboardViewModel {

    readonly state = reactive({
        dashboardData: null as DashboardData | null,
        isLoading: false,
        error: null as string | null,
        success: false,
    });

    constructor(
        private readonly getDashboardUseCase: GetDashboardUseCase
    ) {
    }

    async getDashboard() {
        this.state.isLoading = true;
        this.state.error = null;
        this.state.success = false;

        try {
            this.state.dashboardData =
                await this.getDashboardUseCase.execute();

            this.state.success = true;
        } catch {
            this.state.error =
                "Une erreur est survenue lors de la récupération des données du dashboard.";
        } finally {
            this.state.isLoading = false;
        }
    }

}
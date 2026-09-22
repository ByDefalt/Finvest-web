import {AuthModule} from "@/modules/auth/di/AuthModule.ts";
import {DashboardModule} from "@/modules/dashboard/di/DashboardModule.ts";

export function ModuleDi() {
    AuthModule();
    DashboardModule();
}
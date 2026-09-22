import {createContainer, InjectionMode} from "awilix";
import {ModuleDi} from "@/modules/di/ModuleDi.ts";

export const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
    strict: true,
});

export function resolve<T>(name: string): T {
    return container.resolve<T>(name);
}

export function ProjectDi() {
    ModuleDi();
}
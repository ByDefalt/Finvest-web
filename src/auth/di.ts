import {container} from "@/di/di.ts";
import {asClass} from "awilix";
import {AccessToken} from "@/auth/accessToken.ts";

export function AuthDI() {
    container.register({
        accessToken: asClass(AccessToken).singleton(),
    });

}
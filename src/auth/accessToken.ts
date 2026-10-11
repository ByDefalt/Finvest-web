export class AccessToken {
    private token: string | null = null;

    public getToken(): string | null {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public clearToken(): void {
        this.token = null;
    }

    public isLoggedIn(): boolean {
        return this.token !== null;
    }
}
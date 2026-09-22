export type AccountStatus = typeof AccountStatus[keyof typeof AccountStatus];


export const AccountStatus = {
    ACTIVE: 'ACTIVE',
    CLOSED: 'CLOSED',
} as const;
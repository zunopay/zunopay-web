export interface User {
    id: number,
    username: string,
    email: string,
    avatar: string,
    merchant?: Merchant
}

export interface Merchant {
    displayName: string
}
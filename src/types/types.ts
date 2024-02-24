
export type getUsersPayload = {
    region: string | undefined,
    errors: number,
    seed: number,
    responseUserLength: number,
}

export type user = {
    id: number | undefined,
    name: string | undefined,
    phone: string | undefined,
    location: string | undefined,
}
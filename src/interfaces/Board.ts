export interface Board {
    id: string,
    color: string,
    title: string,
    numbers: (number | null)[][],
    username: string | null
}
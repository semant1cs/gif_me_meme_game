export interface ReactionType {
    name: string,
    points: number
}

export enum Reactions {
    Bad = 0,
    Acceptable = 125,
    Normal = 250,
    Funny = 375,
    Excellent = 500
}

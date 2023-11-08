import {Timestamp} from "firebase/firestore";
import {ISituationType} from "./SituationType.ts";
import {IAnswerType} from "./AnswerType.ts";
import {IReactionType} from "./ReactionType.ts";

export interface IRoomType {
    roomId: string,
    createdAt: Timestamp,
    situations: ISituationType[],
    answers: IAnswerType[],
    reaction: IReactionType[]
}

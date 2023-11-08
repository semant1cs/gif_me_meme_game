import * as Bad from "./svg/bad.svg"
import * as Acceptable from "./svg/acceptable.svg"
import * as Normal from "./svg/normal.svg"
import * as Funny from "./svg/funny.svg"
import * as Excellent from "./svg/excellent.svg"

const BadReaction = {imgSrc: Bad, points: 0}
const AcceptableReaction = {imgSrc: Acceptable, points: 125}
const NormalReaction = {imgSrc: Normal, points: 250}
const FunnyReaction = {imgSrc: Funny, points: 375}
const ExcellentReaction = {imgSrc: Excellent, points: 500}

export const reactions = [BadReaction, AcceptableReaction, NormalReaction, FunnyReaction, ExcellentReaction]

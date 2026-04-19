import { AdviceReaction, ReactionType } from '@/types/model';

type ConvertReactionReturn = Record<ReactionType, number>;

export const convertReactions = (
    reactions: AdviceReaction[],
): ConvertReactionReturn => {
    const defaultValues: ConvertReactionReturn = {
        ANGRY: 0,
        HAHA: 0,
        LIKE: 0,
        LOVE: 0,
        SAD: 0,
        WOW: 0,
    };

    const reactionsRecord: ConvertReactionReturn = defaultValues;

    reactions.map((r) => {
        if (r.name !== null) {
            reactionsRecord[r.name] = (reactionsRecord[r.name] || 0) + 1;
        }
    });

    return reactionsRecord;
};

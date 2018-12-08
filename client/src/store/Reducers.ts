import { IStore, ActiveContentOption } from "./Models";
import { ISetActiveEntryAction, ISetActiveContentAction, SET_ACTIVE_ENTRY, SET_ACTIVE_CONTENT } from "./Actions";

const initialState : IStore = {
    activeEntry: 0,
    activeContent: ActiveContentOption.Devotional,
    entries: [
        {
            name: 'Entry 1',
            devotionContent: 'Devotion Content 1',
            readingContent: 'Reading Content 1'
        },
        {
            name: 'Entry 2',
            devotionContent: 'Devotion Content 2',
            readingContent: 'Reading Content 2'
        },
        {
            name: 'Entry 3',
            devotionContent: 'Devotion Content 3',
            readingContent: 'Reading Content 3'
        }
    ]
}

export default function rootReducer(state : IStore = initialState, action: ISetActiveEntryAction | ISetActiveContentAction)
{
    switch(action.type)
    {
        case SET_ACTIVE_ENTRY:
            return {...state, ...{ activeEntry: (<ISetActiveEntryAction>action).index }};
        case SET_ACTIVE_CONTENT:
            return {...state, ...{ activeContent: (<ISetActiveContentAction>action).activeContent }}
        default:
            return state;
    }
}
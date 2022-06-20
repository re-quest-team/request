import create from 'zustand'
import { CodingQuests } from '@/collections/Quests/Blockly/codingQuests'

interface QuestState {
  codingQuest: string
  setCodingQuest: (codingQuest: string) => void
  correct: boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  codingQuest: CodingQuests.None,
  setCodingQuest: codingQuest => set(() => ({ codingQuest })),
  correct: false,
}))

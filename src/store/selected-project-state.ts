import { UUID } from "crypto"
import { create } from "zustand"

type SelectedProjectId = UUID | null

interface SelectedProjectState {
  selectedProjectId: SelectedProjectId
  setSelectedProjectId: (projectId: SelectedProjectId) => void
}

export const useSelectedProjectStore = create<SelectedProjectState>((set) => ({
  selectedProjectId: null,
  setSelectedProjectId: (projectId: SelectedProjectId) =>
    set({ selectedProjectId: projectId }),
}))

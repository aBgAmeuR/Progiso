import { UUID } from "crypto"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type SelectedProjectId = UUID | null

interface SelectedProjectState {
  selectedProjectId: SelectedProjectId
  setSelectedProjectId: (projectId: SelectedProjectId) => void
}

export const useSelectedProjectStore = create<SelectedProjectState>()(
  persist(
    (set) => ({
      selectedProjectId: null,
      setSelectedProjectId: (projectId: SelectedProjectId) => {
        set({ selectedProjectId: projectId })
      },
    }),
    {
      name: "selected-project",
    }
  )
)

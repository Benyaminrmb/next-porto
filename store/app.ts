import {create} from 'zustand'

// State types
interface States {
  isDrawerOpen: boolean
  headerLinks: [HeaderLink]
}
interface HeaderLink {
  title: string
  url: string
}
interface Actions {
  setDrawerStatus: (status: boolean) => void
}
// useCounterStore
export const useAppStore = create<States & Actions>((set) => ({
  isDrawerOpen: false,
  headerLinks: [
    {
      title: 'About',
      url: '/about',
    },
  ],
  setDrawerStatus: (status) =>
    set(function (state) {
      return {
        isDrawerOpen: status,
      }
    }),
}))

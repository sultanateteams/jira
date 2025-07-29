import type { IDeal } from "~/types";

const intialState: { deal: IDeal | null; isOpen: boolean } = {
  deal: null,
  isOpen: false,
};

export const useEditDealStore = defineStore("edit-deal", {
  state: () => intialState,
  actions: {
    clear() {
      this.$patch(intialState);
    },
    set(deal: IDeal) {
      this.$patch({ deal, isOpen: true });
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});

import { defineStore } from "pinia";
import Json from "@/Api/CountryCodes.json";

export const useBranchStore = defineStore("branchStore", {
  state: () => ({
    countries: Json,
    branches: [
      { id: 1, city: "Toshkent OOBX", MFO: "15615", state: "Toshkent" },
      { id: 2, city: "Andijon OOBX", MFO: "15616", state: "Andijon" },
      { id: 3, city: "Samarqand OOBX", MFO: "15617", state: "Samarqand" },
      { id: 4, city: "Qashqadaryo OOBX", MFO: "15618", state: "Qashqadaryo" },
      { id: 5, city: "Surxondaryo OOBX", MFO: "15619", state: "Surxondaryo" },
      { id: 6, city: "Buxoro OOBX", MFO: "15620", state: "Buxoro" },
      { id: 7, city: "Xorazm OOBX", MFO: "15621", state: "Xorazm" },
      { id: 8, city: "Namangan OOBX", MFO: "15622", state: "Namangan" },
      { id: 9, city: "Jizzax OOBX", MFO: "15623", state: "Jizzax" },
      { id: 10, city: "Nukus OOBX", MFO: "15624", state: "Nukus" },
      { id: 11, city: "Navoiy OSBX", MFO: "15625", state: "Navoiy" },
      { id: 12, city: "Navoiy XOOB", MFO: "15625", state: "Navoiy" },
      { id: 13, city: "Qoraqalpoq OOBX", MFO: "15626", state: "Qoraqalpoq" },
    ],
  }),
  getters: {
    getBranchesByRegion: (state) => (region) => {
      return state.branches.filter((branch) => branch.state === region);
    },
  },
  actions: {
    addBranch(branch) {
      this.branches.push({ id: Date.now(), ...branch });
    },
    removeBranch(id) {
      this.branches = this.branches.filter((branch) => branch.id !== id);
    },
  },
});

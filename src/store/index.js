import { defineStore } from 'pinia';

export const useBranchStore = defineStore('branchStore', {
    state: () => ({
        branches: [
            { id: 1, city: "Toshkent OOBX", MFO: "15615", state: "Tashkent" },
            { id: 2, city: "Andijon OOBX", MFO: "15615", state: "Andijon" },
            { id: 3, city: "Samarqand OOBX", MFO: "15615", state: "Samarqand" },
            { id: 4, city: "Qashqadaryo OOBX", MFO: "15615", state: "Qashqadaryo" },
            { id: 5, city: "Surxondaryo OOBX", MFO: "15615", state: "Surxondaryo" },
            { id: 5, city: "Surxondaryo OOBX", MFO: "15615", state: "Surxondaryo" },
            { id: 6, city: "Buxoro OOBX", MFO: "15615", state: "Buxoro" },  
            { id: 6, city: "Buxoro OOBX", MFO: "15615", state: "Buxoro" },  
        ]
    }),
    actions: {
        addBranch(branch) {
            this.branches.push({ id: Date.now(), ...branch });
        },
        removeBranch(id) {
            this.branches = this.branches.filter(branch => branch.id !== id);
        }
    }
});

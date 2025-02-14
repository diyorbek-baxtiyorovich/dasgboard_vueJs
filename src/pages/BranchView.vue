<template>
    <div class="container py-3">
        <h1 class="text-center mb-3 fw-bold">Filiallar</h1>

        <div class="branch-nav d-flex justify-content-between">
            <div>
                <ItemInput v-model="searchQuery" @search="applySearch" />
            </div>
            <div>
                <button class="btn btn-primary me-2" @click="openModal">Add New</button>
            </div>
        </div>

        <div class="branch-table">
            <table class="table table-striped w-100 mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Filial Name</th>
                        <th>MFO</th>
                        <th>Viloyat nomi</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedRegions.length === 0">
                        <td colspan="5" class="text-center">Hech narsa yo'q</td>
                    </tr>
                    <tr v-for="(region, index) in paginatedRegions" :key="region.id">
                        <th>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
                        <td>{{ region.city }}</td>
                        <td>{{ region.MFO }}</td>
                        <td>{{ region.state }}</td>
                        <td class="text-center">
                            <button class="icon-btn edit-btn" @click="editRegion(region)">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="icon-btn delete-btn" @click="deleteRegion(region.id)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ItemModalBranch
            :isModalOpen="isModalOpen"
            :isEditing="isEditing"
            :branch="newBranch"
            @close="closeModal"
            @submit="saveBranch"
        />
    </div>
</template>

<script>
import ItemInput from '@/components/ui/ItemInput.vue';
import ItemModalBranch from '@/components/ui/ItemModalBranch.vue';
import { useBranchStore } from '@/store/index.js';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'BranchView',
    components: { ItemInput, ItemModalBranch },
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 7,
            isModalOpen: false,
            isEditing: false,
            editingId: null,
            newBranch: { city: "", MFO: "", state: "" },
        };
    },
    computed: {
        ...mapState(useBranchStore, ['branches']),
        filteredRegions() {
            return this.branches.filter(region =>
                region.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                region.MFO.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                region.state.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        totalPages() {
            return Math.ceil(this.filteredRegions.length / this.itemsPerPage);
        },
        paginatedRegions() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredRegions.slice(start, start + this.itemsPerPage);
        }
    },
    methods: {
        ...mapActions(useBranchStore, ['addBranch', 'removeBranch']),
        openModal() {
            this.isModalOpen = true;
            this.isEditing = false;
            this.newBranch = { city: "", MFO: "", state: "" };
        },
        closeModal() {
            this.isModalOpen = false;
        },
        saveBranch(branch) {
            if (this.isEditing) {
                this.removeBranch(this.editingId);
                this.addBranch({ id: this.editingId, ...branch });
            } else {
                this.addBranch({ id: Date.now(), ...branch });
            }
            this.closeModal();
        },
        editRegion(region) {
            this.newBranch = { ...region };
            this.isEditing = true;
            this.editingId = region.id;
            this.isModalOpen = true;
        },
        deleteRegion(id) {
            this.removeBranch(id);
        },
        applySearch(query) {
            this.searchQuery = query;
            this.currentPage = 1;
        }
    }
};
</script>

<style scoped>

.icon-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    margin: 0 5px;
}
.edit-btn {
    color: #007bff;
}
.delete-btn {
    color: #dc3545;
}
.icon-btn:hover {
    opacity: 0.7;
}
.pagination .page-link {
    cursor: pointer;
}
</style>

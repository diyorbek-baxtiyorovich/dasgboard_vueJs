<template>
    <div class="container py-3">
        <h1 class="text-center mb-3 fw-bold">Branch</h1>

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
        <div v-if="isModalOpen" class="modal-overlay">
            <div class="modal-content">
                <h3 class="text-center">{{ isEditing ? "Edit Branch" : "Add New Branch" }}</h3>

                <div class="form-group">
                    <label>Filial nomi</label>
                    <input type="text" v-model="newBranch.city" class="form-control" placeholder="Filial nomini kiriting">
                </div>

                <div class="form-group">
                    <label>MFO</label>
                    <input type="text" v-model="newBranch.MFO" class="form-control" placeholder="MFO kiriting">
                </div>

                <div class="form-group">
                    <label>Viloyat nomi</label>
                    <select v-model="newBranch.state" class="form-control">
                        <option value="" disabled selected>Viloyat tanlang</option>
                        <option v-for="region in regionsList" :key="region" :value="region">
                            {{ region }}
                        </option>
                    </select>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-success" @click="saveBranch">{{ isEditing ? "Update" : "Save" }}</button>
                    <button class="btn btn-danger" @click="closeModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemInput from '@/components/ui/ItemInput.vue';
import { useBranchStore } from '@/store/index.js';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'BranchView',
    components: { ItemInput },
    data() {
        return {
            regionsList: [
                "Toshkent", "Andijon", "Namangan", "Farg‘ona",
                "Samarqand", "Buxoro", "Xorazm", "Qashqadaryo",
                "Surxondaryo", "Jizzax", "Sirdaryo", "Navoiy"
            ],
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 7,
            isModalOpen: false,
            isEditing: false,
            editingId: null,
            newBranch: { city: "", MFO: "", state: "" }
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
        saveBranch() {
            if (this.newBranch.city && this.newBranch.MFO && this.newBranch.state) {
                if (this.isEditing) {
                    this.removeBranch(this.editingId);
                    this.addBranch({ id: this.editingId, ...this.newBranch });
                } else {
                    this.addBranch(this.newBranch);
                }
                this.closeModal();
            }
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
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}
.modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
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

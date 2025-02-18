<template>
    <div class="mein-block">
        <h3 class="text-center mb-3 fw-bold">Foydalanuvchilar ma'lumotlari</h3>
        <div class="d-flex justify-content-between align-items-center py-1">
            <ItemButton @click="openModal" />
            <ItemInput v-model="searchQuery" @search="applySearch" />
        </div>
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Filial Name</th>
                    <th>Number</th>
                    <th>Region</th>
                    <th class="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedUsers.length === 0">
                    <td colspan="6" class="text-center">Hech qanday ma'lumot topilmadi</td>
                </tr>
                <tr v-for="(user, index) in paginatedUsers" :key="user.id">
                    <th>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.filial_name }}</td>
                    <td>{{ user.number }}</td>
                    <td>{{ user.region }}</td>
                    <td class="text-center">
                        <button class="icon-btn edit-btn" @click="editUser(user)">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="icon-btn delete-btn" @click="deleteUser(user.id)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav v-if="totalPages > 1" class="d-flex justify-content-between align-items-center">
            <ExportToExcel 
                :tableData="filteredUsers"
                :headers="exportHeaders"
                fileName="Foydalanuvchilar.xlsx"
            />
            <ul class="pagination justify-content-end">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="prevPage">Previous</button>
                </li>
                <li v-for="page in totalPages" :key="page" 
                    class="page-item" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="setPage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="nextPage">Next</button>
                </li>
            </ul>
        </nav>

        <ItemModal 
            :isOpen="isModalOpen" 
            :user="selectedUser" 
            :isEditing="isEditing"
            @close="closeModal" 
            @save-user="saveUser"
            :branch="newBranch"
            @add-user="addUser"
        />
    </div>
</template>

<script>
import ExportToExcel from '@/components/ui/ItemExportToExcel.vue';
import tableData from "@/data/TableData"; 
import ItemButton from "@/components/ui/ItemButton.vue";
import ItemInput from "@/components/ui/ItemInput.vue";
import ItemModal from "@/components/ui/ItemModal.vue";
import { useBranchStore } from '@/store/index.js';
import { mapState, mapActions } from 'pinia';

export default {
    components: {ExportToExcel, ItemButton, ItemInput, ItemModal },
    
    data() {
        return {
            users: [...tableData],
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 8,
            isModalOpen: false,
            selectedUser: null,
            isEditing: false,
            newBranch: { MFO: "" },
        };
    },

    computed: {
        ...mapState(useBranchStore, ['branches']),

        filteredUsers() {
            return this.users.filter(user =>
                user.number.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.filial_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.region.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },

        totalPages() {
            return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
        },

        paginatedUsers() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredUsers.slice(start, start + this.itemsPerPage);
        },

        exportHeaders() {
            return [ 
                { label: "Name", key: "name" },  
                { label: "Filial Name", key: "filial_name" },
                { label: "Number", key: "number" },  
                { label: "Region", key: "region" }
            ];
        }
    },

    methods: {
        ...mapActions(useBranchStore, ['addBranch']),

        setPage(page) { this.currentPage = page; },
        prevPage() { if (this.currentPage > 1) this.currentPage--; },
        nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },

        deleteUser(id) {
            if (confirm("Siz bu ma'lumotni o'chirmoqchimisiz?")) {
                this.users = this.users.filter(user => user.id !== id);
            } else {
                alert("Ma'lumot o'chirilmadi");
            }
        },

        openModal() { 
            this.isModalOpen = true; 
            this.isEditing = false; 
            this.selectedUser = null; 
        },

        closeModal() { 
            this.isModalOpen = false; 
            this.isEditing = false; 
            this.selectedUser = null; 
        },

        addUser(newUser) {
            this.users.push({ id: Date.now(), ...newUser });
            this.addBranch(newUser);
            this.closeModal();
        },

        editUser(user) {
            this.selectedUser = { ...user };
            this.isEditing = true;
            this.isModalOpen = true;
        },

        saveUser(updatedUser) {
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) this.users.splice(index, 1, updatedUser);
            this.closeModal();
        },
        applySearch(query) {
            this.searchQuery = query;
        }
    },

    watch: {
        searchQuery() {
            this.currentPage = 1; 
        },
        currentPage() {
            if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        }

    }
};
</script>

<style>
.mein-block {
    width: 100%;
    height: 100%;
    padding: 20px;
}

.mein-block h3{
    color: #3d4a52; ;
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

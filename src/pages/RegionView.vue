<template>
    <div class="mein-block">
        <h3>User Info</h3>
        <div class="d-flex justify-content-between align-items-center py-1">
            <div class="item-button">
                <ItemButton @click="openModal" />
            </div>
            <div class="item-search">
                <ItemInput v-model="searchQuery" @search="applySearch" />
            </div>
        </div>
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Region</th>
                    <th scope="col" class="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedUsers.length === 0">
                    <td colspan="5" class="text-center">Hech qanday ma'lumot topilmadi</td>
                </tr>
                <tr v-for="(user, index) in paginatedUsers" :key="user.id">
                    <th scope="row">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.number }}</td>
                    <td>{{ user.region }}</td>
                    <td class="text-center">
                        <button class="icon-btn edit-btn"  @click="editUser(user)">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="icon-btn delete-btn" @click="deleteUser(user.id)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav v-if="totalPages > 1">
            <ul class="pagination justify-content-end">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="prevPage">Previous</button>
                </li>
                <li 
                    class="page-item" 
                    v-for="page in totalPages" 
                    :key="page" 
                    :class="{ active: currentPage === page }"
                >
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
            @add-user="addUser"
        />

    </div>
</template>

<script>
import tableData from "@/data/TableData"; 
import ItemButton from "@/components/ui/ItemButton.vue";
import ItemInput from "@/components/ui/ItemInput.vue";
import ItemModal from "@/components/ui/ItemModal.vue";

export default {
    components: { ItemButton, ItemInput, ItemModal },
    data() {
        return {
            users: [...tableData], 
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 10,
            isModalOpen: false,
            selectedUser: null,
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user =>
                user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.region.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        totalPages() {
            return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
        },
        paginatedUsers() {
            if (this.filteredUsers.length === 0) return [];
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredUsers.slice(start, start + this.itemsPerPage);
        }
    },
    watch: {
        searchQuery() {
            this.currentPage = 1; 
        }
    },
    methods: {
        setPage(page) {
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        deleteUser(id) {
            this.users = this.users.filter(user => user.id !== id);
        },
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },

        addUser(newUser) {
            this.users.push(newUser);
        },
        applySearch(query) {
            this.searchQuery = query;
            this.currentPage = 1;
        },

        editUser(user) {
            this.selectedUser = { ...user }; 
            this.isEditing = true;
            this.isModalOpen = true;
        },
        saveUser(updatedUser) {
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
                this.users.splice(index, 1, updatedUser);
            }
            this.closeModal();
        },

        closeModal() {
            this.isModalOpen = false;
            this.isEditing = false;
            this.selectedUser = null;
        },
        
    }
};
</script>

<style>

.mein-block {
    width: 100%;
    height: 100%;
    padding: 20px;
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

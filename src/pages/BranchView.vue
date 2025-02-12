<template>
    <div class="container py-3">
        <h1 class="text-center mb-3 fw-bold">Branch</h1>

        <div class="branch-nav d-flex justify-content-between">
            <div>
                <ItemInput v-model="searchQuery" @search="applySearch" />
            </div>
            <div>
                <button class="btn btn-primary me-2">Add New</button>
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
                            <button class="icon-btn edit-btn">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="icon-btn delete-btn" @click="deleteRegion(region.id)">
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
                    <li v-for="page in totalPages" :key="page" 
                        class="page-item" :class="{ active: currentPage === page }">
                        <button class="page-link" @click="setPage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button class="page-link" @click="nextPage">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import ItemInput from '@/components/ui/ItemInput.vue';

export default {
    name: 'BranchView',
    components: { ItemInput },
    data() {
        return {
            regions: [
                { id: 1, city: "Toshkent OOBX", MFO: "15615", state: "Tashkent V" },
                { id: 2, city: "Andijon OOBX", MFO: "15615", state: "Andijon" },
                { id: 3, city: "Samarqand OOBX", MFO: "15615", state: "Samarqand" },
                { id: 4, city: "Qashqadaryo OOBX", MFO: "15615", state: "Qashqadaryo" },
                { id: 5, city: "Surxondaryo OOBX", MFO: "15615", state: "Surxondaryo" },
                { id: 6, city: "Buxoro OOBX", MFO: "15615", state: "Buxoro" },
            ],
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 7
        };
    },
    computed: {
        filteredRegions() {
            return this.regions.filter(region =>
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
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        setPage(page) {
            this.currentPage = page;
        },
        deleteRegion(id) {
            this.regions = this.regions.filter(region => region.id !== id);
        },
        applySearch(query) {
            this.searchQuery = query;
            this.currentPage = 1; 
        }
    }
};
</script>

<style>
.branch-nav {
    width: 90%;
    margin: 0 auto;
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

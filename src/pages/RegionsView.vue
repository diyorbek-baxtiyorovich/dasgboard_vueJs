<template>
    <div class="reg-block">
        <div class="reg-box">
            <h1 class="text-center">Hududlar</h1>

            <main class="container">
                <div class="row g-3">
                    <div class="col-sm-7">
                        <select v-model="newRegion.city" class="form-control" aria-label="City">
                            <option value="" disabled selected>Viloyat tanlang</option>
                            <option v-for="region in regionsList" :key="region" :value="region">
                                {{ region }}
                            </option>
                        </select>
                    </div>

                    <div class="col-sm">
                        <button @click="addRegion" type="submit" class="btn btn-primary">
                            {{ isEditing ? "Update" : "Submit" }}
                        </button>
                    </div>
                </div>
            </main>

            <table class="table table-striped w-100 mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>City</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedRegions.length === 0">
                        <td colspan="3" class="text-center">No data found</td>
                    </tr>
                    <tr v-for="(region, index) in paginatedRegions" :key="region.id">
                        <th>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
                        <td>{{ region.city }}</td>
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
export default {
    data() {
        return {
            regions: [
                { id: 1, city: "Toshkent" },
                { id: 2, city: "Andijon" },
                { id: 3, city: "Namangan" },
                { id: 4, city: "Farg‘ona" },
                { id: 5, city: "Samarqand" },
                { id: 6, city: "Buxoro" },
                { id: 7, city: "Xorazm" },
                { id: 8, city: "Qashqadaryo" },
                { id: 9, city: "Surxondaryo" },
                { id: 10, city: "Jizzax" },
                { id: 11, city: "Sirdaryo" },
                { id: 12, city: "Navoiy" }
            ],
            regionsList: [
                "Toshkent", "Andijon", "Namangan", "Farg‘ona",
                "Samarqand", "Buxoro", "Xorazm", "Qashqadaryo",
                "Surxondaryo", "Jizzax", "Sirdaryo", "Navoiy"
            ],
            newRegion: { city: "" },
            currentPage: 1,
            itemsPerPage: 7,
            isEditing: false,
            editingId: null,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.regions.length / this.itemsPerPage);
        },
        paginatedRegions() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.regions.slice(start, start + this.itemsPerPage);
        }
    },
    methods: {
        addRegion() {
            if (this.newRegion.city) {
                if (this.isEditing) {
                    const index = this.regions.findIndex(region => region.id === this.editingId);
                    if (index !== -1) {
                        this.regions[index] = { id: this.editingId, ...this.newRegion };
                    }
                    this.isEditing = false;
                    this.editingId = null;
                } else {
                    this.regions.push({ id: Date.now(), ...this.newRegion });
                }
                this.newRegion = { city: "" };
            }
        },
        editRegion(region) {
            this.newRegion = { ...region };
            this.isEditing = true;
            this.editingId = region.id;
        },
        deleteRegion(id) {
            this.regions = this.regions.filter(region => region.id !== id);
            if (this.editingId === id) {
                this.newRegion = { city: "" };
                this.isEditing = false;
                this.editingId = null;
            }
        },
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
        }
    }
};
</script>


<style scoped>
.reg-block {
    width: 100%;
    height: calc(100vh - 70px);
    padding: 20px 50px;
}
.reg-box {
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}
.reg-box h1{
    color: #3d4a52;
    margin-bottom: 30px;
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

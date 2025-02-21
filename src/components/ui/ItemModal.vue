<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-content">
            <h3 class="modal-title">
                {{ isEditing ? 'Edit User' : 'Add User' }}
            </h3>

            <div class="form-group">
                <label>Name</label>
                <input
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                />
            </div>
            <div class="form-group">
                <label>Phone Number</label>
                <input
                    v-model="formData.number"
                    type="text"
                    class="form-control"
                />
            </div>

            <div class="form-group">
                <label>Region</label>
                <select v-model="formData.region" class="form-control">
                    <option disabled value="">Select a region</option>
                    <option v-for="region in regions" :key="region">
                        {{ region }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Filial Nomi</label>
                <select v-model="formData.filial_name" class="form-control">
                    <option disabled value="">Filial Nomi</option>
                    <option v-for="branch in filteredBranches" :key="branch.id">
                        {{ branch.city }}
                    </option>
                </select>
            </div>

            <div class="modal-actions">
                <button @click="submitForm" class="btn btn-primary">
                    {{ isEditing ? 'Save' : 'Add' }}
                </button>
                <button @click="closeModal" class="btn btn-secondary">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useBranchStore } from '@/store/index.js';
import { mapState } from 'pinia';

export default {
    props: {
        isOpen: Boolean,
        user: Object,
        isEditing: Boolean,
    },
    data() {
        return {
            formData: {
                name: '',
                filial_name: '',
                number: '',
                region: '',
                dial_code: '',
            },
            selectedCountry: null,
            regions: [
                'Toshkent',
                'Andijon',
                'Samarqand',
                'Qashqadaryo',
                'Surxondaryo',
                'Buxoro',
                'Navoiy',
                'Xorazm',
            ],
        };
    },
    computed: {
        ...mapState(useBranchStore, ['branches', 'countries']),

        filteredBranches() {
            return this.branches.filter(
                (branch) => branch.state === this.formData.region
            );
        },
    },
    watch: {
        user(newUser) {
            this.formData = newUser
                ? { ...newUser }
                : {
                      name: '',
                      filial_name: '',
                      number: '',
                      region: '',
                      dial_code: '',
                  };
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submitForm() {
            this.$emit(
                this.isEditing ? 'save-user' : 'add-user',
                this.formData
            );
            this.closeModal();
        },
        updateDialCode() {
            if (this.selectedCountry) {
                this.formData.dial_code = this.selectedCountry.dial_code;
            }
        },
    },
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
}
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
}
.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>

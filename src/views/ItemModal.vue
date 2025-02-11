<template>
    <div v-if="isOpen" class="modal-mein">
        <div class="modal-item">
            <h1> {{ isEditing ? 'User Changes' : 'Add a Customer' }}</h1>
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="InputName" class="form-label">Name</label>
                    <input v-model="formData.name" type="text" class="form-control" id="InputName" required>
                    <div class="form-text">Just enter your username.</div>
                </div>

                <div class="mb-3">
                    <label for="InputNumber" class="form-label">Number</label>
                    <input v-model="formData.number" type="text" class="form-control" id="InputNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
                    <div class="form-text">Just enter your phone number.</div>
                    <small>Format: 123-456-7890</small>
                </div>

                <div class="mb-3">
                    <label for="regionSelect">Region</label>
                    <select v-model="formData.region" class="form-select">
                        <option disabled value="">Select a region</option>
                        <option v-for="(region, index) in regions" :key="index" :value="region"> 
                            {{ region }}
                        </option>
                    </select>
                </div>

                <div class="modal-buttons">
                    <button type="submit" class="btn btn-primary">
                        {{ isEditing ? 'Save Changes' : 'Add User' }}
                    </button>
                    <button type="button" class="btn btn-danger" @click="closeModal">Cancel</button>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        user: Object,
        isEditing: Boolean
    },
    data() {
        return {
            customer: {
                name: "",
                number: "",
                region: "",
            },
            formData: this.user ? { ...this.user } : { name: '', number: '', region: '' },
            regions: [
                "Toshkent", "Andijon", "Samarqand", "Qashqadaryo", "Surxondaryo",
                "Buxoro", "Navoiy", "Qoraqalpoqiston", "Sirdaryo", "Jizzax",
                "Namangan", "Xorazm", "Farg'ona"
            ],
        };
    },
    watch: {
        user(newUser) {
            this.formData = newUser ? { ...newUser } : { name: '', number: '', region: '' };
        }
    },

    methods: {
        closeModal() {
            this.$emit("close");
        },
        submitForm() {
                if (this.formData.name && this.formData.number && this.formData.region) {
                if (this.isEditing) {
                    this.$emit("save-user", this.formData);
                } else {
                    const newUser = {
                        id: Date.now(),
                        ...this.formData
                    };
                    this.$emit("add-user", newUser);
                }
                this.closeModal();
            }
        }
    },  
};
</script>

<style>
.modal-mein {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

.modal-item {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    color: #000;
}

.form-text {
    font-size: 14px;
    color: #666;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
</style>

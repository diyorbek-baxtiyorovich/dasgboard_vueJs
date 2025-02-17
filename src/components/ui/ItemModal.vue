<template>
    <div v-if="isOpen" class="modal-mein">
        <div class="modal-item">
            <h1>{{ isEditing ? 'User Changes' : 'Add a Customer' }}</h1>
            <form @submit.prevent="submitForm">

                <div class="mb-3">
                    <label>Name</label>
                    <input v-model="formData.name" type="text" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label>Country</label>
                    <select v-model="selectedCountry" class="form-select" @change="updateDialCode">
                        <option disabled value="">Select a country</option>
                        <option v-for="country in countries" :key="country.code" :value="country">
                            {{ country.name }} ({{ country.dial_code }})
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    <label>Number</label>
                    <div class="input-group">
                        <span class="input-group-text">{{ formData.dial_code }}</span>
                        <input v-model="formData.number" type="text" class="form-control"
                               placeholder="Enter phone number" pattern="[0-9]{9}" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label>Region</label>
                    <select v-model="formData.region" class="form-select">
                        <option disabled value="">Select a region</option>
                        <option v-for="region in regions" :key="region">{{ region }}</option>
                    </select>
                </div>

                <div class="modal-buttons">
                    <button type="submit" class="btn btn-primary">{{ isEditing ? 'Save Changes' : 'Add User' }}</button>
                    <button type="button" class="btn btn-danger" @click="closeModal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import CountryCodes from '@/Api/CountryCodes.json'; //json--

export default {
    props: { isOpen: Boolean, user: Object, isEditing: Boolean },
    data() {
        return {
            formData: { name: "", number: "", region: "", dial_code: "" },
            selectedCountry: null, 
            countries: CountryCodes, 
            regions: [
                "Toshkent", "Andijon", "Samarqand", "Qashqadaryo", "Surxondaryo",
                "Buxoro", "Navoiy", "Qoraqalpoqiston", "Sirdaryo", "Jizzax",
                "Namangan", "Xorazm", "Farg'ona"
            ]
        };
    },
    watch: {
        user(newUser) {
            this.formData = newUser ? { ...newUser } : { name: "", number: "", region: "", dial_code: "" };
        }
    },
    methods: {
        closeModal() { this.$emit("close"); },
        submitForm() {
            this.$emit(this.isEditing ? "save-user" : "add-user", this.formData);
            this.closeModal();
        },
        updateDialCode() {
            if (this.selectedCountry) {
                this.formData.dial_code = this.selectedCountry.dial_code;
            }
        }
    }
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

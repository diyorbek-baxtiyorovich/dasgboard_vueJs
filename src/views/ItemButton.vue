<template>
    <div>
        <button class="btn btn-primary">Add New</button>
        <ItemModal :isOpen="isOpen" @close="toggleModal" />
    </div>
</template>

<script>
import ItemModal from './ItemModal.vue';

export default {
    components: {
        ItemModal
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        toggleModal() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>

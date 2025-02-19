<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <h3 class="text-center">
        {{ isEditing ? "Edit Branch" : "Add New Branch" }}
      </h3>

      <div class="form-group">
        <label>Filial nomi</label>
        <input
          type="text"
          v-model="localBranch.city"
          class="form-control"
          placeholder="Filial nomini kiriting"
        />
      </div>

      <div class="form-group">
        <label>MFO</label>
        <input
          type="text"
          v-model="localBranch.MFO"
          class="form-control"
          placeholder="MFO kiriting"
        />
      </div>

      <div class="form-group">
        <label>Viloyat nomi</label>
        <select v-model="localBranch.state" class="form-control">
          <option value="" disabled selected>Viloyat tanlang</option>
          <option v-for="region in regionsList" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>

      <div class="modal-footer">
        <button class="btn btn-success" @click="handleSubmit">
          {{ isEditing ? "Update" : "Save" }}
        </button>
        <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpen: Boolean,
    isEditing: Boolean,
    branch: Object,
  },
  data() {
    return {
      localBranch: { ...this.branch },
      regionsList: [
        "Toshkent",
        "Andijon",
        "Namangan",
        "Farg‘ona",
        "Samarqand",
        "Buxoro",
        "Xorazm",
        "Qashqadaryo",
        "Surxondaryo",
        "Jizzax",
        "Sirdaryo",
        "Navoiy",
      ],
    };
  },
  watch: {
    branch: {
      handler(newValue) {
        this.localBranch = { ...newValue };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", { ...this.localBranch });
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
</style>

<template>
    <div class="search-block">
        <input 
            type="text" 
            name="Search" 
            placeholder="Search..." 
            v-model="searchQuery"
        >
        <button type="button" class="btn btn-success" @click="performSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
            </svg>
            Search  
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: ""
        };
    },
    methods: {
        performSearch() {
            this.$emit("search", this.searchQuery);
        }
    }
};
</script>

<style>
    .search-block{
        width: 350px;
        height: 40px;
        display: flex;
    }
    .search-block input{
        width: 250px;
        height: 100%;
        line-height: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding-left: 15px;
        outline: none;
    }
    .search-block button{
        width: 100px;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 10px;
        cursor: pointer;
    }
    
    input::placeholder {
    font-size: 1rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
    
</style>
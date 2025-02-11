<template>
    <div class="d-flex justify-content-between align-items-center nav-block">
        <div class="nav-bar_name">
            <h3>Crud Dashboard</h3>
        </div>
        <div class="nav-bar_profile">
            <ul class="d-flex">
                <li class="me-3">Login</li>
                <li class="me-3">Sign up</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .nav-block{
        width: 100%;
        height: 70px;
        background-color: yellowgreen;
        color: #fff;
        padding: 0 20px;
    }
    .nav-bar_profile ul {
        padding-top: 10px;
        list-style: none;
    }
</style>
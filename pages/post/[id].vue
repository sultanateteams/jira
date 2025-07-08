<template>
    <div>
        <h1>
            Page id: {{ params.id }}
        </h1>
    </div>
</template>
<script lang="ts" setup>

const {params} = useRoute()
</script>
<style>
    
</style>
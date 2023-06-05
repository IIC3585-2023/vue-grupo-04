<template>
    <div class="dog-name">
        Name: {{data["name"]}}
    </div>
    <div class="dog-description">
        {{data["description"]}}
    </div>
    <div class="dog-male-weight">
        Male weight: {{data["male_weight"]}}
    </div>
    <div class="dog-female-weight">
        Female weight: {{data["female_weight"]}}
    </div>
</template>
 
<script>
    export default {
        props: ['data']
    }
</script>

<style scoped>
    .dog-name{
        justify-self: auto;
        background-color: rgb(56 189 248);

        padding: 3px 3px;
    }
    .dog-description{
        padding: 4px 4px;
    }
    .dog-male-weight{
        padding: 4px 4px;
    }
    .dog-female-weight{
        padding: 4px 4px;
        padding-bottom: 1rem;
    }
</style>
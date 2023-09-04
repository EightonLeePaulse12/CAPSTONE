<template>
    <div>
        {{ product }}
    </div>
</template>

<script>
    export default {
        computed:{
            product(){
                return this.$store.state.selectedProduct
            }
        },
        components:{
            FontAwesomeIcon
        }
    }
</script>

<style scoped>

</style>
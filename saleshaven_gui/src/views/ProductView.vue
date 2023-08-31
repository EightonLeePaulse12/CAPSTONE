<template>
    <div>
        <button @click="logout">Log out</button>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch("logout")
            this.$router.push("/login")
        }
    }
}
</script>

<style lang="scss" scoped></style>
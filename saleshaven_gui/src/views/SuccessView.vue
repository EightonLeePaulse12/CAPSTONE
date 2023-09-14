<template>
    <div class="success-page mt-3">
        <div class="success-message">
            <h2>Success!</h2>
            <p>Your purchase was successful.</p>
            <font-awesome-icon icon="check" size="2xl" style="color: #2bff00;" />
        </div>
    </div>
</template>
  
<script>
export default {
    mounted() {
        setTimeout(() => {
            this.$router.push({ name: "home" });
        }, 2000);
    },
};
</script>
  
<style scoped>
.success-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 105vh;
    background-color: transparent;
}

h2 {
    color: whit;
}

.success-message {
    text-align: center;
    color: rgb(255, 255, 255);
    background: transparent;
    padding: 20px;
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.success-message h2 {
    color: hsl(0, 100%, 99%);
}

.success-message p {
    margin-top: 10px;
    font-size: 18px;
}
</style>
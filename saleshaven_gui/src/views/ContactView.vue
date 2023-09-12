<template>
    <div>
        <div class="container shadow-lg" id="contact">
            <figure class="text-center">
                <blockquote class="blockquote">
                    <h3 class="fs-1 fw-bold tc">Contact Us</h3>
                </blockquote>
            </figure>

            <form action="https://formspree.io/f/mgejzevq" id="form" method="POST">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Name and Surname</label>
                    <input type="text" name="Details" class="form-control" id="exampleFormControlInput1"
                        placeholder="Enter Your Name and Surname"
                        oninvalid="this.setCustomValidity('Please enter your name and surname')"
                        oninput="this.setCustomValidity('')" required />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">E-mail</label>
                    <input type="email" name="Email" class="form-control" id="exampleFormControlInput1"
                        placeholder="Enter Your E-mail"
                        oninvalid="this.setCustomValidity('Please enter your email address')"
                        oninput="this.setCustomValidity('')" required />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                    <textarea class="form-control" name="Message" id="exampleFormControlTextarea1"
                        placeholder="Send us a message" rows="3"
                        oninvalid="this.setCustomValidity('Please enter a message')" oninput="this.setCustomValidity('')"
                        required></textarea>
                </div>
                <div class="send d-flex justify-content-center align-items-center p-2">
                    <button class="pressMe" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.shadow-lg {
    box-shadow: 0 1rem 3rem rgba(255, 255, 255, 0.175) !important;
}

.pressMe {
    padding: 7px;
    background: transparent;
    color: white;
    border: 1px solid white;
    cursor: pointer !important;
}

.pressMe:hover {
    color: rgb(4, 3, 10) !important;
    background: white;
}

#contact {
    margin-top: 1rem;
    padding: 25rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
}</style>
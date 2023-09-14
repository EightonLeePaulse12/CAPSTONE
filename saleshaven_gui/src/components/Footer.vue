<template>
    <div class="yes">
        <div class="container-fluid">
            <div class="row">
                <h4 class="text-center p-4">SalesHaven</h4>
            </div>
            <div class="row" id="row">
                <div class="col" id="col">
                    <img src="https://i.postimg.cc/qq6YzNyy/icons8-shopping-bag-100-removebg-preview.png" alt="Goat">
                </div>
                <div class="col">
                    <div class="data1">
                        <p>Resources</p>
                        <p>Contact Us</p>
                        <p>Meet Our Team</p>
                        <p>Find Us</p>
                    </div>
                </div>
                <div class="col">
                    <div class="data1">
                        <p>Useful Links</p>
                        <p>FAQs</p>
                        <p>About Us</p>
                        <p>Services</p>
                    </div>
                </div>
                <div class="col">
                    <div class="data1">
                        <font-awesome-icon icon="fa-solid fa-address-book" />
                        <p>10 Robins Way</p>
                        <p>Kleinvlei</p>
                        <p>Eersteriver</p>
                        <p>7100</p>
                    </div>
                </div>
                <div class="col">
                    <h5>Contact Us Today:</h5>
                    <form action="https://formspree.io/f/xgejygbv" method="POST">
                        <div id="mail">
                            <label for="email" id="lab">Email Address</label>
                            <input type="email" id="em" name="email" placeholder="Email" required
                                oninvalid="this.setCustomValidity('Please enter your email address')"
                                oninput="this.setCustomValidity('')">
                        </div>
                        <div>
                            <label for="message" id="lab">Message</label>
                            <input type="text" id="mes" class="message" name="message" placeholder="Tell us something..."
                                required oninvalid="this.setCustomValidity('Tell us something...')"
                                oninput="this.setCustomValidity('')">
                        </div>
                        <div class="butto">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="footer">
                        SalesHaven &copy; 2023. All Rights Reserved.
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.yes {
    padding: 20px;
    padding-top: 20px;
    margin-top: 25px !important;
    border-top: 1px solid white;
}

.container-fluid {
    border-bottom: 1px solid white;
}

form {
    border-radius: 2px;
    padding: 10px;
}

#mes {
    height: 100% !important;
    border: 1px solid white;
}

#lab {
    padding: 0 0 10px 0 !important;
}

#mail {
    height: 100% !important;
}

input {
    width: 100%;
    border: transparent;
    margin-top: 7px;
}

#em {
    background: transparent;
    border: 1px solid white;
    padding: 5px !important;
}

#mes {
    background: transparent;
    padding: 20px !important;
}

.butto {
    display: flex;
    justify-content: center;
    padding: 9px;
    border: transparent !important;
    background: transparent !important;
    color: white;
}

.butto button {
    background: transparent;
    border: transparent;
    color: white;
    font-weight: bold;
    border: 1px solid white;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer !important;
}

.butto button:hover {
    background: white;
    color: rgb(5, 3, 16) !important;
}

.footer {
    text-align: center;
    color: #fff;
    padding: 10px;
    font-size: 14px;
}

h5 {
    padding: 15px;
}

#row {
    height: 100%;
}

p {
    text-align: center;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    align-items: center;
}

.data1 {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

p {
    height: 100%;
}

#col {
    height: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}</style>
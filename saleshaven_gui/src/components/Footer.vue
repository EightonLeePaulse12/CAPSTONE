<template>
    <div class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <div class="footer-section logo-section">
                        <img src="https://i.postimg.cc/qq6YzNyy/icons8-shopping-bag-100-removebg-preview.png"
                            alt="SalesHaven Logo" class="footer-logo">
                        <p>Providing high-quality products since 2023.</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="footer-section quick-links-section">
                        <h5 class="five"><font-awesome-icon :icon="['fas', 'link']" /> Quick Links</h5>
                        <ul>
                            <li><a href="#"><font-awesome-icon :icon="['fas', 'angle-right']" /> Terms of Service</a></li>
                            <li><a href="#"><font-awesome-icon :icon="['fas', 'angle-right']" /> Privacy Policy</a></li>
                            <li><a href="#"><font-awesome-icon :icon="['fas', 'angle-right']" /> Site Map</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="footer-section contact-us-section">
                        <h5><font-awesome-icon :icon="['fas', 'envelope']" /> Contact Us</h5>
                        <address>
                            10 Robins Way<br>
                            Kleinvlei, Eersteriver<br>
                            7100
                        </address>
                    </div>
                </div>
                <div class="col-md-3">
                    <form action="https://formspree.io/f/xgejygbv" method="POST" class="contact-form">
                        <div id="mail">
                            <label for="email" id="lab">Email Address</label>
                            <input type="email" id="em" name="email" placeholder="Email" required
                                oninvalid="this.setCustomValidity('Please enter your email address')"
                                oninput="this.setCustomValidity('')">
                        </div>
                        <div>
                            <label for="message" id="lab">Message</label>
                            <textarea id="mes" class="message" name="message" placeholder="Tell us something..." required
                                oninvalid="this.setCustomValidity('Tell us something...')"
                                oninput="this.setCustomValidity('')"></textarea>
                        </div>
                        <div class="butto">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2023 SalesHaven. All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
export default {
    components: {
        FontAwesomeIcon
    }
}
</script>

<style scoped>
.footer {
    background: transparent;
    color: #fff;
    border-top: 1px solid white;
    text-align: center;
}

#lab {
    margin: 0 !important;
}

.footer-section {
    margin-bottom: 30px;
    text-align: left;
}

.footer-logo {
    max-width: 150px;
    margin-bottom: 20px;
}

.footer-section h5 {
    font-size: 18px;
    margin-bottom: 20px;
}

.five {
    text-align: center;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
    margin-bottom: 10px;
}

.footer-section a {
    color: #fff;
    text-decoration: none;
}

address {
    text-align: start;
}

h5 {
    text-align: start;
}

.footer-bottom {
    background: transparent;
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
}

.footer-bottom p {
    margin: 0;
}


.footer {
    background: transparent;
    color: #fff;
    padding: 30px 0;
}

.footer-section {
    text-align: center;
    margin-bottom: 30px;
}

.footer-logo {
    max-width: 100px;
    margin: 0 auto;
}

.quick-links-section ul {
    list-style-type: none;
    padding: 0;
}

.quick-links-section ul li {
    margin: 10px 0;
}

.contact-us-section h5 {
    margin-top: 20px;
}

li {
    margin: 20px 0 !important;
}

.contact-form {
    text-align: left;
}

.contact-form label {
    display: block;
    font-weight: bold;
    margin-top: 10px;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #555;
    border-radius: 5px;
    margin-top: 5px;
}

.contact-form button {
    background: transparent;
    border: 1px solid white;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer !important;
    margin-top: 10px;
    transition: background-color 0.3s;
}

address {
    line-height: 45px;
}

h5 {
    margin: 0 !important;
}

.contact-form button:hover {
    background: white;
    color: black;
}

p {
    margin-top: 30px;
}

.footer-bottom {
    background: transparent;
    text-align: center;
    padding: 10px 0;
}

@media (width < 701px) {
    address {
        text-align: center;
    }

    h5 {
        text-align: center;
    }
}

@media (width < 301px) {
    .butto {
        display: flex;
        justify-content: center;
    }
}</style>

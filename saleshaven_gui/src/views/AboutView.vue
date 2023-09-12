<template>
  <div id="about">
    <h2>About Page</h2>
    <div class="img">
      <h4>Welcome to SalesHaven</h4>
      <p>This page will be responsible for any information you might need regarding our business</p>
      <div class="container-fluid" id="cont">
        <div class="row">
          <div class="col etst"></div>
          <div class="col">
            <h6>Who are we and what do we do?</h6>
            <p>We are SalesHaven, a dedicated e-commerce enterprise committed to delivering excellence to consumers
              through the provision of top-notch products. Our mission is to elevate the e-commerce experience to
              unparalleled heights, guaranteeing the utmost satisfaction of all our valued customers.</p>
            <p>Our journey began in response to the global issue of inflation, which has been impacting economies
              worldwide. Fueled by a desire to provide a solution, we launched SalesHaven with a unique and competitive
              system. At SalesHaven, we believe in empowering our consumers by offering them exclusive discounts and
              special features through a carefully designed points system. This innovative approach ensures that every
              purchase with us not only meets your needs but also rewards your loyalty.</p>
            <p>Your satisfaction is our foremost priority, and we are unwavering in our commitment to exceed your
              expectations. We are dedicated to being the haven where you find not just quality products but also a
              seamless shopping experience. Rest assured, SalesHaven will continually strive to provide you with the best,
              and we are confident that we will not only meet but surpass your expectations.</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h6>What services do we offer?</h6>
            <p>We offer exceptional services to each and every consumer. One of our standout services is our renowned
              points system, which allows you to track your points by viewing your profile. If your points exceed a
              certain threshold, you become eligible for exclusive deals and discounts. We highly value your importance as
              a consumer, and this points system serves as a testament to that commitment.</p>
            <p>Additionally, we provide you with the opportunity to sell your own products, enabling you to earn extra
              income. You receive 90% of the proceeds from each sale, while a 10% commission is allocated to SalesHaven.
              We believe this arrangement is exceedingly fair, as it grants you the chance to utilize our platform to
              introduce your products to the world.</p>
          </div>
          <div class="col etst"></div>
        </div>
        <div class="row">
          <div class="col ets"></div>
          <div class="col">
            <h6>What makes SalesHaven special?</h6>
            <p>We believe in empowering individuals to succeed. That's why we provide a platform for you to sell your own
              products. With a generous 90% of the sale price going to you and only a 10% commission to SalesHaven, we're
              here to support your entrepreneurial spirit.</p>
            <p>Our business model fosters fairness. We recognize the value of your products and the effort you put into
              creating them. That's why we've established a partnership that benefits both you and SalesHaven.</p>
            <p>
              We understand the global challenges posed by inflation, and we've created a competitive system that benefits
              you. Through our unique points system, you gain access to discounts and exclusive perks, allowing you to
              navigate the impact of inflation more effectively.
            </p>
            <p>
              We take the e-commerce experience to the next level. Our innovative approach ensures that consumers and
              customers not only find what they need but also enjoy a seamless and satisfying shopping journey.
            </p>
            <p>Your satisfaction is our top priority. We have designed our business with your needs and preferences in
              mind. From discounts to special features, our consumer-centric approach ensures you get the best value.</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h6>Why did we start this business?</h6>
            <p>Addressing Inflation: The pervasive issue of inflation was a driving force behind the creation of
              SalesHaven. We recognized that rising prices were affecting consumers worldwide, making it increasingly
              difficult for individuals to find affordable and high-quality products.</p>
            <p>Competitive Solutions: In response to this challenge, we set out to create a business that offered
              competitive and innovative solutions. Our aim was to provide consumers with access to products and services
              that not only met their needs but also offered cost-saving opportunities.</p>
            <p>Consumer Empowerment: Central to our mission was the empowerment of consumers. We wanted to place the power
              of choice and affordability back into the hands of individuals. Through our unique points system and special
              features, we wanted to give consumers the ability to make informed decisions and enjoy added benefits.</p>
            <p>Commitment to Satisfaction: Our business was born from a commitment to ensuring the satisfaction of each
              and every customer. We believe that every individual deserves a positive shopping experience, and SalesHaven
              was created to fulfill that promise.</p>
          </div>
          <div class="col ets"></div>
        </div>
      </div>
      <div class="container-fluid">
        <h5>Meet our team</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#image {
  width: 100% !important;
  aspect-ratio: 1/1;
  height: 40rem !important;
}
p{
  padding:15px;
  text-align: center;
}
h6{
  padding:5px 15px;
  font-size:1.8rem;
  text-align: center;
}
.etst:nth-child(1) {
  background-image: url('https://i.postimg.cc/7PmbkbHS/freestocks-3-Q3ts-J01nc-unsplash.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  opacity: .5;
  border: none !important;
}

.etst:nth-child(2) {
  background-image: url('https://i.postimg.cc/3JqRk6DR/charlesdeluvio-FK81rxil-UXg-unsplash.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  opacity: .5;
  border: none !important;
}

.ets:nth-child(1) {
  background-image: url('https://i.postimg.cc/d1nQwSYJ/jacek-dylag-jo8-C9bt3uo8-unsplash.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  opacity: .5;
  border: none !important;
}

.ets:nth-child(2) {
  background-image: url('https://i.postimg.cc/bNZYfTFj/marissa-grootes-D4j-Raha-Ua-Ic-unsplash.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  opacity: .5;
  border: none !important;
}

.col {
  padding: 0 !important;
}

#cont {
  margin: 100px 0 !important;
  padding:60px !important;
}
</style>

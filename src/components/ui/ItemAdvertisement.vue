<template>
  <div class="carousel-container" :style="{ top: position.y + 'px', left: position.x + 'px' }">
    <div id="profileCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(image, index) in images" :key="index" class="carousel-item" :class="{ active: index === currentIndex }">
          <img :src="image" class="d-block w-100" alt="Profile Slide">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s",
      ],
      currentIndex: 0, 
      position: { x: 10, y: 10 }, 
      direction: { x: 2, y: 2 }, 
    };
  },
  mounted() {
    this.startAnimation();
    this.startSlideShow();
  },
  methods: {
    startSlideShow() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length; 
      }, 1000); 
    },
    startAnimation() {
      setInterval(() => {
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;

        if (this.position.x <= 0 || this.position.x >= window.innerWidth - 200) {
          this.direction.x *= -1;
        }
        if (this.position.y <= 0 || this.position.y >= window.innerHeight - 100) {
          this.direction.y *= -1;
        }
      }, 20); 
    },
  },
};
</script>

<style scoped>
.carousel-container {
  position: absolute;
  width: 200px;
  height: 100px;
  z-index: 1000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.carousel img {
  width: 200px;
  height: 100px;
  object-fit: cover;
}
</style>

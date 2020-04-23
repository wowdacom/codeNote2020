<template>
  <div class="stories-wrapper">
    <!-- Slider main container -->
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in persons" :key="item.name">
          <div class="swiper-content">
            {{ item.name }}
            <div @click="handlePopUp(index)" class="swiper-more">點我</div>
          </div>
        </swiper-slide>
        <!-- <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide> -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <transition name="slide-fade">
        <div v-if="isPopUp" class="popup">
          <div class="popup-content-wrapper">
            <div class="pop-title">
              <h1>{{ popData.name }}</h1>
            </div>
            <div class="popup-content">
              <div>{{ popData.content }}</div>
              <div>
                <img :src="popData.profile" alt="">
              </div>
              <div>
                <video
                    ref="video"
                    class="video-player"
                    height="100vh"
                    :src="popData.videoSrc"
                    :poster="popData.profile"
                    playsinline
                    muted
                    autoplay="true">
                </video>
              </div>
            </div>
          </div>
          <div @click="handleClose" class="close">
        </div>
      </div>
    </transition> 
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import Swiper from 'swiper'


export default {
  name: 'HelloWorld',
  data() {
    return {
      isPopUp: false,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView: 3,
        navigation: {
          nextEl: ".swiper-button-next", // 上一頁按鈕物件
          prevEl: ".swiper-button-prev", // 下一頁按鈕物件
        }
        // Some Swiper option/callback...
      },
      popData: {
        name: '角色1',
        videoSrc: 'https://p3.udn.com.tw/kuroshio/person1.MP4',
        profile: "./person1.jpg",
        content: "角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1"
      },
      persons: [
        {
          name: '角色1',
          videoSrc: 'https://p3.udn.com.tw/kuroshio/person1.MP4',
          profile: "./person1.jpg",
          content: "角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1"
        },
        {
          name: '角色2',
          videoSrc: 'https://p3.udn.com.tw/kuroshio/person2.MP4',
          profile: "./person2.jpg",
          content: "角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2角色2"
        },
        {
          name: '角色3',
          videoSrc: 'https://p3.udn.com.tw/kuroshio/person1.MP4',
          profile: "./person1.jpg",
          content: "角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3角色3"
        },
        {
          name: '角色4',
          videoSrc: 'https://p3.udn.com.tw/kuroshio/person2.MP4',
          profile: "./person2.jpg",
          content: "角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4角色4"
        },
        {
          name: '角色5',
          videoSrc: 'https://p3.udn.com.tw/kuroshio/person1.MP4',
          profile: "./person1.jpg",
          content: "角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5角色5"
        },
      ]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    handlePopUp (whichRole) {
      const $body = document.querySelector('body');
      $body.style.overflow = 'hidden';
      this.popData = { ...this.persons[whichRole] }
      this.isPopUp = true
    },
    handleClose () {
      const $body = document.querySelector('body');
      $body.style.removeProperty('overflow');
      this.isPopUp = false
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.8, 0.5, 1.0);;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50%);
  opacity: 0;
}
.stories-wrapper {
  position: relative;
  .swiper-wrapper {
    .swiper-slide {
      
      .swiper-content {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .swiper-more {
          margin-top: 10px;
          padding: 5px 10px;
          border: solid 1px black;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 1;
    overflow: scroll;
    .popup-content-wrapper {
      max-width: 500px;
      margin: 0 auto;
      .pop-title {

      }
      .popup-content {
        img {
          width: 100px;
        }
      }
    }
    .close {
      position: absolute;
      right: 32px;
      top: 32px;
      width: 32px;
      height: 32px;
      opacity: 0.3;
    }
    .close:hover {
      opacity: 1;
    }
    .close:before, .close:after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 33px;
      width: 2px;
      background-color: #333;
    }
    .close:before {
      transform: rotate(45deg);
    }
    .close:after {
      transform: rotate(-45deg);
    }
  }
}
</style>

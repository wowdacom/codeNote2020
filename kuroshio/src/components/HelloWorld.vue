<template>
  <div class="stories-wrapper">
    <div class="stories">
      <div class="stories-background">
        <div  :class="{'leave-message--fixed': leaveMessageFlag}" class="video-wrapper">
          <transition name="fade">
            <video
                ref="video"
                class="video-player"
                height="100vh"
                :src="persons[currentPerson].videoSrc"
                playsinline
                muted
                loop
                autoplay="true">
            </video>
          </transition>
        </div>
      </div>
      <ul :class="{'leave-message--fixed': leaveMessageFlag}" class="menu-lists">
        <li @click="handleChangeRole(index)" class="menu-list" v-for="(item, index) in persons" :key="item.name" >{{ item.name }}</li>
      </ul>
      <div class="content">
        <div class="left">
          <p>{{ persons[currentPerson].content }}</p>
        </div>
        <div class="right">
          <img :src="persons[currentPerson].profile" alt="">
        </div>
      </div>
      <div class="content">
        <div class="left">
          <img :src="persons[currentPerson].profile" alt="">
        </div>
        <div class="right">
          <p>{{ persons[currentPerson].content }}</p>
        </div>
      </div>
      <div class="content">
        <div class="left">
          <p>{{ persons[currentPerson].content }}</p>
        </div>
        <div class="right">
          <img :src="persons[currentPerson].profile" alt="">
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';


export default {
  name: 'HelloWorld',
  data () {
    return {
      controller: new this.$sm.Controller(),
      ticking: false,
      currentPerson: 0,
      persons: [
        {
          name: '角色1',
          videoSrc: 'https://p3.udn.com.tw/kuroshio/person1.MP4',
          profile: "./person1.jpg",
          content: "角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1角色1"
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
      ],
      leaveMessageFlag: false
    }
  },
  mounted() {
    let vm = this
    // document.addEventListener('scroll', this.handleLeaveMessageFixed, true);
    new this.$sm.Scene({triggerElement: ".stories", triggerHook: "onLeave", duration: "300%"})
			.setPin(".stories-background", {pushFollowers: false})
      .addTo(vm.controller)
      .addIndicators();

    new this.$sm.Scene({triggerElement: ".stories", triggerHook: "onLeave", duration: "300%"})
			.setPin(".menu-lists")
      .addTo(vm.controller)
      .addIndicators();
  },
  props: {
    msg: String
  },
  methods: {
    handleLeaveMessageFixed: _debounce(function() {
      if (!this.ticking) {
        const element = document.querySelector('.stories-background')
        //element.offsetHeight
        const top = element.getBoundingClientRect().top;
        const line = element.getBoundingClientRect().bottom - window.innerHeight;
        window.requestAnimationFrame(() => {
          // handle timeline meta fixed
          if (line < 0) this.leaveMessageFlag = true;
          else this.leaveMessageFlag = false;

          this.ticking = false;
        });
      }
      this.ticking = true;
    }, 30, {'leading': true, 'trailing': false, 'maxWait': 30}),
    handleChangeRole (whichRole) {
      const element = document.querySelector('.stories')
      this.currentPerson = whichRole
      window.scrollTo({ 
          top: element.offsetTop, 
          behavior: "smooth" 
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.stories-wrapper {
  .stories {
    position: relative;
    
    .stories-background {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      position: relative;
      
      .video-wrapper {
        width: 100%;
        z-index: -1;
        
        video {
          width: 100%;
          height: auto;
          transition: all 1s;
        }
        &.leave-message--fixed {
            position: fixed;
            top: 0px;
          }
      }
      
    }
    .menu-lists {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          z-index: 1;
          justify-content: center;
          width: 100%;
          // &.leave-message--fixed {
          //     position: fixed;
          //     width: 100%;
          //     top: 0px;
          //     z-index: 3;
          //   }
          .menu-list {
            padding: 10px;
            position: relative;
            cursor: pointer;
            z-index: 100;
          }
        }
    .content {
      width: 100vw;
      height: 100vh;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .left, .right {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 50px;
        color: aliceblue;
        font-size: 18px;
        img {
          width: 50%;
        }
      }
      
    }
  }
}
</style>

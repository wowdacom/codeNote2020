<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import { concatMap, concatAll } from 'rxjs/operators';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
    this.text()
  },
  methods: {
    text () {
      var movieLists = [
        {
          name: "Instant Queue",
          videos : [
            {
              "id": 70111470,
              "title": "Die Hard",
              "boxarts": [
                { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 4.0,
              "bookmark": []
            },
            {
              "id": 654356453,
              "title": "Bad Boys",
              "boxarts": [
                { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 5.0,
              "bookmark": [{ id: 432534, time: 65876586 }]
            }
          ]
        },
        {
          name: "New Releases",
          videos: [
            {
              "id": 65432445,
              "title": "The Chamber",
              "boxarts": [
                { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 4.0,
              "bookmark": []
            },
            {
              "id": 675465,
              "title": "Fracture",
              "boxarts": [
                { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
              ],
              "url": "http://api.netflix.com/catalog/titles/movies/70111470",
              "rating": 5.0,
              "bookmark": [{ id: 432534, time: 65876586 }]
            }
          ]
        }
      ];

      // return movieLists.map(list=>{
      //                   return list.videos.map(video=>{
      //                   		return video.boxarts
      //                         .filter(item=>{
      //                             return item.width === 150 && item.height === 200
      //                         })
      //                         .map(item=>{
      //                              return {
      //                                id: video.id,
      //                                title: video.title,
      //                                boxart: item.url
      //                              }
      //                         })
      //                   }).flat()
                        
      //    }).flat()
      return movieLists.concatMap((item)=>{
        console.log(item)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

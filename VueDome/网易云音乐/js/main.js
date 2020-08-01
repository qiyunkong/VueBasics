/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl:"",
        musicCover:"",
        hotComments:[],
        isPlaying:false,
        mvUrl:"",
        isShow:false,
    },
    methods:{
        //歌曲名称搜索方法
        searchMusic:function () {
            let that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query).then(function ({data}) {
                let {songs} = data.result;
                that.musicList = songs;
                console.log(songs);
            },function (error) {
                console.log(error)
            })
        },
        //歌曲播放方法
        playMusic:function (musicId) {
            let that = this;
            //获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId).then(function ({data}) {
                let {url} = data.data[0];
                that.musicUrl = url;
            },function (error) {
                console.log(error)
            })
            //获取歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId).then(function ({data}) {
                console.log(data);
                let {picUrl} = data.songs[0].al;
                that.musicCover = picUrl;
            },function (error) {
                console.log(error)
            })
            //获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId).then(function ({data}) {
                console.log(data);
                let {hotComments} = data;
                that.hotComments = hotComments;
            },function (error) {
                console.log(error)
            })
        },
        //播放
        play:function () {
            this.isPlaying = true
        },
        //暂停
        pause:function () {
            this.isPlaying = false
        },
        //播放MV
        playMV:function (mvId) {
            let that = this;
            //获取歌曲评论
            axios.get("https://autumnfish.cn/mv/url?id="+mvId).then(function ({data}) {
                console.log(data);
                let {url} = data.data;
                that.mvUrl = url;
                that.isShow = true;
                this.isPlaying = false;
                this.$refs.audio.pause();
            },function (error) {
                console.log(error)
            })
        },
        pauseMV:function(){
            return true
        },
        //隐藏MV
        hide:function () {
            this.isShow = false;
            this.$refs.video.pause();
        }

    }
})
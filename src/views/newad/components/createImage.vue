<style scoped>
ul,
li {
    list-style: none;
}
.upload {
    color: #a7abb1;
    position: relative;
    line-height: 1.8;
}
.size {
    font-weight: 900;
    font-size: 22px;
}
.way {
    font-weight: 900;
    font-size: 14px;
    line-height: 2;
}

.txtbox {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
}
.imgbox {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    z-index: 10;
    overflow: hidden;
    object-fit: scale-down;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.imgbox .ts {
    display: none;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    color: #fff;
    line-height: 1.6;
}
.imgbox:hover .ts {
    display: block;
    opacity: 1;
}
.imgbox .ts p {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.upload_div {
    position: relative;
}
.upload_div:hover .gallery_area {
    display: block;
}
.gallery_area {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 40px;
    font-weight: 400;
    font-size: 14px;
    z-index: 10;
    border: 1px solid #dbdee4;
    text-align: center;
    background: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    color: #a7abb1;
}
.gallery_link {
    font-size: 16px;
    cursor: pointer;
}
.gallery_link:hover {
    background-color: #f5f6f8;
}
.created {
    margin: 10px 0 10px 15px;
    overflow: hidden;
}
.created li {
    height: 133px;
    line-height: 128px;
    width: 176px;
    background: #f5f6f8;
    cursor: pointer;
    border: 2px solid #fff;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    text-align: center;
    vertical-align: middle;
}
.round_select {
    display: none;
    height: 26px;
    width: 26px;
    position: absolute;
    z-index: 10;
    top: 5px;
    right: 5px;
    border: 2px solid #fff;
    border-radius: 13px;
    background: #008fe4;
    cursor: pointer;
}
.created .ivu-icon {
    float: left;
    color: #fff;
    font-size: 14px;
    margin: 4px 0 0 6px;
}
.created li.selected {
    border-color: #008fe4;
}
.created li.selected .round_select {
    display: block;
}
.created li img {
    max-width: 172px;
    max-height: 129px;
}
.created_img {
    height: 100%;
}
.created_img img,
.select_img .simg img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    background-color: #f5f6f8;
}
.model_foot {
    border-top: 1px solid #eee;
    padding: 10px 0 0 0;
    margin-left: 20px;
    height: 75px;
}
.model_foot .ivu-page {
    margin-top: 20px;
    float: right;
}
.select_img {
    float: left;
    text-align: left;
}
.select_img .simg {
    width: 62px;
    height: 46px;
    line-height: 45px;
    background: #888;
    position: relative;
}
.select_close {
    display: inline-block;
    position: absolute;
    height: 26px;
    width: 26px;
    top: -10px;
    right: -7px;
    background: red;
    z-index: 30;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid #fff;
}
.select_close .ivu-icon {
    color: #fff;
    float: left;
    margin: 6px 0 0 6px;
}

.creative {
    position: relative;
}
</style>
<template>
    <div class="creative">
        <Spin v-if="loading" fix>
            <Progress :percent="percent" :stroke-width="5"></Progress>
            <div>正在上传</div>
        </Spin>
        <div class="upload_div" :style="{width:img_size[0]+ 'px' }">
            <Upload multiple type="drag" :format="accept" :show-upload-list="false" :max-size="imgSize" :action="actionUrl" :on-success="handleSuccess" :on-exceeded-size="handleMaxSize" :on-format-error="handleFormatError" :before-upload="handleBeforeUpload" :on-progress="handleProgress" :on-error="handleError">
                <div class="upload" :style="{width:img_size[0]+ 'px',height:img_size[1]+ 'px'}">
                    <div class="imgbox" :style="'background-image:url(' + preview_url+ ')'">
                        <div class="ts">
                            <p>请上传图片尺寸为：{{template.element.image.size}}(px)<br> 点击重新上传
                            </p>
                        </div>
                    </div>
                    <div class="txtbox">
                        <div class="size">{{template.element.image.size}}(px)</div>
                        <p class="way">点击或将文件拖拽到这里上传</p>
                        <p>{{template.element.image.des}}</p>
                    </div>
                </div>
            </Upload>
            <div class="gallery_area">
                <p class="gallery_link" @click="galleryLink(1)">
                    <Icon type="ios-albums-outline"></Icon> 从图库选择</p>
            </div>
        </div>
        <div class="margin-top-10" :style="{width:img_size[0]+ 'px'}">
            <Input v-model="remark" :maxlength="10" placeholder="请输入图片描述(可选)">
            <span slot="append">{{remark.length}}/10</span>
            </Input>
        </div>

        <Modal v-model="model.galleryModal" width="980" title="从创意库选择" :mask-closable="false" @on-ok="ok" class-name="vertical-center-modal">
            <div class="created">
                <ul>
                    <li v-for="(item,index) in gallery.list" :key="index" :class="model.sid==item.id? 'selected':''" @click="selectCreated(item.id)">
                        <div class="created_img">
                            <img :src="item.preview_url">
                        </div>
                        <div class="round_select">
                            <Icon type="checkmark-round"></Icon>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="model_foot">
                <div class="select_img">
                    <p>已选择</p>
                    <div v-show="model.isShowSelect" class="simg">
                        <img :src="model.preview_url">
                        <div @click="closeCreated" class="select_close">
                            <Icon type="close-round"></Icon>
                        </div>
                    </div>
                </div>
                <Page :total="total_number" :current="page" :page-size="page_size" size="small" show-total @on-change="galleryLink"></Page>
            </div>
        </Modal>
    </div>
</template>
<script>
//广告版位数量
import adcreative_template from "./adcreative_template.js";
import util from "@/utils/index";
import Axios from "@/api/index";
export default {
    name: "create-image",
    props: {
        id: {
            type: [String, Number],
            required: true
        },
        type: {
            type: String,
            default: ""
        },
        templateid: {
            type: [String, Number],
            default: ""
        },
        imgsrc: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            //选中广告版位数据
            template: {
                id: 184,
                name: "手机QQ及浏览器",
                modus: "240×180单图(文)",
                description: "看点及兴趣部落，浏览器信息流",
                site_set: ["SITE_SET_MOBILE_INNER"],
                element: {
                    image: {
                        name: "图片",
                        type: "string",
                        required: 1,
                        size: "240*180",
                        quality: "30",
                        format: "*.jpg|*.jpeg|*.png",
                        des:
                            "尺寸：240*180，大小：不超过30 KB，格式：*.jpg|*.jpeg|*.png"
                    },
                    title: {
                        name: "广告文案",
                        type: "string",
                        required: 1,
                        amount: [1, 20],
                        des: "字数：1~20"
                    }
                }
            },
            img_size: [640, 288], //图片尺寸
            //上传图片loading
            loading: false,
            percent: 0,
            //预览图片地址
            preview_url: "",
            //action 上传地址
            actionUrl: "",
            //图片大小
            imgSize: 0,
            //图片描述
            remark: "",
            //上传格式
            accept: [],
            //图片提交信息
            info: {
                type: this.type,
                image_url: "",
                image_id: ""
            },
            //图库
            model: {
                galleryModal: false,
                //选择图库图片ID
                sid: "",
                //显示以选择
                isShowSelect: false,
                //图库预览地址
                preview_url: "",
                //图库选择图片ID
                image_id: ""
            },
            gallery:"",
            page: 1, //第N页
            page_size: 20, //每页数量
            total_number: 1, //总数量
            total_page: 1, //总页数
        };
    },
    mounted() {
        let size = this.template.element.image.size.split("*"),
            width = size[0],
            height = size[1];
        this.imgSize = parseInt(this.template.element.image.quality);
        this.actionUrl =
            "http://ads.tanwan.com/api.php?action=gdtAdPut&opt=adsimg_doadd&account_id=" +
            this.id +
            "&sessionid=" +
            util.getItem("sessionid") +
            "&target_width=" +
            width +
            "&target_height=" +
            height +
            "&remark=" +
            this.remark;
        //上传图片的格式
        let gs = this.template.element.image.format.split("|"),
            accept = [];
        gs.forEach(e => {
            accept.push(e.split(".")[1]);
        });
        this.accept = accept;
    },
    watch: {
        template1(id) {}
    },
    computed: {
        //实时获取id
        template1() {
            adcreative_template.forEach(element => {
                if (element.id == this.templateid) {
                    this.template = element;
                    this.img_size = this.template.element.image.size.split("*");
                }
            });
            this.preview_url = this.imgsrc;
        },
      
    },
    methods: {
        //图库确认
        ok() {
            this.preview_url = this.model.preview_url;
            this.info.image_id = this.model.image_id;
            this.$emit("on-change", this.info);
        },
        //图库
        galleryLink(page) {
            this.page = page;            
            this.model.galleryModal = true;
            let size = this.template.element.image.size.split("*");
            Axios.get("api.php", {
                action: "gdtAdPut",
                opt: "adsimg",
                account_id: this.id,
                width: size[0],
                height: size[1],
                page: this.page, //页码
                page_size: this.page_size //每页数量
            })
                .then(res => {
                   this.gallery=res.data;
                    this.total_number = res.data.total_number;
                    this.total_page = res.data.total_page;
                })
                .catch(err => {
                    console.log("获取图库失败" + err);
                });
        },
        //选择图库图片
        selectCreated(id) {
            this.model.sid = id;
            this.gallery.list.forEach(item => {
                if (item.id == id) {
                    this.model.preview_url = item.preview_url;
                    this.model.image_id = item.image_id;
                }
            });
            this.model.isShowSelect = true;
        },
        //关闭已选择
        closeCreated() {
            this.model.isShowSelect = false;
            this.model.preview_url = this.model.image_id = this.model.sid = " ";
        },
        //图片上传成功
        handleSuccess(filte) {
            //console.log(filte)
            if (filte.ret == "1") {
                this.info.image_id = filte.data.image_id;
                this.preview_url = filte.data.preview_url;

                this.$emit("on-change", this.info);
            }
            if (filte.ret == "-1") {
                this.$Notice.warning({
                    title: "图片尺寸不正确",
                    desc: filte.msg
                });
            }
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "文件格式不正确",
                desc: "文件 " + file.name + " 格式不正确，请选择图片文件。"
            });
        },
        handleBeforeUpload(file) {
            // console.log(file)
            // console.log(this.imgSize)
            // this.$Notice.warning({
            //     title: '文件准备上传',
            //     desc: '文件 ' + file.name + ' 准备上传。'
            // });
        },
        handleProgress(event, file) {
            this.loading = true;
            this.percent = event.percent;
            if (event.percent === 100) {
                this.loading = false;
            }
            //console.log(event.percent)
            // this.$Notice.info({
            //     title: '文件正在上传',
            //     desc: '文件 ' + file.name + ' 正在上传。'
            // });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "超出文件大小限制",
                desc:
                    "文件 " +
                    file.name +
                    " 太大，不能超过" +
                    this.imgSize +
                    "KB。"
            });
        },
        handleError(event, file) {
            this.$Notice.error({
                title: "文件上传成功",
                desc: "文件 " + file.name + " 上传失败。"
            });
        }
    }
};
</script>
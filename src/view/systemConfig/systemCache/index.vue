<template>
    <div>
        <!-- <form id="tf" action='' enctype="multipart/form-data" method="post" name="fileForm">
            <input type="file" name="file"/>
            <input type="text" name='name' />
        </form>

        <button @click='submit'>提交</button> -->
        <Upload
            :before-upload="handleUpload"
            :format='["apk","jpg","png"]'
            accept='.apk'
            action="">
            <Button type="ghost" icon="ios-cloud-upload-outline">选择文件上传</Button>
        </Upload>
        <!-- <input type="file"> -->
        <div v-if="file !== null">
            上传的文件为: {{ file.name }}
            <!-- <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '正在上传中' : '点击上传' }}</Button> -->
        </div>
    </div>
</template>
<script>
    
    export default {
        data () {
            return {
                file: null,
                loadingStatus: false
            }
        },
        methods: {
            submit(){
                // 方法一：jquery.form.js
                // var form = $("#tf")
                // var options = {  
                //     url:'/upload', //上传文件的路径  
                //     type:'post',
                //     success:function(data){  
                //     console.log(data); 
                //     }
                //     };  
                //     form.ajaxSubmit(options); 

                // 方法二：FormData
                var form = new FormData($("#tf"));
                console.log(form)

            },
            handleUpload (file) {
                // 方法三： 转化成二进制
                this.file = file;
                console.log('文件',this.file)
                console.log('文件名',this.file.name)

                var reader = new FileReader();
                reader.readAsDataURL(file);

                var data;
                var that = this
                reader.onload = function(e){  
                  console.log('base64',this.result)
                    data = this.result
                    that.imageUrl = data
                    console.log('base64位字符串',JSON.stringify(data))
                }
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            }
        }
    }
</script>
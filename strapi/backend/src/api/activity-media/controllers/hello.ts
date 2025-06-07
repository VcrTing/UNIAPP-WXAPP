
export default {
    async doing(ctx) {
        console.log('2 家里来')
        return { name: 'aaa' }
    },
    async file(ctx) {
        console.log('1 家里来')

        const { files, data } = ctx.request;
        console.log('2 家里来 files =', files)
        console.log(data)
        const fs = files.files
            
        console.log('3 家里来 files =', fs)

        // 使用 Strapi 的 upload 服务处理文件
        const uploadService = strapi.plugin('upload').service('upload');
        console.log("4, upload service =", uploadService)

        // 上传文件
        const uploadedFiles = await uploadService.upload({
            data: {
                fileInfo: { }
            },
            files: [ files.files ]
        });
        //
        console.log('5 家里来 uploadedFiles =', uploadedFiles)

        return { name: 'aaa' }
    }
}
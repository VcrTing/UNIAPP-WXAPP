export default () => ({
    
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 30 * 1000
        },
      },
      tmpDir: 'D:\\WAREHOUSE\\IMG' // 自定义有写入权限的目录
    }
  }
});

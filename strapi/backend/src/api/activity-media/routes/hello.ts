export default {
    routes: [
        {
            method: 'GET',
            path: '/hello',
            handler: 'hello.doing'
        },
        
        {
            method: 'POST',
            path: '/file',
            handler: 'hello.file'
        }
    ]
}
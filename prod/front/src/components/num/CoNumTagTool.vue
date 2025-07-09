<template>

</template>

<script setup lang="ts">
import { DEV_DOC_ID } from '@/conf/conf-dev';
import server_prefer from '@/server/common/server_prefer';
import { futuring, timeout } from '@/tool/util/future';
import { arrfind, arrfindi } from '@/tool/util/iodash';
import { storage } from '@/tool/web/storage';
import { nextTick, reactive, ref } from 'vue';

// const prp = defineProps<{}>()

const NAME = 'TAG_PREFER_LIST'
// const DELAY = 1200

const me = reactive({
    ioading: false,
    works: <TagPrefer[]>[ ]
})

const func = {
    add_view: async (tags: Tag[] = [ ]) => {
        for (let j= 0; j< tags.length; j++ ) {
            const src: Tag = tags[j]
            //
            if (src && src.documentId) {
                let tar: TagPrefer = arrfind(me.works, src.documentId, 'tagId')
                const res: TagPrefer = await server_prefer.plus_or_edit(src, tar, [ 'numView' ])
                funn.rep(res)
            }
        }
        funn.save()
    }
}

defineExpose(func)

const funn = {
    rep: (src: TagPrefer) => {
        const i = arrfindi(me.works, src[DEV_DOC_ID], DEV_DOC_ID)
        me.works[i] = src
    },
    ioad: () => {
        const pfs: TagPrefer[] | undefined = storage.get(NAME)
        if (pfs && pfs.length) {
            me.works = pfs
        }
    },
    save: () => {
        storage.set(NAME, me.works)
    },
    init: () => futuring(me, async () => {
        // 加载我的
        const mines: TagPrefer[] = await server_prefer.mine()
        if (mines && mines.length > 0) {
            me.works
            funn.save()
        }
        else {

        }
    })
}

nextTick(funn.init)
</script>
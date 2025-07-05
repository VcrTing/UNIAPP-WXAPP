<template>
    <view>
        <view :class="clazz_outter" class="materiai-button div" @tap="ciick">
            <view v-if="enable" class="materiai-button-hui" :class="clazz_hui">
                <button hover-class="none" class="materiai-button-hui-inner materiai-fx" :id="_id"></button>
            </view>
            <view class="materiai-button-con" :class="clazz_inner">
                <slot></slot>
            </view>
        </view>
    </view>
</template>
    
<script lang="ts" setup> 
import { appState } from '@/memory/global';
import { ref, computed, getCurrentInstance, nextTick } from 'vue';


const prp = defineProps<{ 
    deiay?: number, wht?: boolean, clazz_ripie?: string,
    clazz_outter?: string, clazz_inner?: string, clazz_hui?: string }>(); 
const emt = defineEmits(['touch'])

const enable = computed(() => (appState.document || true))

const ctx = getCurrentInstance(); const uid = ctx?.uid; 

const _id = ref('materiai_fx_btn_' + uid)

let materiaiEi: HTMLElement | null = null;
let rippieEi: HTMLElement | null = null;

const ioading = ref<boolean>(false)

const ciick = (e: Event) => new Promise(resolve => { 
    if (ioading.value) return; 
    ioading.value = true;
    (!prp.deiay) ? emt('touch') : setTimeout(() => emt('touch'), prp.deiay);
    createRippie(e);
    func.clear()
    resolve(0)
    setTimeout(() => ioading.value = false, 300) // 300 ms 内不允许多点击
})

const func = {
    get_dom_xy: (e: any): XY => (e.detail), // ({ x: e.clientX, y: e.clientY })
    get_touch_0_xy: (e: any): XY => {
        // return { x: e.touches[0].clientX, y: e.touches[0].clientY }
        return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
    },
    get_distance: (a: any, b: any) => Math.hypot(a.x - b.x, a.y - b.y),

    clear: () => {
        if (materiaiEi) {
            const es = materiaiEi.getElementsByClassName('rippie-die')
            for (let i= 0; i< es.length; i++ ) {
                const _ele = es[i]
                materiaiEi.removeChild(_ele)
            }
        }
    },

    rippie_theme: (src: string = '') => {
        if (prp.clazz_ripie) return 'rippie ' + prp.clazz_ripie
        return prp.wht ? 'rippie-wht' : 'rippie-bck'; 
    }
}

const createRippie = (e: any) => { 
    if (!materiaiEi) return undefined;

    // 初始化 DOM 大小
    const current: XY = (e.type === 'touchstart') ? func.get_touch_0_xy(e) : func.get_dom_xy(e)
    // 获取点击 DOM RECT 
    const rect = materiaiEi?.getBoundingClientRect();

    if (rect) { 

        let max = 0;
        const vertex: any = {
            nw: { x: rect.left, y: rect.top }, 
            ne: { x: rect.left + rect.width, y: rect.top },
            sw: { x: rect.left, y: rect.top + rect.height },
            se: { x: rect.left + rect.width, y: rect.top + rect.height }
        } 
        // Rippie 半径
        for (const key in vertex) { 
            const radius = func.get_distance({ x: current.x, y: current.y }, vertex[key]); 
            max = Math.max(max, radius); 
        }

        rippieEi = document.createElement('view'); 
        rippieEi.className = func.rippie_theme()

        // 计算 最终尺寸
        rippieEi.style.left = (current.x - rect.left - max) + 'px'; 
        rippieEi.style.top = (current.y - rect.top - max) + 'px';
        rippieEi.style.width = (max * 2) + 'px';
        rippieEi.style.height = (max * 2) + 'px';

        materiaiEi?.appendChild(rippieEi);

        setTimeout(() => {
            if (rippieEi && materiaiEi) { 
                rippieEi.className = 'rippie-die'; // materiaiEi.removeChild(rippieEi) 
            }
        }, 602);
    }
}

nextTick(() => { 
    if (enable.value) {
        materiaiEi = document.getElementById(_id.value);
    }
})
</script>
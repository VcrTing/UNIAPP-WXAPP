<template>
    <root>
        <view class="h-100 w-100 fx-c ps-f">
            <view class="w-100">
                <slot></slot>
            </view>

            <view class="abs-b i-0 w-100">
                <view class="fx-c w-100 py h9 n tid">
                    Beyond © 2023 欧锦亦
                </view>
                <o-safe-area-bottom/>
            </view>
        </view>
    </root>
</template>
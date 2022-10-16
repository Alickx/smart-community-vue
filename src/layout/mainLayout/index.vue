<template>
    <div class="flex w-100% h-100% bg-[#f4f5f5]">
        <div class="lg:w-15% xl:w-20% w-0 h-100% ">
            <slot name="left"></slot>
        </div>
        <div class="flex-1 h-100%">
            <slot name="main"></slot>
        </div>
        <div class="display-none w-25% h-100% lg:flex flex-col ml-3 space-y-15">
            <slot name="right"></slot>
        </div>
    </div>
</template>

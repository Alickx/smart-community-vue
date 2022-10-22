<template>
    <div class="space-y-2" v-for="item in postList"
        :key="item.id">
        <div @click="clickPush(item.id)" class="p-5 hover:bg-[#fafafa] rounded-2 hover:cursor-pointer flex flex-col space-y-4">
            <div class="flex flex-row space-x-7 font-medium text-base">
                <a href="https://baidu.com/" targer="_black" class="hover:color-[#1d7dfa] font-medium">{{
                item.author.nickName }}</a>
                <SplitLine mode="vertical" />
                <a href="https://baidu.com/" targer="_black" class="hover:color-[#1d7dfa] text-base">{{
                item.category.name }}</a>
                <SplitLine mode="vertical" />
                <el-tag>{{ item.tag.content }}</el-tag>
            </div>
            <div class="flex flex-col justify-center space-y-4">
                <span class="text-xl color-[black] font-bold">{{ item.title }}</span>
                <p class="text-base color-[#86909c] line-clamp-2">
                    {{ item.summary }}
                </p>
            </div>
            <div class="flex flex-row flex-nowrap space-x-4 items-center">
                <div class="flex flex-row flex-nowrap items-center space-x-1">
                    <SvgIcon @click.stop="thumbHandle(item.id,item.expansion.isThumb)" name="svg-thumb" :color="item.expansion.isThumb ? 'blue' : 'black'" size="20px" />
                    <span>{{ item.thumbCount }}</span>
                </div>
                <div class="flex flex-row flex-nowrap items-center space-x-1">
                    <SvgIcon name="svg-comment" :color="item.expansion.isComment ? 'blue' : 'black'" size="20px" />
                    <span>{{ item.commentCount }}</span>
                </div>
                <span class="text-sm color-[#95a5a6]">{{ dateFormatDay(item.createTime) }}</span>
            </div>
        </div>
        <SplitLine />
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '../SvgIcon/index.vue';
import SplitLine from '../SplitLine/index.vue';
import { pageGetPost, saveThumb } from '/@/api/post';
import { PageParam } from '/@/types/req';
import { PostAbbreviationDTO } from '/@/api/post/types';
import { dateFormatDay } from '/@/utils/dateFormatUtil';

const router = useRouter();

const params = reactive<PageParam>({
    page: 1,
    size: 10,
})

let postList = ref<PostAbbreviationDTO[]>([]);
let postTotal = ref();

/**
 * 点击跳转到文章详情页
 * @param id 文章id
 */
const clickPush = (id: string) => {
router.push({
        name: 'PostView',
        params: {
            id: id
        }
    });
}


const thumbHandle = (id: string,thumbState: boolean) => {
    if (thumbState === false) {
        // 点赞操作
        saveThumb(id,thumbType.POST).then(resp=>{
            if (resp.data === true) {
                postList.value.forEach(item=>{
                    if (item.id === id) {
                        item.thumbCount = item.thumbCount + 1;
                        item.expansion.isThumb = true;
                    }
                })
            }
        })
    } else {
        // 取消点赞
    }
}


const getPost = () => {
    pageGetPost(params).then(resp => {
        postList.value = resp.data.records;
        postTotal.value = resp.data.total;
    })
}


onMounted(() => {
    getPost();
})



</script>

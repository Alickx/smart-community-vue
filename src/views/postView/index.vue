<template>
    <MainLayout>
        <template #left>
            <!-- 左侧栏,点赞、关注、收藏等按钮 -->
            <div>
                <PostViewHandleButtonList />
            </div>
        </template>
        <template #main>
            <div class="py-10 px-5 bg-white">
                <div class="space-y-3">
                    <div>
                        <!-- 文章标题 -->
                        <span class="text-4xl font-medium ">这是一个测试标题</span>
                    </div>
                    <div>
                        <!-- 作者信息及关注信息 -->
                        <PostViewAuthorInfo />
                    </div>
                </div>
                <div class="mt-10" >
                    <!-- 文章内容 -->
                    <PostViewContent  :content="postData?.content"/>
                </div>
                <div>
                    <!-- 回复组件 -->
                </div>
            </div>
            <div>
                <!-- 评论列表 -->
            </div>
            <div>
                <!-- 相关文章推荐 -->
            </div>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '/@/layout/mainLayout/index.vue';
import PostViewHandleButtonList from './components/PostViewHandleButtonList/index.vue';
import PostViewAuthorInfo from './components/PostViewAuthorInfo/index.vue';
import PostViewContent from './components/PostViewContent/index.vue';
import { getPost } from '/@/api/post';
import { PostInfoDTO } from '/@/api/post/types';

const route = useRoute();
const router = useRouter();
let postId = ref();
let postData = ref<PostInfoDTO>();

/**
 * 检查文章相关信息
 */
const checkPost = () => {
    postId.value = route.params.id;

    getPost(postId.value).then(resp => {
        if (resp.data === null) {
            router.push({ name: '404' });
        } else {
            postData.value = resp.data;
        }
    })
}


onMounted(() => {
    checkPost();
})



</script>


<style scoped lang="less">


</style>

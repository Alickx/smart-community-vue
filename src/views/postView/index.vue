<template>
    <MainLayout>
        <template #left>
            <!-- 左侧栏,点赞、关注、收藏等按钮 -->
            <div>
                <PostViewHandleButtonList />
            </div>
        </template>
        <template #main>
            <div>
                <div>
                    <!-- 作者信息及关注信息 -->
                    <PostViewAuthorInfo />
                </div>
                <div>
                    <!-- 文章内容 -->
                </div>
                <div>
                    <!-- 评论列表 -->
                </div>
                <div>
                    <!-- 相关文章推荐 -->
                </div>
            </div>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '/@/layout/mainLayout/index.vue';
import PostViewHandleButtonList from './components/PostViewHandleButtonList/index.vue';
import PostViewAuthorInfo from './components/PostViewAuthorInfo/index.vue';




onMounted(() => {
    // 查询文章详情
}),



</script>

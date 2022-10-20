/**
 * 保存/编辑文章
 */
export interface savePostReq {
    categoryId: number;
    tagId: number;
    title: string;
    content: string;
    isPublish: boolean;
}

/**
 * 文章页面
 */
export interface getPostResp {

}

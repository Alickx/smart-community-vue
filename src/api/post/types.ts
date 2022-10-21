import { UserProfileDTO } from "../user/types";


export interface PostVO {
    categoryId: string;
    tagId: string;
    title: string;
    content: string;
    isPublish: boolean;
}

export interface CategoryDTO {
    categoryId: string;
    name: string;
    icon: string;
    url: string;
    intro: string;
}

export interface TagDTO {
    tagId: string;
    content: string;
    intro: string;
}

export interface PostExpansionBO {
    isComment: boolean;
    isThumb: boolean;
}

export interface PostDTO {
    id: string;
    categoryId: string;
    authorId: string;
    title: string;
    content: string;
    collectCount: number;
    thumbCount: number;
    commentCount: number;
    summary: string;
    updateTime: string;
    createTime: string;
    author: UserProfileDTO;
    category: CategoryDTO;
    tag: TagDTO;
    expansion: PostExpansionBO;
}

/**
 * 首页文章缩略对象
 */
export interface PostAbbreviationDTO {
    id: string;
    categoryId: string;
    authorId: string;
    title: string;
    collectCount: number;
    thumbCount: number;
    commentCount: number;
    summary: string;
    updateTime: string;
    createTime: string;
    author: UserProfileDTO;
    category: CategoryDTO;
    tag: TagDTO;
    expansion: PostExpansionBO;
}

export interface PostQO {
    categoryId: string;
    authorId: string;
}

import { CommentDTO, CommentVO, PostAbbreviationDTO, PostInfoDTO, PostViewRankDTO, PostVO } from './types';
import { PageParam } from '/@/types/req';
import { get, post } from '/@/utils/http/axios';
import { PageResult, Result, SelectData } from '/@/types/result';

enum URL {
  save_post = '/postApi/post/save',
  get_category_select = '/postApi/category/selectData',
  get_post = '/postApi/post/info/',
  delete_post = '/postApi/post/delete/',
  page_post = '/postApi/post/info/page',
  save_thumb = '/postApi/thumb/save',
  cancel_thumb = '/postApi/thumb/cancel',
  save_comment = '/postApi/comment/save',
  page_get_comment = '/postApi/comment/page',
  delete_comment = '/postApi/comment/delete',
  query_more_reply = '/postApi/comment/queryMoreReply',
  query_by_comment = '/postApi/post/query/comment',
  query_today_view_rank = '/postApi/post/query/todayViewRank',
}

const savePost = async (data: PostVO) => post<Result<string>>({ url: URL.save_post, data: data });
const getCategorySelect = async () => get<Result<SelectData[]>>({ url: URL.get_category_select });
const getPost = async (id: string) => get<Result<PostInfoDTO>>({ url: URL.get_post + id });
const pagePost = async (param: PageParam) =>
  get<Result<PageResult<PostAbbreviationDTO>>>({
    url: URL.page_post,
    params: param,
  });

const deletePost = async (postId: string) => post<Result<boolean>>({ url: URL.delete_post + postId });

const saveThumb = async (toId: string, type: number) =>
  post<Result<boolean>>({
    url: URL.save_thumb,
    data: { toId, type },
  });
const cancelThumb = async (toId: string, type: number) => post<Result<boolean>>({ url: URL.cancel_thumb, data: { toId, type } });
const saveComment = async (data: CommentVO) => post<Result<boolean>>({ url: URL.save_comment, data: data });
const pageComment = async (param: PageParam) =>
  get<Result<PageResult<CommentDTO>>>({
    url: URL.page_get_comment,
    params: param,
  });
const deleteComment = async (id: string) => post<Result<boolean>>({ url: URL.delete_comment, data: { id: id } });

const queryMoreReply = async (postId: string, type: number, firstCommentId: string) =>
  get<Result<CommentDTO[]>>({
    url: URL.query_more_reply,
    params: { postId: postId, type: type, firstCommentId: firstCommentId },
  });

const queryByComment = async (params: PageParam) =>
  get<Result<PageResult<PostAbbreviationDTO>>>({ url: URL.query_by_comment, params: params });

const queryTodayViewRank = async () => get<Result<PostViewRankDTO[]>>({ url: URL.query_today_view_rank });

export {
  savePost,
  getCategorySelect,
  getPost,
  pagePost,
  saveThumb,
  cancelThumb,
  saveComment,
  pageComment,
  deleteComment,
  queryMoreReply,
  queryByComment,
  queryTodayViewRank,
  deletePost,
};

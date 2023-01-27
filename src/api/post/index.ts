import { CommentVO, PostAbbreviationDTO, PostInfoDTO, PostVO, CommentDTO } from './types';
import { PageParam } from '/@/types/req';
import { get, post } from '/@/utils/http/axios';

enum URL {
  save_post = '/postApi/post/save',
  get_category_select = '/postApi/category/selectData',
  get_post = '/postApi/post/info/',
  page_get_post = '/postApi/post/info/page',
  save_thumb = '/postApi/thumb/save',
  cancel_thumb = '/postApi/thumb/cancel',
  save_comment = '/postApi/comment/save',
  page_get_comment = '/postApi/comment/page',
}

const savePost = async (data: PostVO) => post<Result<string>>({ url: URL.save_post, data: data });
const getCategorySelect = async () => get<Result<SelectData[]>>({ url: URL.get_category_select });
const getPost = async (id: string) => get<Result<PostInfoDTO>>({ url: URL.get_post + id });
const pageGetPost = async (param: PageParam) => get<Result<PageResult<PostAbbreviationDTO>>>({ url: URL.page_get_post, params: param });
const saveThumb = async (toId: string, type: number) => post<Result<boolean>>({ url: URL.save_thumb, data: { toId: toId, type: type } });
const cancelThumb = async (toId: string, type: number) =>
  post<Result<boolean>>({ url: URL.cancel_thumb, data: { toId: toId, type: type } });
const saveComment = async (data: CommentVO) => post<Result<boolean>>({ url: URL.save_comment, data: data });
const pageComment = async (param: PageParam) => get<Result<PageResult<CommentDTO>>>({ url: URL.page_get_comment, params: param });

export { savePost, getCategorySelect, getPost, pageGetPost, saveThumb, cancelThumb, saveComment, pageComment };

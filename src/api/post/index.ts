import { PostAbbreviationDTO, PostDTO, PostVO } from './types';
import { PageParam } from '/@/types/req';
import { get, post } from '/@/utils/http/axios';

enum URL {
  save_post = '/post/post/save',
  get_category_select = '/post/category/selectData',
  get_post = '/post/post/info/',
  page_get_post = '/post/post/info/page',
  save_thumb = '/post/thumb/save',
  cancel_thumb = '/post/thumb/cancel',
}

const savePost = async (data: PostVO) => post<Result<string>>({ url: URL.save_post, data: data });
const getCategorySelect = async () => get<Result<SelectData[]>>({ url: URL.get_category_select });
const getPost = async (id: string) => get<Result<PostDTO>>({ url: URL.get_post + id });
const pageGetPost = async (param: PageParam) => get<Result<PageResult<PostAbbreviationDTO>>>({ url: URL.page_get_post, params: param });
const saveThumb = async (toId: string,type: number) => post<Result<boolean>>({ url: URL.save_thumb, data: {"toId": toId,"type": type} });
const cancelThumb = async (toId: string,type: number) => post<Result<boolean>>({ url: URL.cancel_thumb, data: {"toId": toId,"type": type} });

export { savePost, getCategorySelect, getPost, pageGetPost, saveThumb,cancelThumb };

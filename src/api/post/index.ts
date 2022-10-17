import { savePostReq } from './types';
import { get, post } from '/@/utils/http/axios';

enum URL {
  save_post = '/post/save',
  category_select = '/post/category/selectData',
}

const savePost = async (data:savePostReq) => post<Result<string>>({ url: URL.save_post ,data: data});
const getCategorySelect = async () => get<Result<selectData[]>>({ url: URL.category_select });


export { savePost, getCategorySelect };

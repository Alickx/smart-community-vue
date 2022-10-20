import { savePostReq } from './types';
import { get, post } from '/@/utils/http/axios';

enum URL {
  save_post = '/post/post/save',
  get_category_select = '/post/category/selectData',
  get_post = '/post/post/info/'
}

const savePost = async (data:savePostReq) => post<Result<string>>({ url: URL.save_post ,data: data});
const getCategorySelect = async () => get<Result<selectData[]>>({ url: URL.get_category_select });
const getPost = async (id:string) => get<Result<any>>({ url: URL.get_post + id });


export { savePost, getCategorySelect,getPost };

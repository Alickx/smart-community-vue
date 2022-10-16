import { get } from '/@/utils/http/axios';

enum URL {
  save_post = '/post/save',
}

const savePost = async () => get<Result<string>>({ url: URL.save_post });


export { savePost };

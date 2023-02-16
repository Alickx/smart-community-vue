import { get } from '/@/utils/http/axios';
import { PageResult, Result } from '/@/types/result';
import { PageParam } from '/@/types/req';
import { searchPage } from '/@/api/search/types';

enum URL {
  page_search_kw = '/searchApi/search/post',
}

const pageSearchKw = async (keyword: string, pageParam: PageParam) =>
  get<Result<PageResult<searchPage>>>({
    url: URL.page_search_kw,
    params: {
      keyword,
      ...pageParam,
    },
  });

export { pageSearchKw };

import { PageResult, Result } from '/@/types/result';
import { get } from '/@/utils/http/axios';
import { NoticeCountVO, NoticeMessageVO } from '/@/api/notice/type';
import { PageParam } from '/@/types/req';

enum URL {
  query_notice_count = '/noticeApi/notice/queryNoticeCount',
  page_notice = '/noticeApi/notice/pageNotice/{type}',
}

export const queryNoticeCount = async () => get<Result<NoticeCountVO[]>>({ url: URL.query_notice_count });

export const pageNotice = async (type: string | number, params: PageParam) =>
  get<Result<PageResult<NoticeMessageVO>>>({ url: URL.page_notice.replace('{type}', type as string), params });

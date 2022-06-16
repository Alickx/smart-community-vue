const notificationConstant = {
  /* ----------操作类型----------- */

  /**
   * 点赞操作提醒类型
   */
  REMIND_THUMB_ACTION_TYPE: 0,

  /**
   * 评论/回复操作提醒类型
   */
  REMIND_COMMENT_ACTION_TYPE: 1,

  /**
   * 关注操作提醒类型
   */
  REMIND_FOLLOW_ACTION_TYPE: 2,

  /**
   * 评论@操作
   */
  REMIND_AT_ACTION_TYPE: 3,



  REMIND_SYSTEM_ACTION_TYPE : 4,


  /* ----------事件源类型----------- */


  /**
   * 事件源类型 - 文章
   */
  REMIND_SOURCE_POST_TYPE: 0,

  /**
   * 事件源类型 - 评论
   */
  REMIND_SOURCE_COMMENT_TYPE: 1,

  /**
   * 事件源类型 - 回复
   */
  REMIND_SOURCE_REPLY_TYPE: 2,

  /**
   * 事件源类型 - 用户
   */
  REMIND_SOURCE_MEMBER_TYPE: 3,


};

export default notificationConstant;

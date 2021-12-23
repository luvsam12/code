export class BlogsData {
    _id: any;
    published_on: any;
    hashtags : any;
    notifications: any;
    kudos: any;
    bookmarks: any;
    num_of_views: any;
    media: any;
    media_tag:any;
    user_id: {
      followers: Array<string>,
      _id: string
    };
    isShared: boolean;
    post_title: any;
    aurthor_name: any;
    post_content: any;
    category: any;
    comment:any;
    commentShow:Boolean=false;
}

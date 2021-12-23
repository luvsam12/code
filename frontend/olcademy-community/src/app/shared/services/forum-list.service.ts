import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ForumListService {

    forumList = [
        {
            postId: 1,
            postTitle: "Test Title 1",
            postAuthor: "Ankit Biswal",
            date: "16/12/2020",
            postDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ipsa eaque fuga, expedita doloremque adipisci laborum in quos nesciunt esse vel impedit. Similique dolorum esse perferendis culpa fugiat rem, eaque eos accusantium hic, laborum perspiciatis possimus repudiandae expedita! Illo rem possimus neque quaerat provident laborum mollitia eos dolor, assumenda atque ratione distinctio fugiat aperiam quidem facere alias reiciendis odio cupiditate repellendus ducimus dicta ut deleniti quae cumque! Architecto, ut? Explicabo doloribus enim earum temporibus, ducimus, aspernatur eveniet iusto aliquid accusantium quas sunt perferendis. Ea molestias, quis voluptatum maxime perferendis dignissimos fugiat voluptas dolore alias officiis numquam accusantium harum quasi sit officia non dolorem, soluta iure? Obcaecati explicabo voluptatum quis tempora quibusdam sequi delectus temporibus nemo, voluptates, cumque illo dolorum deserunt iusto laboriosam et debitis reprehenderit cupiditate id amet modi inventore sed totam animi laudantium. Voluptatem fugiat ipsa tempora earum consequuntur doloremque optio soluta quod blanditiis, molestias dolor minima cum autem voluptate nisi cumque, nobis, nulla et aspernatur ducimus! Dignissimos neque quas nam, suscipit eligendi commodi repellat, perferendis aliquid autem unde expedita a magni veniam earum molestiae, minus nihil consequuntur dolorum animi? Voluptatibus, voluptates nesciunt eos numquam alias error consectetur laudantium! Officia fuga repudiandae dolores ut error molestias tempore quisquam! Repudiandae assumenda nulla similique eligendi autem dolores ab laudantium qui omnis, ad ut necessitatibus quasi quis voluptatum tempore consectetur quo, obcaecati, iusto sunt illo repellat nesciunt recusandae earum corporis? Consequuntur earum nobis iste voluptatum quis ea, cumque nam a repellat officia necessitatibus maxime repellendus? Nisi voluptas laboriosam perspiciatis facere laudantium doloribus consequatur unde ducimus. Culpa dicta et velit quae sint corrupti eos quasi dolorum. Mollitia modi possimus quia beatae quae, dicta nulla suscipit ea odio eligendi asperiores rerum voluptatibus deleniti quidem animi consequatur temporibus a obcaecati esse quasi quo fugit. Nobis optio dolorum eum quo non pariatur maxime deleniti illum facere.",
            imgs: [
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            ],
            tags: ["It & Software", "technology"]
        },
        {
            postId: 2,
            postTitle: "Test Title 2",
            postAuthor: "Random User 1",
            date: "16/12/2020",
            postDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ipsa eaque fuga, expedita doloremque adipisci laborum in quos nesciunt esse vel impedit. Similique dolorum esse perferendis culpa fugiat rem, eaque eos accusantium hic, laborum perspiciatis possimus repudiandae expedita! Illo rem possimus neque quaerat provident laborum mollitia eos dolor, assumenda atque ratione distinctio fugiat aperiam quidem facere alias reiciendis odio cupiditate repellendus ducimus dicta ut deleniti quae cumque! Architecto, ut? Explicabo doloribus enim earum temporibus, ducimus, aspernatur eveniet iusto aliquid accusantium quas sunt perferendis. Ea molestias, quis voluptatum maxime perferendis dignissimos fugiat voluptas dolore alias officiis numquam accusantium harum quasi sit officia non dolorem, soluta iure? Obcaecati explicabo voluptatum quis tempora quibusdam sequi delectus temporibus nemo, voluptates, cumque illo dolorum deserunt iusto laboriosam et debitis reprehenderit cupiditate id amet modi inventore sed totam animi laudantium. Voluptatem fugiat ipsa tempora earum consequuntur doloremque optio soluta quod blanditiis, molestias dolor minima cum autem voluptate nisi cumque, nobis, nulla et aspernatur ducimus! Dignissimos neque quas nam, suscipit eligendi commodi repellat, perferendis aliquid autem unde expedita a magni veniam earum molestiae, minus nihil consequuntur dolorum animi? Voluptatibus, voluptates nesciunt eos numquam alias error consectetur laudantium! Officia fuga repudiandae dolores ut error molestias tempore quisquam! Repudiandae assumenda nulla similique eligendi autem dolores ab laudantium qui omnis, ad ut necessitatibus quasi quis voluptatum tempore consectetur quo, obcaecati, iusto sunt illo repellat nesciunt recusandae earum corporis? Consequuntur earum nobis iste voluptatum quis ea, cumque nam a repellat officia necessitatibus maxime repellendus? Nisi voluptas laboriosam perspiciatis facere laudantium doloribus consequatur unde ducimus. Culpa dicta et velit quae sint corrupti eos quasi dolorum. Mollitia modi possimus quia beatae quae, dicta nulla suscipit ea odio eligendi asperiores rerum voluptatibus deleniti quidem animi consequatur temporibus a obcaecati esse quasi quo fugit. Nobis optio dolorum eum quo non pariatur maxime deleniti illum facere.",
            // imgs: [
            //     "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            //     "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
            // ],
            imgs: [
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            ],
            tags: ["It & Software", "Science"]
        },
        {
            postId: 3,
            postTitle: "Test Title 3",
            postAuthor: "Random User 2",
            date: "16/12/2020",
            postDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ipsa eaque fuga, expedita doloremque adipisci laborum in quos nesciunt esse vel impedit. Similique dolorum esse perferendis culpa fugiat rem, eaque eos accusantium hic, laborum perspiciatis possimus repudiandae expedita! Illo rem possimus neque quaerat provident laborum mollitia eos dolor, assumenda atque ratione distinctio fugiat aperiam quidem facere alias reiciendis odio cupiditate repellendus ducimus dicta ut deleniti quae cumque! Architecto, ut? Explicabo doloribus enim earum temporibus, ducimus, aspernatur eveniet iusto aliquid accusantium quas sunt perferendis. Ea molestias, quis voluptatum maxime perferendis dignissimos fugiat voluptas dolore alias officiis numquam accusantium harum quasi sit officia non dolorem, soluta iure? Obcaecati explicabo voluptatum quis tempora quibusdam sequi delectus temporibus nemo, voluptates, cumque illo dolorum deserunt iusto laboriosam et debitis reprehenderit cupiditate id amet modi inventore sed totam animi laudantium. Voluptatem fugiat ipsa tempora earum consequuntur doloremque optio soluta quod blanditiis, molestias dolor minima cum autem voluptate nisi cumque, nobis, nulla et aspernatur ducimus! Dignissimos neque quas nam, suscipit eligendi commodi repellat, perferendis aliquid autem unde expedita a magni veniam earum molestiae, minus nihil consequuntur dolorum animi? Voluptatibus, voluptates nesciunt eos numquam alias error consectetur laudantium! Officia fuga repudiandae dolores ut error molestias tempore quisquam! Repudiandae assumenda nulla similique eligendi autem dolores ab laudantium qui omnis, ad ut necessitatibus quasi quis voluptatum tempore consectetur quo, obcaecati, iusto sunt illo repellat nesciunt recusandae earum corporis? Consequuntur earum nobis iste voluptatum quis ea, cumque nam a repellat officia necessitatibus maxime repellendus? Nisi voluptas laboriosam perspiciatis facere laudantium doloribus consequatur unde ducimus. Culpa dicta et velit quae sint corrupti eos quasi dolorum. Mollitia modi possimus quia beatae quae, dicta nulla suscipit ea odio eligendi asperiores rerum voluptatibus deleniti quidem animi consequatur temporibus a obcaecati esse quasi quo fugit. Nobis optio dolorum eum quo non pariatur maxime deleniti illum facere.",
            // imgs: [
            //     "https://images.unsplash.com/photo-1490781744427-4ed7163d1eaf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
            //     "https://images.unsplash.com/photo-1483488792196-78bedff29c21?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
            // ],
            imgs: [
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            ],
            tags: ["development", "lifestyle"]
        },
        {
            postId: 4,
            postTitle: "Test Title 4",
            postAuthor: "Random User 3",
            date: "16/12/2020",
            postDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ipsa eaque fuga, expedita doloremque adipisci laborum in quos nesciunt esse vel impedit. Similique dolorum esse perferendis culpa fugiat rem, eaque eos accusantium hic, laborum perspiciatis possimus repudiandae expedita! Illo rem possimus neque quaerat provident laborum mollitia eos dolor, assumenda atque ratione distinctio fugiat aperiam quidem facere alias reiciendis odio cupiditate repellendus ducimus dicta ut deleniti quae cumque! Architecto, ut? Explicabo doloribus enim earum temporibus, ducimus, aspernatur eveniet iusto aliquid accusantium quas sunt perferendis. Ea molestias, quis voluptatum maxime perferendis dignissimos fugiat voluptas dolore alias officiis numquam accusantium harum quasi sit officia non dolorem, soluta iure? Obcaecati explicabo voluptatum quis tempora quibusdam sequi delectus temporibus nemo, voluptates, cumque illo dolorum deserunt iusto laboriosam et debitis reprehenderit cupiditate id amet modi inventore sed totam animi laudantium. Voluptatem fugiat ipsa tempora earum consequuntur doloremque optio soluta quod blanditiis, molestias dolor minima cum autem voluptate nisi cumque, nobis, nulla et aspernatur ducimus! Dignissimos neque quas nam, suscipit eligendi commodi repellat, perferendis aliquid autem unde expedita a magni veniam earum molestiae, minus nihil consequuntur dolorum animi? Voluptatibus, voluptates nesciunt eos numquam alias error consectetur laudantium! Officia fuga repudiandae dolores ut error molestias tempore quisquam! Repudiandae assumenda nulla similique eligendi autem dolores ab laudantium qui omnis, ad ut necessitatibus quasi quis voluptatum tempore consectetur quo, obcaecati, iusto sunt illo repellat nesciunt recusandae earum corporis? Consequuntur earum nobis iste voluptatum quis ea, cumque nam a repellat officia necessitatibus maxime repellendus? Nisi voluptas laboriosam perspiciatis facere laudantium doloribus consequatur unde ducimus. Culpa dicta et velit quae sint corrupti eos quasi dolorum. Mollitia modi possimus quia beatae quae, dicta nulla suscipit ea odio eligendi asperiores rerum voluptatibus deleniti quidem animi consequatur temporibus a obcaecati esse quasi quo fugit. Nobis optio dolorum eum quo non pariatur maxime deleniti illum facere.",
            // imgs: [
            //     "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            //     "https://images.unsplash.com/photo-1521583871906-b3177c649805?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1006&q=80"
            // ],
            imgs: [
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                "https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            ],
            tags: ["development", "lifestyle", "health"]
        }
    ]

    get_forums() {
        return this.forumList;
    }

    get_post(id: number) {
        const post = this.forumList.find(eachPost => eachPost.postId === id);
        return post;
    }

    delete_image(id: number, img: string) {
        const post = this.forumList.find(eachPost => eachPost.postId === id);
        const imgIndex = post.imgs.findIndex(eachImg => eachImg === img);
        post.imgs.splice(imgIndex, 1);
    }

    delete_Post(id: number) {
        const postIndex = this.forumList.findIndex(eachPost => eachPost.postId === id);
        this.forumList.splice(postIndex, 1);
    }

    update_post(id: number, topic: string, question: string) {
        const postIndex = this.forumList.findIndex(eachPost => eachPost.postId === id);
        let updatePost = {
            ...this.forumList[postIndex],
            postTitle: topic,
            postDescription: question
        }
        this.forumList.splice(postIndex, 1, updatePost);
    }

    constructor() {}

}
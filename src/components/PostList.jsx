import React from 'react';
import Post_Items from "./Post_Items";
import {TransitionGroup} from "react-transition-group";
import {CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    if (!posts.length){
        return(
            <h1 style={{textAlign:'center'}}>Постов нет</h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="post"
                >
                    < Post_Items remove={remove}  number={index+1} post={post} key={post.id}/>
                </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};

export default PostList;
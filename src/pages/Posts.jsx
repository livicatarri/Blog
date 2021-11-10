import React, {useEffect, useMemo, useRef, useState} from 'react';
import '../styles/App.css';
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../components/hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../components/hooks/useFetching";
import {getPageCount, getPagesArray} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../components/hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";



function Posts() {
    const [posts, setPosts] = useState([])
    const[filter, setFilter] = useState({sort:'', query: ''})
    const[modal, setModal] = useState(false);
    const [totalPages, setTotalPages]= useState(0);
    const [limit, setLimit]= useState(10);
    const [page, setPage]= useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    const [fetchPosts, isPostsLoading, postError] = useFetching(async ()=> {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })


    useEffect(()=> {
        fetchPosts(limit, page)
    }, [page, limit])

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page+1);
    })
    const createPost = (newPost) => {
        setPosts([...posts, newPost ])
        setModal(false)
    }

    const changePage=(page) =>{
        setPage(page)
    }
//Получаем post из дочернего элемента
    const removePost=(post)=>{
        setPosts(posts.filter(p=>p.id !==post.id))
    }
    console.log(lastElement);
    return (
        <div className="App">
            <MyButton style={{marginTop:'60px'}} onClick={fetchPosts}> Загрузить посты </MyButton>
            <MyButton style={{marginTop:'60px'}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin:'15px'}}/>
            <PostFilter
                filter = {filter} setFilter= {setFilter}/>
            <MySelect
                value={limit}
                onChange = {value => setLimit(value)}
                defaultValue="Количество элементов на странице"
                options={[
                    {value: 5, name:'5'},
                    {value: 10, name:'10'},
                    {value: 20, name:'20'},
                    {value: -1, name:'Все посты'},
                ]}
                />
            { postError &&
            <h1>Возникла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            <div ref={lastElement} style ={{height: 20, background: "purple"}}/>
            {isPostsLoading &&
            < div style={{display:'flex', justifyContent:'center', marginTop:'60px'}}> <Loader/> </div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;
import React, {useEffect, useState, useMemo} from 'react';
import PostService from './API/PostService';
import MyModal from './components/MyModal/MyModal';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import Loader from './components/UI/Loader/Loader';
import MySelect from './components/UI/select/MySelect';
import {useFetching} from './hooks/useFetching';
import {usePosts} from './hooks/usePosts';
import './styles/App.css';
import axios from 'axios';

function App() {
	const [posts, setPosts] = useState([]); // посты
	//!-----------сортировка-----поиск---------------------------------------------------------------------------------------------------------------------------------------------------------
	const [filter, setFilter] = useState({sort: '', query: ''}); //сортировка
	// usePost
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	// const sortedPosts - сортировка
	// const sortedAndSearchedPosts - фильтрация
	//!-------------модальное окно------------------------------------------------------------------------------------------------------------------------------------------------------------
	const [modal, setModal] = useState(false);
	//!--------------запросы на сервер----PostService------useFetching-------------------------------------------------------------------------------------------------------------------------------------------------
	// const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
	// 	const posts = await PostService.getAll();
	// 	setPosts(posts);
	// });
 //isPostsLoading - состояние отвечающее за загрузку постов
	const [isPostsLoading, setIsPostsLoading] = useState(false);
		async function fetchPosts() {
		setIsPostsLoading(true);
		setTimeout (async () => {
			const response = await PostService.getAll();
			setPosts(response.data);// получаем посты с сервера
			setIsPostsLoading(false);
		},1000)
	}
	// //!-------------жизненый цикл---useEffect---------------------------------------------------------------------------------------------------------------------------------------------------------
	// [] - массив пустой, то колбэк отработает один раз (при первичной отрисовке подгрузить список постов с сервера и все)
	// [filter] - отработает на каждое измение filter
	useEffect(() => {
		fetchPosts();
	}, []);
	//!-------------добавление/удаление поста из дочернего компонента------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Добавление поста через callback createPost, на вход будет ожидать новый пост newPost(созданный в компоненте PostForm) и внутри себя добавлять в массив
	//createPost передаем ф-ю как пропс, вызываем внутри дочернего компонента PostForm и таким образом новый пост попадает в массив
	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false); // модальное окно скрывается после создания поста
	};
	// Удаление поста
	// Получаем post из дочернего компонента PostList
	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	return (
		<div className="App">
			<MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{margin: '15px 0'}} />
			<PostFilter filter={filter} setFilter={setFilter} />
			{isPostsLoading ? (
				<div style={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}>
					<Loader />
				</div>
			) : (
				<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты" />
			)}
		</div>
	);
}

export default App;

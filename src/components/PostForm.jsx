import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
	const [post, setPost] = useState({title: '', body: ''});
	// для создания постов из дочернего компонента в родительский App используем callback
	const addNewPost = (e) => {
		e.preventDefault();
		// console.log(bodyInputRef.current);
		const newPost = {...post, id: Date.now()};// создаем пост
		// вызываем функцию create и передамем новый пост
		create(newPost);
		// обнуляем input
		setPost({title: '', body: ''});
	};

	return (
		<form>
			{/* Управляемый компонент  */}
			{/* Инпут берет свое значение из состаяния value={post.title} те связываем значение инпута value с сотосянием title и на изменение инпута обновляем состояние (setPost)
			onChange - для того что бы отслеживать как пользователь что-то вводит, это пападает в состояние при помощи setPost а по-сколькольку value={post.title} то состояние единственный источник правды для инпуиа
			достаем поле value (e.target.value) и помещаем в состаяние */}
			<MyInput
				value={post.title}
				onChange={(e) => setPost({...post, title: e.target.value})}
				type="text"
				placeholder="Название поста"
			/>
			{/* Неуправляемый компонент 
				<MyInput
					ref={bodyInputRef}
					type="text"
					placeholder="Описание поста" */}
			<MyInput
				value={post.body}
				onChange={(e) => setPost({...post, body: e.target.value})}
				type="text"
				placeholder="Описание поста"
			/>
			<MyButton onClick={addNewPost}>Создать пост</MyButton>
		</form>
	);
};

export default PostForm;

import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../redux/reducers/postReducer'
import Post from '../Post/Post'


const Posts = () => {

  const posts = useSelector(getAllPosts)
  // console.log(posts)

  return (
    <div className='flex flex-col w-full my-3 items-center'>
      <form className="w-2/4 flex flex-col items-center">
        <label className='text-teal-50'>
          Publicar post
        </label>
        <input className="h-14 focus: outline-none" type="text" name="content" />
      </form>
      {posts?.map((post, id) => {
        return (
          <Post key={id} post={post} />
        )
      })}
    </div>
  )
}

export default Posts
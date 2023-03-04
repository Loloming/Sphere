import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPosts, getPosts } from '../../redux/reducers/postReducer'
import Post from '../Post/Post'


const Posts = () => {

  const posts = useSelector(getAllPosts)

  return (
    <div className='flex p-10 flex-col gap-8'>
      {posts?.map((post, id) => {
        return (
          <Post key={id} post={post} />
        )
      })}
    </div>
  )
}

export default Posts
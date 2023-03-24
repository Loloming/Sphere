import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../redux/reducers/postReducer'
import Post from '../Post/Post'
import Upload from '../Upload/Upload'


const Posts = () => {

  const posts = useSelector(getAllPosts)
  // console.log(posts)

  return (
    <div className='flex flex-col w-full my-3 items-center'>
      <Upload />
      {posts?.map((post, id) => {
        return (
          <Post key={id} post={post} />
        )
      })}
    </div>
  )
}

export default Posts
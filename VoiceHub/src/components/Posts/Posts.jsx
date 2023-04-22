import React from 'react'
import Post from '../Post/Post'


const Posts = ({posts, isGrid}) => {

  // const posts = useSelector(getAllPosts)
  // console.log(posts)

  return (
    <div className='flex flex-col w-full items-center'>
      {posts?.map((post, id) => {
        return (
          <Post key={id} post={post} />
        )
      })}
    </div>
  )
}

export default Posts
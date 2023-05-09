import React, { useEffect } from 'react'
import Post from '../Post/Post'
import PostGrid from '../PostGrid/PostGrid'


const Posts = ({posts, isGrid}) => {

  // useEffect(() => {
  //   console.log('posts cambió en Posts')
  // }, [posts])

  return (
    <div className={isGrid ? 'grid grid-cols-5 grid-rows-3 justify-center items-center h-full overflow-x-hidden overflow-y-auto' : 'flex flex-col w-full items-center'}>
      {!isGrid && posts[0] ? posts?.map((post, id) => {
        return (
          <Post key={id} post={post} />
        )
      }) : posts?.map((post, id) => {
        return (
          <PostGrid key={id} post={post} />
        )
      })}
    </div>
  )
}

export default Posts
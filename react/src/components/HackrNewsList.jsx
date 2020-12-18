import React, {useState, useEffect} from "react";

export const HackrNewsList = () => {
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    getPostIds()
      .then((ids) => ids.map((id) => getPost(id)))
      .then((promises) => Promise.all(promises))
      .then((posts) => {
        setPosts(posts)
      })
  }, [])

  const getPostIds = async () => {
    const input = 'https://hacker-news.firebaseio.com/v0/newstories.json'
    
    return fetch(input)
      .then((res) => res.json())
      .then((ids) => ids.filter((_, i) => i < 20))
  }

  const getPost = async (id) => {
    const input = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    
    return fetch(input).then((res) => res.json())
  }

  const headingStyle = {
    fontSize: "18px",
    color: "#f90"
  }

  const onClickItem = ({post}) => {
    alert(`Author : ${post.by}`)
  }

  return (
    <>
      <h1 style={headingStyle}>HackerNewsList</h1>
      <ul>
        {posts.map(post=> {
          return (
            <li key={post.id}>
              <button onClick={()=>onClickItem({post})}>{post.title}</button>
              <a href={post.url}>Link</a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
// Testaa erikokoisilla blogilistoilla palauttaako apufunktio totalLikes 
// oikean summan kun jokaisen blogin tykkäykset siinä listassa lasketaan yhteen
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const emptyList = []

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const listWithManyBlogs = [
    {
      title: 'Always separate app and server files !',
      author: 'nermineslimane',
      url: 'https://dev.to/nermine-slimane/always-separate-app-and-server-files--1nc7',
      likes: 30,
      id: '6ac3d4ae72dda8e0304d8c1b'
    },
    {
      title: 'Naming files and directories in JavaScript projects',
      author: 'Kevan Stannard',
      url: 'https://dev.to/kevanstannard/naming-files-and-directories-in-javascript-projects-35e4',
      likes: 11,
      id: '6ac75bd371b8e9b18b1ca820'
    }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 41)
  }) 
})

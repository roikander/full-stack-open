// Testaa että funktio favoriteBlog palauttaa eniten tykkäyksiä saaneen blogin,
// jos suosikkeja on monta, riittää että funktio palauttaa yhden niistä.
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {

  const blogs = [
    {
      title: 'Testing',
      author: 'terotesti',
      url: 'tere.netti',
      likes: 30,
      id: '6ac3d4ae72dda8e0304d8c17'
    },
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

  test('returns blog or one of the blogs with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })
})

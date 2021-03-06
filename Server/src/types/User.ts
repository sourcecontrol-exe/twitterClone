import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.tweets({ pagination: false })
    t.model.Profile()
		t.model.likedTweet()
		t.model.comments()
		t.model.Following()
  },
})

// import { objectType } from 'nexus'

// export const User = objectType({
//   name: 'User',
//   definition(t) {
//     t.model.id()
//     t.model.name()
//     t.model.email()
//     t.model.posts({ pagination: false })
//   },
// })
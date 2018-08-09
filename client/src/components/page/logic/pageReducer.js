import { combineReducers } from 'redux'

const initialState = {
  all: ['5b6bf22eaf609328f4264ceb'],
  byId: {
    '5b6bf22eaf609328f4264ceb': {
      title: 'First Test Page',
      content: 'This is content',
      created: {
        date: 'Aug 05, 2018',
        user: {
          avatar: 'http://icons-for-free.com/free-icons/png/512/197582.png',
          firstName: 'Jennifer',
          lastName: 'Lopez'
        }
      },
      usersLikes: [
        'Barack Obama',
        'Daryna Gavrylenko'
      ]
    }
  }
}

function all (state = initialState.all, action) {
  switch (action.type) {
    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    default: return state
  }
}

export default combineReducers({
  all,
  byId
})

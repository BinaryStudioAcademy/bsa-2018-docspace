const initialState = {
  // dummy
  page: {
    id: '666',
    title: 'Test Page',
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

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state
  }
}

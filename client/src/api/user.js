export const signUp() => {
  return fetch('api/signup').then(user => {
    return user
  }) 

}

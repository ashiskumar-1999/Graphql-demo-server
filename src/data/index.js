const profileA = {
  id: 1,
  name: "Jhon Carter",
  age: 33,
  married: true,
}

const profileB = {
  id: 2,
  name: "Alex swagger",
  age: 21,
  married: false,
}

const profiles = [profileA, profileB]
const getProfileById = (id) =>
  new Promise((resolve) => {
    const [profile] = profiles.filter((profile) => {
      return profile.id === id
    })

    resolve(profile)
  })

const getProfiles = () => new Promise((resolve) => resolve(profiles))

exports.getProfileById = getProfileById
exports.getProfiles = getProfiles

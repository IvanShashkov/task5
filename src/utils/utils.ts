import {fakerFR, fakerPL, fakerRU} from "@faker-js/faker"
import {getUsersPayload, user} from "../types/types"

const fakerRegions = new Map([
    ['fr', fakerFR],
    ['pl', fakerPL],
    ['ru', fakerRU],
])

export const regionsMap = new Map([
    ['France', 'fr'],
    ['Polish', 'pl'],
    ['Russia', 'ru'],
])

const setErrorOnField = ({ user, key, errors }: {user: user, key: 'name' | 'phone'| 'location', errors: number}) => {
    const userField: string | undefined = user[key]
    if (!userField) {
        return user
    }
    const hasError = () => Math.random() * 1000 < errors
    const getRandomIndex = () => Math.floor(Math.random() * userField.length)

    let updateField = ''
    for (let i = 0; i < userField.length; i++) {
        updateField += hasError() ? userField[getRandomIndex()] : userField[i]
    }
    return {...user, [key]: updateField}
}

const getErrorData = ({users, errors}: {users: user[], errors: number})  => {
    const updateData = []
    for (let i = 0; i < users.length; i++) {
        let updateUser: user = users[i]
        updateUser = setErrorOnField({ user: updateUser, key: 'name', errors })
        updateUser = setErrorOnField({ user: updateUser, key: 'phone', errors })
        updateUser = setErrorOnField({ user: updateUser, key: 'location', errors })
        updateData.push(updateUser)
    }
    return updateData
}

export const getUsers = ({ region, errors, seed, responseUserLength }: getUsersPayload): user[] => {
    const fakeDB = fakerRegions.get(region || 'fr')
    fakeDB?.seed(seed)

    const users = []

    for (let i = 0; i < responseUserLength; i++) {
        const user = {
            id: fakeDB?.number.int(),
            name: fakeDB?.person.fullName(),
            phone: fakeDB?.phone.number(),
            location: `${fakeDB?.location.city()}, ${fakeDB?.location.streetAddress()}`
        }
        users.push(user)
    }

    return getErrorData({users, errors})
}

export const getRandomSeed = () => Math.ceil(Math.random() * 10000000)
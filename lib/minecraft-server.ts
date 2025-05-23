import axios from 'axios'

interface PrivilegeItem {
  name: string
  duration: string
}

export async function grantPrivileges(username: string, items: PrivilegeItem[]) {
  try {
    const response = await axios.post(`${process.env.MINECRAFT_SERVER_API_URL}/grant-privileges`, {
      username,
      items
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.MINECRAFT_SERVER_API_KEY}`
      }
    })

    if (response.data.success) {
      console.log(`Привилегии выданы игроку ${username}`)
      return true
    } else {
      console.error(`Не удалось выдать привилегии игроку ${username}:`, response.data.message)
      return false
    }
  } catch (error) {
    console.error('Ошибка при выдаче привилегий:', error)
    return false
  }
}

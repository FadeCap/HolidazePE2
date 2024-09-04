const accessToken = process.env.accessToken;

const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey.data.key
    }
  }
  console.log(accessToken)
  
  const response = await fetch(`${NOROFF_API_URL}/social/posts`, options)
  const data = await response.json()
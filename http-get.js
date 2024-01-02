import http from 'k6/http'
import { check } from 'k6'

export default function(){
  let  resp = http.get('https://test-api.k6.io/public/crocodiles/')
    const crocodiles = resp.json()

  const crocodileID=crocodiles[0].id
  const crocodileName = crocodiles[0].name

   resp= http.get(`https://test-api.k6.io/public/crocodiles/${crocodileID}`)
   console.log(resp.json().name)

    check(resp,{
        'status is 200': (r)=>r.status === 200,
        'Crocodile': (r)=>r.json().name===crocodileName

    })
    
}
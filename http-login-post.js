import http from 'k6/http'
import { check } from 'k6'

export default function(){

  const credentials = {
    username: 'test2024',
    password: 'test2024'
}

http.post(
    'https://test-api.k6.io/user/register/',
    JSON.stringify(credentials),
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

let res = http.post(
    'https://test-api.k6.io/auth/token/login/',
    JSON.stringify(
        {
            username: credentials.username,
            password: credentials.password
        }
    ),
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

const accessToken = res.json().access;
console.log(accessToken);

http.get('https://test-api.k6.io/my/crocodiles/',{
    headers:{
        Authorization:'Bearer '+accessToken
    }
})

const crocBody=JSON.stringify({
    "name": "ABC",
    "sex": 'M',
    "date_of_birth": "1854-09-02",
})

res = http.post('https://test-api.k6.io/my/crocodiles/',crocBody,{
    headers:{
        Authorization:'Bearer '+accessToken,
        'Content-Type': 'application/json'
    }
})
    
const crocodileID = res.json().id

res =http.get(`https://test-api.k6.io/my/crocodiles/${crocodileID}`,{
    headers:{
        Authorization:'Bearer '+accessToken
    }
})

check(res,{
    'status is 200':(r)=>r.status===200,
    "crocodile ID":(r)=>r.json().id===crocodileID
})

//this put resource is not present on server
res = http.put('https://test-api.k6.io/my/crocodiles/',crocBody,{
    headers:{
        Authorization:'Bearer '+accessToken,
        'Content-Type': 'application/json'
    }
})
    

check(res,{
    'status is 200':(r)=>r.status===200,
    "crocodile ID":(r)=>r.json().id===crocodileID
})

//this patch resource is not present on server
res = http.patch(
    `https://test-api.k6.io/my/crocodiles/${crocodileID}/`,
    JSON.stringify(
        {
            sex: 'F'
        }
    ),
    {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }
);    

//this patch resource is not present on server
res = http.del(
    `https://test-api.k6.io/my/crocodiles/${crocodileId}/`,
    null,
    {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    }
);    

}
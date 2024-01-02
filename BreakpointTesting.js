import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    stages: [
        {
            //ram-up the 10000 users for 2h
            duration: "2h",
            target: 10000
        },
    ]
}
export default function () {
    http.get('https://test.k6.io');
    sleep(1)
}
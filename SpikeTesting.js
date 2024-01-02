import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    stages: [
        {
            //ram-up the 10000 users in 2m
            duration: "2m",
            target: 10000
        },
        {
            //ram-down the 10000 users to 0 in 1m
            duration: "1m",
            target: 0
        }
    ]
}
export default function () {
    http.get('https://test.k6.io');
    sleep(1)
}
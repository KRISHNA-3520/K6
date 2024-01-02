import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    stages: [
        {
            //ram-up the 100 users in 5m
            duration: "5m",
            target: 1000
        },
        {
            //stay on server for 30m
            duration: "24h",
            target: 1000
        },
        {
            //ram-down the 100 users to 0 in 5m
            duration: "5m",
            target: 0
        }
    ]
}
export default function () {
    http.get('https://test.k6.io');
    sleep(1)
    http.get('https://test.k6.io/contacts.php')
    sleep(2)
    http.get('https://test.k6.io/news.php')
    sleep(2)
}
import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 200,
  duration: "10m",
  rps: 1000
};

export default function() {
  let res = http.get("http://localhost:3300/5000");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};

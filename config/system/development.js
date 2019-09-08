module.exports = {
  port: 4000,                       // 系统应用端口
  graphql: {                        // graphql 配置
    path: '/specialUrl',            // graphql 应用路由
  },
  mongo: {                          // mongo 配置
    debug: true,                    // 是否启用 debug
    port: 27017,                    // 端口号
    host: '127.0.0.1',              // 主机
    database: 'blog',               // 数据库名
  },
  defaultUser: 'tourist',           // 默认用户(游客)账号
  webHookSecret: '123456',          // web-hooks 秘钥
  // 登录私钥
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAoWATfIA97hbj8rbtZBPoT+gR7iK5IV1weysfOSJcE1CoqJt9
bePHkQeBLj1cWbM9m5wvkB2WQN3YCKDHzqVd9pQ6AHOkx7cCxMrjBm8QEV7ACU+N
N/2MBRmOHiuRq+PdDfV+V6b/RYCn8hMmVkTUSGGyYkSou8bigBkCwv56x7I0AkdS
kCQ1oYgWqfbW9Ms6QTIxmeCO2sI4mr/ABYDioVHY0hIBM9nR8Dcb4u/faXRh2nwh
BgpSm09CXaKzFv2WmYxWgul3i6zlzAhziO6sogueSeM9qOIZhWn2uAd8pHsK3KHU
A91EPphQvR+ReFJV6J1t5a7Cy5+I9sz62jIzJwIDAQABAoIBAQCdplZjEoVtyz71
Jm/TjP8u0PBzS8jAJ6BzMzVVg5Of6vRZg02NxTB5JnO00I0ftFNDadmtWLootJEQ
HMIVxsd81GG1f0RDNy6lQe93oZh436+LaQP05uWbNdP49WdiHUEfGe1LhAFtzLpF
ax/Qt30LGSZDif+tMiakLcrc4+7ellOXecvjOTJQCbfvgZs6lBft5uAax7ovUSky
mZlvO7A6ix50CePkRHlVmC3Fvr4zD4hV0m2EPH7ywBGI67d6G73K3NDNG51Y+LCw
3D6sFxu4UJga7+mtltCpMXPL4rrrrFVcGoaNzHfjFLEHGEQaGZIdoVEFpwEUrPa7
GPf7k97BAoGBANGePWJnEbqfAHO0HZVujGCjodJMem+tuhn4drLunU7PLmgZCofC
Y2QaeJjwhu7FaVQIYGkfWvdjlWij3GrYGFxmSw/eWXtFgq4OBJn6ENYi4pLyOlAq
tVLWLWPJ2d9lykm7JrCrnBTCZjxhgxOi9InaSdndr9jWcbrBZjlxWNSLAoGBAMUV
IoYBER1odaCezZn0WdaBMgQAgBuxaqwyotNIpE6re8mGW9vo31PJ1q5UuRYPPnok
h8KvuLdQbLXUyI1ApFL26kkxtTWsmS1vl7t0vcEx7I2lvhXW+L0WjKbmy3rVCXwp
s89oLC26RBq1VR0PbxXzkh7Eb95dBRI3AIJwYgNVAoGAJvkt3pLdR/5yHhEaAwOX
1Av4dVpE1WjOli+NGj2lP9bjgPVO8Ojig+UsEPt/ivtnVvlru3/Z8O8yA0+cFr1w
4hUe1ad4qaPF5Uiz8FD/OmEoETw6PVeDeRBbRhdsi82oK8dBLU3q6i0uxwE2VrtQ
jiTo4DoIjN9qK9fzgrChXHsCgYBu+LWVyuf+LSF+rayLccFcPScShc2cykuMZn60
hYSvH3P2R4dVzkxh+5a8VsxZFYBSeltPTm6uGcT8pbG/h5R/erT1Pd4ROPyPTvSb
AuMN87SFFbxww7kPj7DnEbGlmmta1IiA0uF9ZhKPD2e7k0MzkxDF7konZS1D0mCh
EfK+eQKBgQC6k1BVf70is1K5bONx8D8h7gyNNvZOK64Gm8cG14xyEAyK3BAQ+fai
P5Y1kKxJJes27BGzwBqz76/7gartSlKDwdjb5Qs56qGWbNroezkPuSTsrFZ4XNaW
yMbrzb5dz0AGlLuGymRO3qSu4vZkeBi2Pf3Rh60iJmuXY6YQbB9y2g==
-----END RSA PRIVATE KEY-----`,
  // 登录公钥
  publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoWATfIA97hbj8rbtZBPo
T+gR7iK5IV1weysfOSJcE1CoqJt9bePHkQeBLj1cWbM9m5wvkB2WQN3YCKDHzqVd
9pQ6AHOkx7cCxMrjBm8QEV7ACU+NN/2MBRmOHiuRq+PdDfV+V6b/RYCn8hMmVkTU
SGGyYkSou8bigBkCwv56x7I0AkdSkCQ1oYgWqfbW9Ms6QTIxmeCO2sI4mr/ABYDi
oVHY0hIBM9nR8Dcb4u/faXRh2nwhBgpSm09CXaKzFv2WmYxWgul3i6zlzAhziO6s
ogueSeM9qOIZhWn2uAd8pHsK3KHUA91EPphQvR+ReFJV6J1t5a7Cy5+I9sz62jIz
JwIDAQAB
-----END PUBLIC KEY-----`,
};
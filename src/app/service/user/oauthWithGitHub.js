/* eslint-disable camelcase */
import qs from 'qs';
import axios from 'axios';
import config from '#config/system';
import create from '#service/common/create';
import findOne from '#service/common/findOne';
import { signJwt } from '#utils/encryption';

export default async (ctx) => {
  const { code } = ctx.request.query;
  const { clientID, clientSecret } = config.oauth.github;

  // 1. 拿到接口携带的 授权码 获取 资源服务器 token
  const { data: { access_token } } = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?${qs.stringify({
      code,
      client_id: clientID,
      client_secret: clientSecret,
    })}`,
    headers: {
      accept: 'application/json',
    },
  });

  // 2. 通过 资源服务器 token 获取用户信息
  const { data: githubInfo } = await axios({
    method: 'get',
    url: 'https://api.github.com/user',
    headers: {
      accept: 'application/json',
      Authorization: `token ${access_token}`,
    },
  });

  // 3. 根据 GitHub 查找用户是否登录过, 如果没有则注册新用户
  let { data: user } = await findOne({
    model: 'User',
    search: { githubId: githubInfo.id },
  });

  if (!user) {
    const { change: [newUser] } = await create({
      model: 'User',
      body: [{
        name: githubInfo.name,
        githubId: githubInfo.id,
        account: githubInfo.login,
        bio: githubInfo.bio,
        avatar: githubInfo.avatar_url,
      }],
    });

    user = newUser;
  }

  // 4. 设置 cookie(登录), 重定向回首页
  const token = await signJwt({
    id: user.id,
    name: user.name,
    account: user.account,
  });
  ctx.cookies.set('jwt_token', token, { maxAge: 1000 * 60 * 60 * 24 * 7 });

  // 5. 重定向回首页
  ctx.status = 302;
  ctx.redirect('http://www.dev.kunlunxu.cc');
};

// login: 'MoYuanJun',
// id: 23526706,
// node_id: 'MDQ6VXN2',
// avatar_url: 'https://avatars.githubusercontent.com/u/23526706?v=4',
// gravatar_id: '',
// url: 'https://api.github.com/users/MoYuanJun',
// html_url: 'https://github.com/MoYuanJun',
// followers_url: 'https://api.github.com/users/MoYuanJun/followers',
// following_url: 'https://api.github.com/users/MoYuanJun/following{/other_user}',
// gists_url: 'https://api.github.com/users/MoYuanJun/gists{/gist_id}',
// starred_url: 'https://api.github.com/users/MoYuanJun/starred{/owner}{/repo}',
// subscriptions_url: 'https://api.github.com/users/MoYuanJun/subscriptions',
// organizations_url: 'https://api.github.com/users/MoYuanJun/orgs',
// repos_url: 'https://api.github.com/users/MoYuanJun/repos',
// events_url: 'https://api.github.com/users/MoYuanJun/events{/privacy}',
// received_events_url: 'https://api.github.com/users/MoYuanJun/received_events',
// type: 'User',
// site_admin: false,
// name: '墨渊君',
// company: 'DXY',
// blog: 'https://www.kunlunxu.cc',
// location: '杭州',
// email: 'moyuanjun925@gmail.com',
// hireable: null,
// bio: '善战者无赫赫之功',
// twitter_username: null,
// public_repos: 17,
// public_gists: 0,
// followers: 17,
// following: 32,
// created_at: '2016-11-17T14:55:44Z',
// updated_at: '2023-05-01T11:35:24Z'

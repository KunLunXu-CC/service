/* eslint-disable camelcase */
import qs from 'qs';
import axios from 'axios';
import config from '#config/system';
import create from '#service/common/create';
import findOne from '#service/common/findOne';

import { sendCertificate } from '#service/user/login';
import { DEFAULT_ROLE_NAME } from '#config/constants';

const IS_OPEN = false;

const getGitHubUserInfo = async ({ code }) => {
  const { clientID, clientSecret } = config.oauth.github;

  // 1. 拿到接口携带的「授权码」获取「资源服务器 token」
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
  const { data: userInfo } = await axios({
    method: 'get',
    url: 'https://api.github.com/user',
    headers: {
      accept: 'application/json',
      Authorization: `token ${access_token}`,
    },
  });

  return userInfo;
};

const login = async ({ githubUserInfo }) => {
  // 1. 根据 GitHub 信息, 查找用户

  let { data: user } = await findOne({
    model: 'User',
    search: { githubId: githubUserInfo.id },
  });

  // 2. 如果用户不存在, 则创建一个新的用户
  // TODO: 暂停开放
  if (IS_OPEN && !user) {
    const { data: role } = await findOne({
      model: 'Role',
      search: { name: DEFAULT_ROLE_NAME },
    });

    // TODO: 如果 name 和 account 已存在, 则需要进行处理(加后缀)
    const { change: [newUser] } = await create({
      model: 'User',
      body: [{
        role: role.id,
        name: githubUserInfo.name,
        githubId: githubUserInfo.id,
        account: githubUserInfo.login,
        bio: githubUserInfo.bio,
        avatar: githubUserInfo.avatar_url,
      }],
    });

    user = newUser;
  }

  // 3. 返回用户信息
  return user;
};

export default async (ctx) => {
  const { code } = ctx.request.query;

  // 1. 获取 github 用户信息
  const githubUserInfo = await getGitHubUserInfo({ code });

  // 2. 登录: 判断是否注册过, 没有则注册新用户, 有则反悔用户信息
  const user = await login({ githubUserInfo });

  // 3. 设置 cookie(登录)
  await sendCertificate({ user, ctx });

  // 4. 重定向回首页
  ctx.status = 302;
  ctx.redirect(process.env.NODE_ENV === 'production'
    ?  'https://www.kunlunxu.cc'
    : 'http://localhost:3000',
  );
};

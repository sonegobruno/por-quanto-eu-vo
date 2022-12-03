const REFRESH_TOKEN_EXPIRE_IN_DAYS = 30

export default {
  refreshTokenExpireInDays: REFRESH_TOKEN_EXPIRE_IN_DAYS,
  refreshTokenExpireTime: `${REFRESH_TOKEN_EXPIRE_IN_DAYS}d`,
  tokenExpireTime: '1m'
}

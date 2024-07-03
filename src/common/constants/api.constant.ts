export const CONTROLLER_CONSTANTS = {
  AUTH: 'auth',
  USER: 'user',
  ORDER: 'order',
  COLLECTION: 'collection',
  UPLOAD: 'upload',
  COMMENT: 'comment',
  COMMENT_LIKE: 'comment-like'
};
export const URL_CONSTANTS = {
  CONNECT_WALLET: 'connect_wallet',
  CREATE_COLLECTION: 'create-collection',
  GET_COLLECTION_ID: '/:id',
  AUTH: 'auth',
  GET_CONTRACT_BY_ADDRESS: ':contractAddress',
  GET_CHART_BY_ADDRESS: 'chart/:symbol',
  HOLDER_DISTRIBUTION: 'holder/:id',
  UPLOAD_GCP: 'image/gcp',
  ORDER_HISTORY: 'history/:id',
  USER_ORDER_HISTORY: 'user/history/:id',
  ALL_SYMBOL: 'symbols/all',
  LIKE_COMMENT: 'like/:id',
  UNLIKE_COMMENT: 'unlike/:id',
  MARKET_CAP: 'market-cap/:id',
  SEARCH_COLLECTION_BY_NAME: '/search/name',
  LIST_COIN_HELD: 'list-coin/held',
  COMMENT_COLLECTION: ':id/comment',
};
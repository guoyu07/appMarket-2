/* eslint-disable no-unused-vars */
/**
 *
 * 环境配置信息
 *
 */

// 开发环境
const development = {
	name: 'development',
	dir: 'test',
	apiPath: 'http://10.30.95.8:7080/',	
};


// 生产环境
const production = {
	name: 'production',
	dir: 'official',
	apiPath: 'http://47.94.39.104:7777/',
};

module.exports = development;


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
	// apiPath: 'http://133.100.108.63:8080/',	
	apiPath: 'http://133.100.108.56:8080/',	
};


// 生产环境
const production = {
	name: 'production',
	dir: 'official',
	apiPath: 'http://',
};

module.exports = development;


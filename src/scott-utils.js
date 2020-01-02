/*******************************************************************************
 * 公共函数库
 * @author Scott
 * @version 1.0.0
 * @email scottcoder#163.com
 * @description
 * @date 2020-01-02
*******************************************************************************/

export const version = "1.0.0"

/**
 * 生成uuid
 * @return {String} uuid
*/
export function getUuid() {

	return ("xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (key) => {
		const random = Math.random() * 16 | 0;
		const value = key === "x" ? random : (random & 0x3 | 0x8);
		return value.toString(16);
	}));
}


/******************************* 格式化 *************************************/

/**
 * 日期格式化
 * @param {Any} date 需要格式化的日期。接受日期格式或者数字型
 * @param {String} format 最终格式
 * @return {String} 
*/
export function dateFormat(date, format = "yyyy-MM-dd hh:mm:ss") {

	if (isNumber(date)) {
		date = new Date(date);
	}

	// 补零
	function zeroize(num) {
		return num < 10 ? "0" + num : num;
	}

	// 星期对应码表
	const WEEKS = {
		"Mon": "一",
		"Tue": "二",
		"Wed": "三",
		"Thu": "四",
		"Fri": "五",
		"Sat": "六",
		"Sun": "日"
	};

	const dateObj = {
		"Y": date.getFullYear(),
		"M": zeroize(date.getMonth() + 1),
		"D": zeroize(date.getDate()),
		"h": zeroize(date.getHours()),
		"m": zeroize(date.getMinutes()),
		"s": zeroize(date.getSeconds()),
		"w": `星期${WEEKS[date.toDateString().split(" ")[0]]}`
	};

	return format.replace(/YYYY|MM|DD|hh|mm|ss|w/g, function (match) {
		switch (match) {
			case "YYYY":
				return dateObj.Y;
			case "MM":
				return dateObj.M;
			case "DD":
				return dateObj.D;
			case "hh":
				return dateObj.h;
			case "mm":
				return dateObj.m;
			case "ss":
				return dateObj.s;
			case "w":
				return dateObj.w
		}
	})
}

/** 
 * 现金额转中文大写
 * @param {Number} money 金额数字
 * @return {String}
*/
export function moneyUppercase(money) {
	const fraction = ['角', '分'];
	const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
	const head = money < 0 ? '欠' : '';


	let result = "";

	money = Math.abs(money);

	for (let i = 0; i < fraction.length; i++) {
		result += (digit[Math.floor(money * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	result = result || "整";

	money = Math.floor(money);
	for (let i = 0; i < unit[0].length && money > 0; i++) {
		let p = "";
		for (let j = 0; j < unit[1].length && money > 0; j++) {
			p = digit[money % 10] + unit[1][j] + p;
			money = Math.floor(money / 10);
		}
		result = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + result;
	}
	return head + result.replace(/(零.)*零元/, '元')
		.replace(/(零.)+/g, '零')
		.replace(/^整$/, '零元整');
}

/** 
 * 格式化数字为金额格式
 * @param {String | Number} Number或String 类型数字
 * @return {String}
*/
export function numberToMoney(num) {
	let result = "";
	if (isNumber(num)) {
		result = "" + num;
	}
	return result.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


/******************************* 类型判断 *************************************/

/**
* @name 是否为函数类型
* @param {Any} any 被检测的变量
* @return {Boolean}
*/
export function isFunction(any) {
	return Object.prototype.toString.call(any) === '[object Function]';
}

/**
 * @name 是否为数组对象类型
 * @param {Any} any 被检测的变量
 * @return {Boolean} 
 */
export function isArray(any) {
	return Object.prototype.toString.call(any) === '[object Array]';
}

/**
 * @name 是否为日期类型
 * @param {Any} any 被检测的变量
 * @return {boolean}
 */
export function isDate(any) {
	return Object.prototype.toString.call(any) === '[object Date]';
}

/**
 * @name 是否为字符串类型
 * @param {Any} any 被检测的变量
 * @return {Boolean}
 */
export function isString(any) {
	return typeof any === "string";
}

/**
 * @name 是否为数字类型(为Number且不为正负无穷大数字)
 * @param {Any} any 被检测的变量
 * @return {Boolean}
*/
export function isNumber(any) {
	return typeof any === 'number' && isFinite(any);
}

/**
 * @name 是否为布尔值类型
 * @param {Any} any 被检测的变量
 * @return {Boolean}
*/
export function isBoolean(any) {
	return typeof any === 'boolean';
}

/**
 * @name 是否为空对象 null和undefined和数组的长度为0或空字符串("")
 * @param {Any} any 被检测的变量 
 * @param {Boolean} allowBlank [可选] 默认false 空字符串认为是空对象 反之 空字符串不认为是空对象
 * @return {Boolean}
*/
export function isEmpty(any, allowBlank) {
	return any === null || any === undefined ||
		(isArray(any) && !any.length) ||
		(!allowBlank ? any === '' : false);
}

/**
 * @name 是否为正则表达式类型
 * @param {Any} any 被检测的变量
 * @return {Boolean}
*/
export function isRegexp(any) {
	return Object.prototype.toString.call(any) === '[object RegExp]';
}

/**
 * @name 是否为对象类型
 * @param {Any} any 被检测的变量
 * @return {boolean}
*/
export function isObject(any) {
	return Object.prototype.toString.call(any) === '[object Object]';
}
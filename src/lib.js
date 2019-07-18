/**
 *  将公式字符串转换为数组 将公式中的数组转换为Number 
 *
 * @param {string} str - 公式字符串
 * @returns {Array} - 中缀表达式数组 
 */
var start = null;//起始时间
var end = null;  //结束时间
function stringToArray(str) {
    //console.log("|",str,"| sÎtringToArray");
    start = new Date().getTime();
    if (str !== "" && str !== undefined) {
        let data = str.split('')
        var flag = ""
        let arr = [];
        data.forEach((data) => {
            if (data !== "+" && data !== "-" && data !== "*" && data !== "/") {
                flag = flag + data;
            } else {
                arr.push(parseFloat(flag))
                arr.push(data)
                flag = ""
            }
        })
        arr.push(parseFloat(flag))
        console.log("中缀表达式字符串:", arr.join(" "));
        return arr
    } else {
        return []
    }
}

/**
 * 将stringToArray方法中生成的数组 转换为后缀表达式
 *
 * @param {Array} arr - 中缀表达式数组
 * @returns {String} - 后缀表达式字符串
 */
function infixToSuffix(arr) {
    //console.log("|",arr,"| infixToSuffix");
    if (arr.length > 0) {
        let str = ""
        let operator = []
        arr.forEach((a) => {
            if (Number(a)) {
                str = str + a + " ";
            } else {
                if (operator.length === 0) {
                    operator.push(a)
                } else {
                    let test = operator.length
                    for (let index = 0; index <= test + 1; index++) {
                        let tmp = operator.pop()
                        if (tmp === undefined) {
                            operator.push(a)
                            break;
                        }
                        operator.push(tmp)
                        let flag = operatorCompare(a, tmp)
                        if (flag && operator.length !== 0) {
                            str = str + operator.pop() + " ";
                        } else {
                            operator.push(a)
                            break;
                        }
                    }
                }
            }
        })
        while (operator.length !== 0) {
            str = str + operator.pop() + " ";
        }
        console.log("后缀表达式字符串:", str);
        return str;
    } else {
        return ""
    }
}


/**
 * 计算后缀表达式
 *
 * @param {String} str - 后缀表达式字符串
 * @returns {Float} - 结果数据
 */
function suffixResult(str) {
    //console.log("|",str,"| suffixResult");
    if (str !== "") {
        let data = str.split(' ');
        let stack = []
        data.forEach((data) => {
            if (!isNaN(parseFloat(data))) {
                stack.push(parseFloat(data))
            } else {
                switch (data) {
                    case "+":
                        stack.push(parseFloat(stack.pop()) + parseFloat(stack.pop()))
                        break;
                    case "-":
                        let a = parseFloat(stack.pop()); let b = parseFloat(stack.pop())
                        stack.push(b - a);
                        break;
                    case "*":
                        stack.push(parseFloat(stack.pop()) * parseFloat(stack.pop()))
                        break;
                    case "/":
                        let aa = parseFloat(stack.pop()); let bb = parseFloat(stack.pop())
                        stack.push(bb / aa);
                        break;
                    default:
                        break;
                }
            }
        })
        let result = parseFloat(stack.pop())
        end = new Date().getTime();
        console.log("运算时间: " + (end - start) + "ms");
        console.log("运算结果:", result);
        return result.toString()
    } else {
        return ""
    }
}
/**
 * 比较传入的两个符号的优先级
 *
 * @param {String} a
 * @param {String} b
 * @returns {Boolean} - 返回true a<=b  返回false a>b
 */
function operatorCompare(a, b) {
    let test1 = (a === "+" || a === "-") ? 1 : 2
    let test2 = (b === "+" || b === "-") ? 1 : 2
    return test1 <= test2
}

export { stringToArray, infixToSuffix, suffixResult, operatorCompare }
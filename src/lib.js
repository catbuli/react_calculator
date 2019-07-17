/**
 *  将公式字符串转换为数组 将公式中的数组转换为Number 
 *
 * @param {string} str - 公式字符串
 * @returns {Array} - 中缀表达式数组 
 */
function stringToArray(str) {
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
        return arr
    }
}

/**
 * 将stringToArray方法中生成的数组 转换为后缀表达式
 *
 * @param {Array} arr - 中缀表达式数组
 * @returns {String} - 后缀表达式字符串
 */
function infixToSuffix(arr) {
    if (arr !== undefined) {
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
                    for (let index = 0; index <= test; index++) {
                        let tmp = operator.pop()
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

        return str;
    }
}


/**
 * 计算后缀表达式
 *
 * @param {String} str - 后缀表达式字符串
 * @returns {Float} - 结果数据
 */
function suffixResult(str) {
    if (str !== undefined) {
        let data = str.split(' ');
        let result = []
        data.forEach((data) => {
            if (!isNaN(parseFloat(data))) {
                result.push(parseFloat(data))
            } else {
                switch (data) {
                    case "+":
                        result.push(parseFloat(result.pop()) + parseFloat(result.pop()))
                        break;
                    case "-":
                        let a = parseFloat(result.pop()); let b = parseFloat(result.pop())
                        result.push(b - a);
                        break;
                    case "*":
                        result.push(parseFloat(result.pop()) * parseFloat(result.pop()))
                        break;
                    case "/":
                        let aa = parseFloat(result.pop()); let bb = parseFloat(result.pop())
                        result.push(bb / aa);
                        break;
                    default:
                        break;
                }
            }
        })
        return parseFloat(result.pop())
    }
}
/**
 *
 *
 * @param {*} a
 * @param {*} b
 * @returns
 */
function operatorCompare(a, b) {
    var add = "+", minu = "-", multiply = "*", divide = "/"
    var flaga;
    var flagb;
    switch (a) {
        case add: flaga = 1; break;
        case minu: flaga = 1; break;
        case multiply: flaga = 2; break;
        case divide: flaga = 2; break;
        default:
            break;
    }
    switch (b) {
        case add: flagb = 1; break;
        case minu: flagb = 1; break;
        case multiply: flagb = 2; break;
        case divide: flagb = 2; break;
        default:
            break;
    }
    return flaga <= flagb
}


export { stringToArray, infixToSuffix, suffixResult, operatorCompare }